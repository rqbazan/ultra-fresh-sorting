export const priorityList = [
  new RegExp('frutas\\s+y\\s+verduras', 'i'),
  new RegExp('carnes|pescados|pollos', 'i'),
  new RegExp('lacteos|leches', 'i'),
  new RegExp('comidas\\s+(preparadas|listas)', 'i'),
]

function getPriorityIndex(name) {
  return priorityList.findIndex((re) => re.test(name))
}

function getPriorityScore(name) {
  return getPriorityIndex(name) + 1
}

function compare(a, b) {
  const indexA = getPriorityIndex(a)
  const indexB = getPriorityIndex(b)

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

export function sort(names) {
  const indexes = new Map()

  return [...names]
    .map((name) => name.trim())
    .filter(Boolean)
    .sort((a, b) => compare(a, b, indexes))
    .map((name) => {
      return {
        name,
        score: getPriorityScore(name),
      }
    })
}
