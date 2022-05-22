export function createLocalDB(options) {
  return {
    key: options.key,
    defaultValue: options.defaultValue,
    serialize: options.serialize || ((v) => JSON.stringify(v)),
    deserialize: options.deserialize || ((v) => JSON.parse(v)),
    get() {
      if (typeof localStorage === 'undefined') {
        return this.defaultValue
      }

      try {
        const value = localStorage.getItem(this.key)
        return this.deserialize(value) ?? this.defaultValue
      } catch {
        return this.defaultValue
      }
    },
    save(newValue) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.key, this.serialize(newValue))
      }
    },
  }
}
