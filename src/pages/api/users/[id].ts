// pages/api/users/[id].js


import UserModel from '@/server/models/userModel'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query // Extract the [id] parameter from the request query

  if (req.method === 'GET') {
    try {
      // Retrieve the user by ID from the database
      const user = await UserModel.findById(id)

      if (!user) {
        res.status(404).json({ success: false, error: 'User not found' })
      } else {
        res.status(200).json({ success: true, data: user })
      }
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to fetch user' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { firstname, lastname, phonenumber, address } = req.body

      // Update the user by ID with the data from the request body
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { firstname, lastname, phonenumber, address },
        { new: true, runValidators: true }
      )

      if (!updatedUser) {
        res.status(404).json({ success: false, error: 'User not found' })
      } else {
        res.status(200).json({ success: true, data: updatedUser })
      }
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to update user' })
    }
  } else if (req.method === 'DELETE') {
    try {
      // Delete the user by ID from the database
      const deletedUser = await UserModel.findByIdAndDelete(id)

      if (!deletedUser) {
        res.status(404).json({ success: false, error: 'User not found' })
      } else {
        res.status(200).json({ success: true, data: deletedUser })
      }
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to delete user' })
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
