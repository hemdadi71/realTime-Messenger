import { SideBar } from '@/Components/sidebar'
import React from 'react'
import Contacts from '..'

const ContactsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <Contacts />
        <div className="w-[77%]">
          <header className="bg-purple-400  overflow-hidden">Header</header>
          {children}
        </div>
      </div>
    </>
  )
}

export default ContactsLayout
