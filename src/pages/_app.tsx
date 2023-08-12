import ToasterContext from '@/context/ToasterContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SideBar } from '../Components/sidebar'
import ContactsLayout from './contacts/components/Layout'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.pathname !== '/') {
    return (
      <>
        <SideBar>
          <Component {...pageProps} />
        </SideBar>
        <ToasterContext />
      </>
    )
  } else {
    return (
      <>
        <Component {...pageProps} />
        <ToasterContext />
      </>
    )
  }
}
