import Cookies from 'js-cookie'

export const getToken = () => {
  const token = Cookies.get('token')
  if (token) {
    return true
  } else {
    return false
  }
}
