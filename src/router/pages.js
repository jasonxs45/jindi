const Home = r => require.ensure([], () => r(require('pages/Home')), 'Home')
export default [
  {
    path: '/',
    name: '',
    component: Home
  }
]
