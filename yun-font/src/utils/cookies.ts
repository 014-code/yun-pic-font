import Cookies from 'js-cookie'

//cookie的key
const TOKEN_KEY = 'ms-token'

export function setToken(value: string): void {
  Cookies.set(TOKEN_KEY, value, { expires: 1 }) // 1天过期
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY)
}

export function removeToken(): void {
  Cookies.remove(TOKEN_KEY)
}

export function hasToken(): string | undefined {
  return Cookies.get(TOKEN_KEY)
}
