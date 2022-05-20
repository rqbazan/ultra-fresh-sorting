export const localDB = {
  key: 'initial-text',
  defaultValue: '',
  get() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.key) ?? this.defaultValue
    } else {
      return this.defaultValue
    }
  },
  save(text) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.key, text)
    }
  },
}
