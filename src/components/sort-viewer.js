import * as React from 'react'
import clsx from 'clsx'
import HighlightWithinTextarea from 'react-highlight-within-textarea'
import escapeStringRegexp from 'escape-string-regexp'
import { usePersistenceState } from '../lib/hooks'
import { sortV1 } from '../core/sort.v1'
import { sortV2 } from '../core/sort.v2'
import { defaultText, defaultPriorities } from '../utils/samples'
import { SorterSection } from './sorter-section'
import { PriorityList } from './priority-list'
import { Button } from './button'

const HIGHLIGHT_CLASS_NAME = 'bg-green-100'
const LATEST_VERSION = 'v2'

const toLines = (text) =>
  text
    ?.split('\n')
    .map((value) => value.trim())
    .filter(Boolean) ?? []

export function SortViewer() {
  const [version, setVersion] = React.useState(LATEST_VERSION)

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

  const sort = React.useMemo(() => {
    return version === 'v2' ? sortV2 : version === 'v1' ? sortV1 : null
  }, [version])

  const sortedLines = React.useMemo(() => {
    if (sort) {
      return sort(toLines(text), escapedPriorities)
    } else {
      console.error(`sort function is not defined`)
      return []
    }
  }, [sort, text, escapedPriorities])

  const highlight = React.useMemo(
    () =>
      escapedPriorities.map((value) => ({
        highlight: new RegExp(value, 'gi'),
        className: HIGHLIGHT_CLASS_NAME,
      })),
    [escapedPriorities]
  )

  return (
    <main className="p-6 flex flex-col md:max-w-6xl mx-auto font-mono text-sm">
      <header className="mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl italic mr-2">UltraFreshSorting</h1>
          <select
            className="text-sm"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          >
            <option value="v1">V1</option>
            <option value="v2">V2</option>
          </select>
        </div>
        <p className="mt-2 text-xs">
          Given a list of strings{' '}
          <span className="uppercase font-bold">(input)</span>, sort them
          alphabetically, but prioritize using another list of strings{' '}
          <span className="uppercase font-bold">(PRIORITY)</span>
          {version === 'v2' ? ' and avoid repeating prioritized values' : null}
        </p>
      </header>
      <div className="flex flex-col md:flex-row space-y-4 md:space-x-10 md:space-y-0">
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
        <SorterSection title="Input" subtitle="Press enter to separate values">
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
