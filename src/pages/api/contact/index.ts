/* eslint-disable import/no-anonymous-default-export */
// pages/api/addContact.js

import { NextApiRequest, NextApiResponse } from 'next'

import UserModel from '@/server/models/userModel'
import dbConnect from '@/libs/dbConenct'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { userId, contact } = req.body

      if (!userId || !contact) {
        res
          .status(400)
          .json({ success: false, message: 'Missing required data' })
        return
      }

      // Find the user by userId
      const user = await UserModel.findById(userId)

      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' })
        return
      }
      const existingContact = user.contacts.find(
        (item: any) => item.id === contact.id
      )
      if (existingContact) {
        res.status(400).json({
          success: false,
          error: 'Contact is already exists',
        }) // Contact already exists, return success
        return
      }
      // Add the contact to the user's contacts array
      user.contacts.push(contact)
      await user.save()

      res.status(200).json({ success: true, user })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' })
  }
}
