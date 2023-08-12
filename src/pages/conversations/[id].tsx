import { useRouter } from 'next/router'
import React from 'react'
import ContactsLayout from '../contacts/components/Layout'

const SelectedContact = () => {
  const router = useRouter()
  const id = router.query.id
  console.log(router.query.id)
  return (
    <>
      <ContactsLayout>
        <div>{id}</div>
      </ContactsLayout>
    </>
  )
}

export default SelectedContact
