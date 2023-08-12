import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import Avatar from '../avatar/Avatar'
import { getCurrentUser } from '@/actions/getCurrentUser'
import Modal from '../Modal'
import ProfileSetting from '../profileSetting'
import Cookies from 'js-cookie'
const DesktopSidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const router = useRouter()
  const { pathname } = router
  const currentUser = getCurrentUser()
  const className = `w-10 h-10 rounded-md transition-all ease-in-out duration-300 flex items-center outline-none justify-center hover:text-blue-500`
  const handleLogOut = () => {
    Cookies.remove('token')
    localStorage.removeItem('isLogin')
    router.push('/')
  }
  return (
    <>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="flex flex-col items-center justify-center pb-5 border-r border-gray-200">
          <Tab.List className="flex flex-col gap-4 h-full p-5">
            <Tab as={Fragment}>
              <Link
                href="/conversations"
                className={`${className} ${
                  selectedIndex === 0 && pathname === '/conversations'
                    ? 'bg-neutral-100 text-blue-500'
                    : 'text-gray-900'
                }`}>
                <HiChat size={27} />
              </Link>
            </Tab>
            <Tab as={Fragment}>
              <Link
                href="/contacts"
                className={`${className} ${
                  selectedIndex === 1 || pathname === '/contacts'
                    ? 'bg-neutral-100 text-blue-500'
                    : 'text-gray-900'
                }`}>
                <HiUsers size={27} />
              </Link>
            </Tab>
            <Tab as={Fragment}>
              <Link
                href="/"
                onClick={handleLogOut}
                className={`${className} ${
                  selectedIndex === 2 && 'bg-neutral-100 outline-none'
                }`}>
                <HiArrowLeftOnRectangle size={27} />
              </Link>
            </Tab>
          </Tab.List>
          <div className="cursor-pointer" onClick={() => setIsOpenModal(true)}>
            <Avatar user={currentUser} />
          </div>
        </div>
      </Tab.Group>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <ProfileSetting />
      </Modal>
    </>
  )
}

export default DesktopSidebar
