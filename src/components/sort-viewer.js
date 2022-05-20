import * as React from 'react'
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'
import { useUpdateEffect } from '../lib/hooks'
import { sortNames, priorityList } from '../lib/sort-names'
import { localDB } from '../lib/local-db'

const HIGHLIGHT_CLASS_NAME = 'bg-green-100'

const highlight = priorityList.map((re) => ({
  highlight: new RegExp(re, 'gi'),
  className: HIGHLIGHT_CLASS_NAME,
}))

function Section({ title, children }) {
  return (
    <div className="flex-1 flex flex-col">
      <label className="mb-2 uppercase font-bold">{title}</label>
      {children}
    </div>
  )
}

const toLines = (text) => text.split('\n')

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
    <main className="py-6 flex flex-col container mx-auto font-mono">
      <header className="text-2xl mb-4">
        <h1>SuperFreshSorting</h1>
      </header>
      <div className="flex">
        <Section title="Input">
          <div className="flex flex-col">
            <div
              className="outline-none border-2 border-black p-4 w-full"
              spellCheck="false"
            >
              <HighlightWithinTextarea
                value={text}
                onChange={(value) => setText(value)}
                highlight={highlight}
              />
            </div>
            <button
              className="bg-black text-white mt-2 rounded-md px-4 py-2 uppercase ml-auto"
              onClick={() => {
                setLines(toLines(text))
              }}
            >
              Sort
            </button>
          </div>
        </Section>
        <div className="w-[1px] bg-gray-400 mx-4" />
        <Section title="Output">
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
        </Section>
      </div>
    </main>
  )
}
