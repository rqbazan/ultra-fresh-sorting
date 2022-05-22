/**
 * @param {string} value
 * @param {RegExp[]} priorities
 * @returns {number}
 */
export function getPriorityIndex(value, priorities) {
  return priorities.findIndex((re) => re.test(value))
}

/**
 * @param {string[]} strings
 * @returns {RegExp[]}
 */
export function getPrioritiesRegExp(strings) {
  return strings.map((x) => new RegExp(x, 'i'))
}

/**
 * @param {unknown} itemA
 * @param {unknown} itemB
 * @param {RegExp[]} priorities
 * @param {(obj: unknown) => string} selector
 * @returns {number}
 */
function compare(itemA, itemB, priorities, selector) {
  const valueA = selector(itemA)
  const valueB = selector(itemB)

  const priorityIndexA = getPriorityIndex(valueA, priorities)
  const priorityIndexB = getPriorityIndex(valueB, priorities)

  const firstOneHasPriority = priorityIndexA !== -1
  const secondOneHasPriority = priorityIndexB !== -1

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
 * @returns {unknown[]}
 */
export function prioritisedSortingBy(values, priorities, selector) {
  const regexps = getPrioritiesRegExp(priorities)

  return [...values].sort((a, b) => compare(a, b, regexps, selector))
}
