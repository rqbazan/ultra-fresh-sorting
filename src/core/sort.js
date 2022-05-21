function getPriorityIndex(name, priorityList) {
  return priorityList.findIndex((re) => re.test(name))
}

function getPriorityScore(name, priorityList) {
  return getPriorityIndex(name, priorityList) + 1
}

function compare(a, b, priorityList) {
  const indexA = getPriorityIndex(a, priorityList)
  const indexB = getPriorityIndex(b, priorityList)

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

export function sort(names, priorityList) {
  return [...names]
    .map((name) => name.trim())
    .filter(Boolean)
    .sort((a, b) => compare(a, b, priorityList))
    .map((name) => {
      return {
        name,
        score: getPriorityScore(name, priorityList),
      }
    })
}
