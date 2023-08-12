import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from './components/Layout'
import Link from 'next/link'
import Modal from '@/Components/Modal'
import { AiOutlineUserAdd } from 'react-icons/ai'
import AddContact from '@/Components/addContact'
const contacts = [
  {
    name: 'hosein',
    id: 1,
  },
  {
    name: 'mohammad',
    id: 2,
  },
  {
    name: 'reza',
    id: 3,
  },
]

const Contacts = () => {
  const router = useRouter()
  const { pathname } = router
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <div
        className={`flex flex-col gap-2 w-full ${
          pathname === '/conversation' || pathname === '/contacts'
            ? 'w-full'
            : 'w-[22%]'
        }`}>
        <div className="flex items-center justify-between py-2 px-3">
          <h1 className="text-lg font-bold">Contacts</h1>
          <div onClick={() => setIsModalOpen(true)}>
            <AiOutlineUserAdd
              size={23}
              className="hover:text-blue-500 transition-all ease-in-out duration-300 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col border p-5 w-full">
          {contacts.map(item => (
            <Link key={item.id} href={`/conversations/${item.id}`}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddContact />
      </Modal>
    </>
  )
}

export default Contacts
