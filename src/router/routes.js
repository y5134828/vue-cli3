function load (component) {
  return resolve => require([`../views/${component}`], resolve)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: load('Home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/user/login',
    name: 'login',
    component: load('user/login'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '*',
    redirect: {
      path: '/'
    }
  }
]
export default routes
