import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Link from 'next/link'
import Modal from '@/Components/Modal'
import { AiOutlineUserAdd } from 'react-icons/ai'
import AddContact from '@/Components/addContact'
import { getUsers } from '@/actions/getUsers'
import { useQuery } from 'react-query'
import { getCurrentUser } from '@/actions/getCurrentUser'
import ContactBox from '@/Components/contactBox'
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
  const [currentUser, setCurrentUser] = useState<any>({})
  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
    } else {
      const localUserData = localStorage.getItem('token')
      const user = localUserData ? JSON.parse(localUserData) : null
      setCurrentUser(user)
    }
  }, [])
  console.log(currentUser)
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between py-2 px-3">
          <h1 className="text-lg font-bold">Contacts</h1>
          <div onClick={() => setIsModalOpen(true)}>
            <AiOutlineUserAdd
              size={23}
              className="hover:text-blue-500 transition-all ease-in-out duration-300 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 px-2 w-full overflow-auto">
          {Object.keys(currentUser).length &&
            currentUser?.contacts.map((item: any) => (
              <ContactBox key={item.id} user={item} />
            ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddContact setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  )
}

export default Contacts
