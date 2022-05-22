/**
 * @param {string} value
 * @param {RegExp[]} priorities
 * @returns {number}
 */
function getPriorityIndex(value, priorities) {
  return priorities.findIndex((re) => re.test(value))
}

/**
 * @param {unknown} itemA
 * @param {unknown} itemB
 * @param {RegExp[]} priorities
 * @param {Map<number, unknown>} visited
 * @param {(obj: unknown) => string} selector
 * @returns {number}
 */
function compare(itemA, itemB, priorities, visited, selector) {
  const valueA = selector(itemA)
  const valueB = selector(itemB)

  const priorityIndexA = getPriorityIndex(valueA, priorities)
  const priorityIndexB = getPriorityIndex(valueB, priorities)

  const checkIfHasPriority = (priorityIndex, item) => {
    const lookup = visited.get(priorityIndex)
    return priorityIndex !== -1 && (!lookup || lookup === item)
  }

  const firstOneHasPriority = checkIfHasPriority(priorityIndexA, itemA)
  const secondOneHasPriority = checkIfHasPriority(priorityIndexB, itemB)

  if (firstOneHasPriority) {
    visited.set(priorityIndexA, itemA)
  }

  if (secondOneHasPriority) {
    visited.set(priorityIndexB, itemB)
  }

  // None of them have priorities
  if (!firstOneHasPriority && !secondOneHasPriority) {
    return valueA.localeCompare(valueB)
  }

  // Both of them have priorities
  if (firstOneHasPriority && secondOneHasPriority) {
    return priorityIndexA === priorityIndexB
      ? valueA.localeCompare(valueB)
      : priorityIndexA - priorityIndexB
  }

  // Only one of them has a priority
  return firstOneHasPriority ? -1 : 1
}

/**
 * @param {unknown[]} values
 * @param {string[]} priorities
 * @param {(obj: unknown) => string} selector
 * @param {Map<number, unknown>} [visited]
 * @returns {unknown[]}
 */
export function prioritisedSortingBy(
  values,
  priorities,
  selector,
  visited = new Map()
) {
  const regexps = priorities.map((x) => new RegExp(x, 'i'))

  return [...values].sort((a, b) => compare(a, b, regexps, visited, selector))
}
