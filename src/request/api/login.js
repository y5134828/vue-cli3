import request from '@/request/request';

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  });
}

export function sendSmsCode (data) {
  return request({
    url: '/adminsend',
    method: 'post',
    data: data
  });
}

export function getInfo () {
  return request({
    url: '/user/info',
    method: 'post',
    data: { '': '' }
  });
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}

export function passwordChange (data) {
  return request({
    url: '/password/change',
    method: 'post',
    data: data
  });
}
