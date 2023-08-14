import React from 'react'
import Avatar from '../avatar/Avatar'
import Link from 'next/link'

interface ContactBoxProps {
  user: {
    id: string
    fullName: string
    avatar?: string
    email: string
    contacts?: any
  }
}

const ContactBox: React.FC<ContactBoxProps> = ({ user }) => {
  return (
    <>
      <Link
        href={`/conversations/${user.id}`}
        className="rounded-md py-2 px-3 flex gap-3 items-center hover:bg-neutral-100 hover:text-blue-500">
        <div>
          <Avatar user={user} />
        </div>
        <p className="text-md font-semibold">{user.fullName}</p>
      </Link>
    </>
  )
}

export default ContactBox
