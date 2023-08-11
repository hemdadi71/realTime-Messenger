import AuthForm from '@/Components/authForm'
import { Main } from '@/Components/main'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getToken } from '@/actions/getToken'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const isToken = getToken()
  if (isToken) {
    router.push('/conversations')
  } else {
    return (
      <>
        <Main />
      </>
    )
  }
}
