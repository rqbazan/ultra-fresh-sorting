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
 * @param {string[]} values
 * @param {string[]} _priorities
 * @param {Map<number, { value: string }>} [_visited]
 * @returns {{ value: string }[]}
 */
export function ultraFreshSorting(values, _priorities, visited = new Map()) {
  const priorities = _priorities.map((x) => new RegExp(x, 'i'))

  return values
    .map((value) => ({ value })) // make it unique by reference not by value
    .sort((a, b) => compare(a, b, priorities, visited))
}
