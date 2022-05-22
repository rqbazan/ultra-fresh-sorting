/**
 * @param {string} value
 * @param {RegExp[]} priorities
 * @returns {number}
 */
function getPriorityIndex(value, priorities) {
  return priorities.findIndex((re) => re.test(value))
}

/**
 * @param {string} value
 * @param {RegExp[]} priorities
 * @returns {number}
 */
function getPriorityScore(value, priorities) {
  return getPriorityIndex(value, priorities) + 1
}

/**
 * @param {string} a
 * @param {string} b
 * @param {RegExp[]} priorities
 * @returns {number}
 */
function compare(a, b, priorities) {
  const indexA = getPriorityIndex(a, priorities)
  const indexB = getPriorityIndex(b, priorities)

  const firstOneHasPriority = indexA !== -1
  const secondOneHasPriority = indexB !== -1

  // None of them has priorities
  if (!firstOneHasPriority && !secondOneHasPriority) {
    return a.localeCompare(b)
  }

  // Both of them has priorities
  if (firstOneHasPriority && secondOneHasPriority) {
    return indexA === indexB ? a.localeCompare(b) : indexA - indexB
  }

  // Only one of them has a prority
  return firstOneHasPriority ? -1 : 1
}

/**
 * @param {string[]} input
 * @param {string[]} _priorities
 * @returns {{ value: string, score: number }[]}
 */
export function ultraFreshSorting(values, _priorities) {
  const priorities = _priorities.map((x) => new RegExp(x, 'i'))

  return Array.from(values)
    .sort((a, b) => compare(a, b, priorities))
    .map((value) => ({
      value,
      score: getPriorityScore(value, priorities),
    }))
}
