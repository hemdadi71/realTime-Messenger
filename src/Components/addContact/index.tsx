import { getUsers } from '@/actions/getUsers'
import { getUsersByEmail } from '@/actions/getUsersByEmail'
import React, { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'
import { debounce } from 'lodash'
import Spinner from '../Spinner'
import ShowUsers from '../showUsers'
import NotFound from '../notFound'
import Button from '../button'
import axios from 'axios'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { toast } from 'react-hot-toast'
interface AddContactProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const AddContact: React.FC<AddContactProps> = ({ setIsModalOpen }) => {
  const [value, setValue] = useState('')
  const { data, isLoading } = useQuery(['getUserByEmail', value], () =>
    getUsersByEmail({ email: value })
  )
  const handleChange = (e: any) => {
    setValue(e.target.value)
  }
  const debouncedHandleChange = debounce(handleChange, 2000)
  const currentUser = getCurrentUser()
  const handleAddToContacts = () => {
    if (data) {
      const newData = {
        userId: currentUser.id,
        contact: data,
      }
      axios
        .post('/api/contact', newData)
        .then(res => {
          toast.success('Contact add successfully👌')
          setIsModalOpen(false)
        })
        .catch(error => {
          toast.error(error.response.data.error)
        })
    }
  }
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-semibold py-2 border-b">
          Find user by email address
        </h1>
        <form
          onSubmit={e => {
            e.preventDefault()
          }}
          className="flex flex-col gap-3">
          <label htmlFor="email" className="text-md font-semibold">
            Email:
          </label>
          <div className="relative w-full flex items-center border-b pb-4">
            <input
              type="search"
              id="email"
              placeholder="Enter email address"
              onChange={debouncedHandleChange}
              className="outline-none rounded-full bg-gray-100 py-1 px-3 w-full"
            />
            {isLoading && (
              <div className="absolute right-2">
                <Spinner className="w-5 h-5" />
              </div>
            )}
          </div>
          {value ? data ? <ShowUsers user={data?.data.user} /> : <NotFound /> : null}
          <Button
            onClick={handleAddToContacts}
            isLoading={isLoading}
            type="button"
            className="mt-4">
            Add to contacts
          </Button>
        </form>
      </div>
    </>
  )
}

export default AddContact

// {
//   id:f;sldfkjflksjf,
//   fullName:Hosein Emdadi,
//   email:hemdadi81@gamil.com,
//   avatar:s;BsFillEmojiLaughingFill.jpg,
//   contacts:[
//     {
//       id:f;sldfkjflksjf,
//   fullName:mohammad Emdadi,
//   email:mohammad@gamil.com,
//   avatar:s;BsFillEmojiLaughingFill.jpg,
//     }
//   ]
// }
