import * as React from 'react'
import dynamic from 'next/dynamic'
import HighlightWithinTextarea from 'react-highlight-within-textarea'
import { usePersistenceState } from '../lib/hooks'
import { sort, defaultPriorityList } from '../core/sort'
import { regexListDeserialize, regexListSerialize } from '../utils/regex'
import { SorterSection } from './sorter-section'
import { PriorityList } from './priority-list'

const HIGHLIGHT_CLASS_NAME = 'bg-green-100'

const toLines = (text) => text?.split('\n') ?? []

export function SortViewer() {
  const [text, setText] = usePersistenceState({
    key: 'input-text',
    initialValue: '',
    defaultValue: '',
  })

  const [priorityList, setPriorityList] = usePersistenceState({
    key: 'priority-list',
    initialValue: [],
    defaultValue: defaultPriorityList,
    serialize: regexListSerialize,
    deserialize: regexListDeserialize,
  })

  const sortedLines = React.useMemo(
    () => sort(toLines(text), priorityList),
    [text, priorityList]
  )

  const highlight = React.useMemo(
    () =>
      priorityList.map((re) => ({
        highlight: new RegExp(re, 'gi'),
        className: HIGHLIGHT_CLASS_NAME,
      })),
    [priorityList]
  )

  return (
    <main className="p-6 flex flex-col md:max-w-6xl mx-auto font-mono md:border-l md:border-r border-gray-500">
      <header className="text-2xl mb-4">
        <h1 className="italic">UltraFreshSorting</h1>
      </header>
      <div className="flex flex-col md:flex-row">
        <SorterSection title="Input" subtitle="Drag and drop to order ">
          <PriorityList dataSource={priorityList} onChange={setPriorityList} />
        </SorterSection>
        <div className="my-6 md:mx-6" />
        <SorterSection title="Input" subtitle="Press enter to separate names">
          <div className="flex flex-col">
            <div
              className="outline-none border-2 border-black p-4 w-full"
              spellCheck="false"
            >
              <HighlightWithinTextarea
                value={text}
                onChange={setText}
                highlight={highlight}
                placeholder=""
              />
            </div>
          </div>
        </SorterSection>
        <div className="my-6 md:mx-6" />
        <SorterSection title="Output" subtitle="Result with priority values">
          {sortedLines?.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {sortedLines.map((line, index) => {
                const { name, score } = line

                return (
                  <li key={`${name}-${index}`}>
                    ({score}) {name}
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="mt-4 flex items-center justify-center">
              <p>Nothing to show (︶︹︶)</p>
            </div>
          )}
        </SorterSection>
      </div>
    </main>
  )
}
