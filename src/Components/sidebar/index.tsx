import { useRouter } from 'next/router'
import React from 'react'
import Cookies from 'js-cookie'
import SelectedContact from '@/pages/conversations/[id]'
import ContactsLayout from '@/pages/contacts/components/Layout'
import Link from 'next/link'
import { getCurrentUser } from '@/actions/getCurrentUser'
import DesktopSidebar from './DesktopSidebar'
import EmptyState from '../emptyState'
export const SideBar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { pathname } = router
  const currentUser = getCurrentUser()

  return (
    <>
      <div className="flex h-screen">
        <DesktopSidebar />

        <main className="h-screen overflow-hidden flex w-full">
          <div className="w-[23%]">{children}</div>
          {(pathname === '/conversations' || pathname === '/contacts') && (
            <EmptyState />
          )}
        </main>
      </div>
    </>
  )
}
