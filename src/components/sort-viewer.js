import * as React from 'react'
import dynamic from 'next/dynamic'
import { useUpdateEffect } from '../lib/hooks'
import { sortNames, priorityList } from '../lib/sort-names'
import { localDB } from '../lib/local-db'
import { SorterSection } from './sorter-section'

const HighlightWithinTextarea = dynamic(() =>
  import('react-highlight-within-textarea')
)

const HIGHLIGHT_CLASS_NAME = 'bg-green-100'

const highlight = priorityList.map((re) => ({
  highlight: new RegExp(re, 'gi'),
  className: HIGHLIGHT_CLASS_NAME,
}))

const toLines = (text) => text?.split('\n') ?? []

export function SortViewer() {
  const [text, setText] = React.useState('')
  const [lines, setLines] = React.useState([])

  const sortedLines = sortNames(lines)

  useUpdateEffect(() => {
    localDB.save(text)
    setLines(toLines(text))
  }, [text])

  React.useEffect(() => {
    setText(localDB.get())
  }, [])

  return (
    <main className="p-6 flex flex-col md:max-w-6xl mx-auto font-mono md:border-l md:border-r border-gray-500">
      <header className="text-2xl mb-4">
        <h1 className="italic">SuperFreshSorting</h1>
      </header>
      <div className="flex flex-col md:flex-row">
        <SorterSection title="Input" subtitle="Press enter to separate names">
          <div className="flex flex-col">
            <div
              className="outline-none border-2 border-black p-4 w-full"
              spellCheck="false"
            >
              <HighlightWithinTextarea
                value={text}
                onChange={(value) => setText(value)}
                highlight={highlight}
                placeholder=""
              />
            </div>
            {process.env.NODE_ENV !== 'production' && (
              <button
                className="bg-black text-white mt-2 rounded-md px-4 py-2 uppercase ml-auto"
                onClick={() => {
                  setLines(toLines(text))
                }}
              >
                Sort
              </button>
            )}
          </div>
        </SorterSection>
        <div className="my-6 md:mx-6" />
        <SorterSection
          title="Output"
          subtitle="List of sorted names with priority values"
        >
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
            <div>
              <p>Nothing to sort (︶︹︶)</p>
            </div>
          )}
        </SorterSection>
      </div>
    </main>
  )
}
