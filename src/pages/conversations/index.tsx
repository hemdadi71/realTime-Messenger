'use client'
import { getToken } from '@/actions/getToken'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const Conversations = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()
  const isToken = getToken()
  const { pathname } = router
  useEffect(() => {
    const localIsLogin = localStorage.getItem('isLogin')
    const Login = localIsLogin && JSON.parse(localIsLogin)
    if (localIsLogin) {
      Login.isLogin && setIsLogin(true)
    }
  }, [isLogin])

  const handleLogOut = () => {
    Cookies.remove('token')
    localStorage.removeItem('isLogin')
    router.push('/')
  }
  if (isClient) {
    if ((pathname.includes('/conversations') && isLogin) || isToken) {
      return (
        <>
          <div>conversations</div>
          <button onClick={handleLogOut} className="bg-red-500">
            Log Out
          </button>
        </>
      )
    } else {
      router.push('/')
    }
  }
}

export default Conversations
