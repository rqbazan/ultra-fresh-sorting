import { prioritisedSortingBy } from './prioritised-sorting-by.v2'

const toPriorityScore = (value) => value + 1

const reverseMap = (map) => new Map(Array.from(map, (x) => x.reverse()))

/**
 * @param {string[]} values
 * @param {string[]} priorities
 * @returns {{ value: string, score: number }[]}
 */
export function sortV2(values, priorities) {
  const items = values.map((value) => ({ value }))

  const visited = new Map()

  const sortedItems = prioritisedSortingBy(
    items,
    priorities,
    (obj) => obj.value,
    visited
  )

  const reversed = reverseMap(visited)

  return sortedItems.map((item) => ({
    value: item.value,
    score: toPriorityScore(reversed.get(item) ?? -1),
  }))
}
