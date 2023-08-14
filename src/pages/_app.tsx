import ToasterContext from '@/context/ToasterContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SideBar } from '../Components/sidebar'
import ContactsLayout from './contacts/components/Layout'
import { useRouter } from 'next/router'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.pathname !== '/') {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <SideBar>
            <Component {...pageProps} />
          </SideBar>
          <ToasterContext />
        </QueryClientProvider>
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
