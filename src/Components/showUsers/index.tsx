import React from 'react'

 interface ShowUsersProps {
  user: {
    id: string
    fullName: string
    avatar?: string
    email: string
    contacts?: any
  }
}

const ShowUsers: React.FC<ShowUsersProps> = ({ user }) => {
  return (
    <>
      <div className="flex flex-col gap-2 mt-2">
        <h1 className="font-semibold">Result:</h1>
        <p className="font-semibold">
          Full name: <span className="text-blue-500">{user.fullName}</span>
        </p>
        <p className="font-semibold">
          Email: <span className="text-blue-500">{user.email}</span>
        </p>
      </div>
    </>
  )
}

export default ShowUsers
