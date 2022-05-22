import {
  prioritisedSortingBy,
  getPriorityIndex,
  getPrioritiesRegExp,
} from './prioritised-sorting-by.v1'

const toPriorityScore = (value, priorities) =>
  getPriorityIndex(value, priorities) + 1

/**
 * @param {string[]} values
 * @param {string[]} priorities
 * @returns {{ value: string, score: number }[]}
 */
export function sortV1(values, priorities) {
  const items = values.map((value) => ({ value }))

  const sortedItems = prioritisedSortingBy(
    items,
    priorities,
    (obj) => obj.value
  )

  const regexps = getPrioritiesRegExp(priorities)

  return sortedItems.map((item) => ({
    value: item.value,
    score: toPriorityScore(item.value, regexps),
  }))
}
