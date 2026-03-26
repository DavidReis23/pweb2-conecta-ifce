const KEY_TOKEN = 'access_token'

function setAccessToken(token: string) {
  localStorage.setItem(KEY_TOKEN, token)
}

function getAccessToken(token: string) {
  localStorage.getItem(KEY_TOKEN)
}

function clearAccessToken() {
  localStorage.removeItem(KEY_TOKEN)
}

export { setAccessToken, getAccessToken, clearAccessToken }
