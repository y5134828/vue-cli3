import Cookies from 'js-cookie';
const TokenKey = 'USER-TOKEN';
export function getToken () {
  return Cookies.get(TokenKey);
}

export function setToken (token, time) {
  return Cookies.set(TokenKey, token, {
    expires: time,
    path: '/'
  });
}

export function removeToken () {
  return Cookies.remove(TokenKey);
}

export function getSessionStorage (key) {
  return sessionStorage.getItem(key);
}

export function setSessionStorage (key, val) {
  return sessionStorage.setItem(key, val);
}

export function removeSessionStorage (key) {
  return sessionStorage.removeItem(key);
}
