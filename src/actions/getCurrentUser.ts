import Cookies from 'js-cookie'

export const getCurrentUser = () => {
  const cookies = Cookies.get('token')
  const token = cookies ? JSON.parse(cookies) : null

  return token
}
