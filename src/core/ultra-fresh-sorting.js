/**
 * @param {string} value
 * @param {RegExp[]} priorities
 * @returns {number}
 */
function getPriorityIndex(value, priorities) {
  return priorities.findIndex((re) => re.test(value))
}

/**
 * @param {{ value: string }} itemA
 * @param {{ value: string }} itemB
 * @param {RegExp[]} priorities
 * @param {Map<number, { value: string }>} visited
 * @returns {number}
 */
function compare(itemA, itemB, priorities, visited) {
  const { value: valueA } = itemA
  const { value: valueB } = itemB

  const priorityIndexA = getPriorityIndex(valueA, priorities)
  const priorityIndexB = getPriorityIndex(valueB, priorities)

  const firstOneHasPriority =
    priorityIndexA !== -1 &&
    (!visited.has(priorityIndexA) || visited.get(priorityIndexA) === itemA)

  const secondOneHasPriority =
    priorityIndexB !== -1 &&
    (!visited.has(priorityIndexB) || visited.get(priorityIndexB) === itemB)

  if (firstOneHasPriority) {
    visited.set(priorityIndexA, itemA)
  }

  if (secondOneHasPriority) {
    visited.set(priorityIndexB, itemB)
  }

  // None of them has priorities
  if (!firstOneHasPriority && !secondOneHasPriority) {
    return valueA.localeCompare(valueB)
  }

  // Both of them has priorities
  if (firstOneHasPriority && secondOneHasPriority) {
    return priorityIndexA === priorityIndexB
      ? valueA.localeCompare(valueB)
      : priorityIndexA - priorityIndexB
  }

  // Only one of them has a priority
  return firstOneHasPriority ? -1 : 1
}

/**
 * @param {string[]} values
 * @param {string[]} _priorities
 * @param {Map<number, { value: string }>} [_visited]
 * @returns {{ value: string }[]}
 */
export function ultraFreshSorting(values, _priorities, _visited) {
  const priorities = _priorities.map((x) => new RegExp(x, 'i'))

  const visited = _visited ?? new Map()

  return values
    .map((value) => ({ value })) // make it unique by reference not by value
    .sort((a, b) => compare(a, b, priorities, visited))
}
