const tokenKey = 'token'
const storage = localStorage

export function getToken() {
  return storage.getItem(tokenKey)
}

export function setToken(token) {
  storage.setItem(tokenKey, token)
}


export function getStorageObj(key) {
  let data = storage.getItem(key)
  try {
    data = JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
  return data
}

export function setStorageObj(key, data) {
  storage.setItem(key, JSON.stringify(data))
}