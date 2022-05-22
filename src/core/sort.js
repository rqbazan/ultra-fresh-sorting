import { ultraFreshSorting } from './ultra-fresh-sorting'

const reverseMap = (map) => new Map(Array.from(map, (x) => x.reverse()))

const toPriorityScore = (value) => value + 1

/**
 * @param {string[]} values
 * @param {string[]} priorities
 * @returns {{ value: string, score: number }[]}
 */
export function sort(values, priorities) {
  const visited = new Map()

  const sortedItems = ultraFreshSorting(values, priorities, visited)

  const reversed = reverseMap(visited)

  return sortedItems.map((item) => ({
    value: item.value,
    score: toPriorityScore(reversed.get(item) ?? -1),
  }))
}
