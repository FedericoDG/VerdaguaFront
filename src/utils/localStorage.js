const localStorage = {
  write: (key, value) => window.sessionStorage.setItem(key, JSON.stringify(value)),
  read: (key) => JSON.parse(window.sessionStorage.getItem(key)),
  remove: (key) => window.sessionStorage.removeItem(key),
}

export default localStorage
