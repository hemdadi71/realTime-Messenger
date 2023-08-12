import Cookies from 'js-cookie'

export const handleLogOut = ({ router }: any) => {
  Cookies.remove('token')
  localStorage.removeItem('isLogin')
  router.push('/')
}
