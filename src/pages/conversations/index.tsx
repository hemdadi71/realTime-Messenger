'use client'
import { getToken } from '@/actions/getToken'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ConversationList from './components/ConversationList'
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

  if (isClient) {
    if ((pathname.includes('/conversations') && isLogin) || isToken) {
      return (
        <>
          <ConversationList />
        </>
      )
    } else {
      router.push('/')
    }
  }
}

export default Conversations
