export const regexListSerialize = (regexps) => {
  const toObj = (re) => ({ source: re.source, flags: re.flags })
  return JSON.stringify(regexps.map(toObj))
}

export const regexListDeserialize = (rawValue) => {
  const objects = JSON.parse(rawValue)
  return objects.map((obj) => new RegExp(obj.source, obj.flags))
}
