import Mock from 'mockjs';

const Random = Mock.Random; // 获取 mock.Random 对象
const login = () => {
  let userinfo = {
    code: 1,
    msg: 'success',
    data: {
      'token': Random.string('lower', 16, 32),
      'userInfo': { 'name': Random.cword(3) }
    }
  };
  return userinfo;
}

const userInfo = () => {
  let userinfo = {
    code: 1,
    msg: 'success',
    data: {
      'userInfo': { 'name': Random.cword(3) }
    }
  };
  return userinfo;
};

export {
  login,
  userInfo
};
