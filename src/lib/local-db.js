export const localDB = {
  key: 'initial-text',
  get() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.key)
    }
  },
  save(text) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.key, text)
    }
  },
}
