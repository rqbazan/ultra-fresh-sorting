import * as React from 'react'
import clsx from 'clsx'
import HighlightWithinTextarea from 'react-highlight-within-textarea'
import escapeStringRegexp from 'escape-string-regexp'
import { usePersistenceState } from '../lib/hooks'
import { ultraFreshSorting } from '../core/sort'
import { defaultText, defaultPriorities } from '../utils/samples'
import { SorterSection } from './sorter-section'
import { PriorityList } from './priority-list'
import { Button } from './button'

const HIGHLIGHT_CLASS_NAME = 'bg-green-100'

const toLines = (text) =>
  text
    ?.split('\n')
    .map((value) => value.trim())
    .filter(Boolean) ?? []

export function SortViewer() {
  const [text, setText] = usePersistenceState({
    key: 'input-text',
    initialValue: '',
    defaultValue: '',
  })

  const [priorities, setPriorities] = usePersistenceState({
    key: 'priorities',
    initialValue: [],
    defaultValue: defaultPriorities,
  })

  const escapedPriorities = React.useMemo(
    () => priorities.map((value) => escapeStringRegexp(value)),
    [priorities]
  )

  const sortedLines = React.useMemo(
    () => ultraFreshSorting(toLines(text), escapedPriorities),
    [text, escapedPriorities]
  )

  const highlight = React.useMemo(
    () =>
      escapedPriorities.map((value) => ({
        highlight: new RegExp(value, 'gi'),
        className: HIGHLIGHT_CLASS_NAME,
      })),
    [escapedPriorities]
  )

  return (
    <main className="p-6 flex flex-col md:max-w-6xl mx-auto font-mono">
      <header className="text-2xl mb-4">
        <h1 className="italic">UltraFreshSorting</h1>
      </header>
      <div className="flex flex-col md:flex-row">
        <SorterSection title="Priority" subtitle="Drag and drop to order ">
          {priorities?.length > 0 && (
            <div className="flex flex-col">
              <PriorityList dataSource={priorities} onChange={setPriorities} />
              <Button
                className="mt-4 ml-auto"
                onClick={() => setPriorities(defaultPriorities)}
              >
                Reset
              </Button>
            </div>
          )}
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
            <Button
              className="mt-4 ml-auto"
              onClick={() => {
                setText(defaultText)
              }}
            >
              Sample
            </Button>
          </div>
        </SorterSection>
        <div className="my-6 md:mx-6" />
        <SorterSection title="Output" subtitle="Result with priority values">
          {sortedLines?.length > 0 ? (
            <ul className="flex flex-col space-y-1">
              {sortedLines.map((line, index) => {
                const { value, score } = line

                return (
                  <li
                    key={`${value}-${index}`}
                    className={clsx(
                      score > 0 && HIGHLIGHT_CLASS_NAME,
                      'inline-block w-fit'
                    )}
                  >
                    ({score}) {value}
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
