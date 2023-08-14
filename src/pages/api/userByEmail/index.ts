import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

import crypto from 'crypto'
import UserModel from '@/server/models/userModel'
import dbConnect from '@/libs/dbConenct'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  await dbConnect()

  if (method === 'POST') {
    try {
      const { email } = body
      // Check if required properties exist
      if (!email) {
        res
          .status(400)
          .json({ success: false, message: 'Missing required properties' })
        return
      }

      const user = await UserModel.findOne({ email })

      if (!user) {
        res.status(401).json({ success: false, message: 'Invalid credentials' })
        return
      }
      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          avatar: user.avatar,
          fullName: user.fullName,
          contacts: user.contacts,
        },
      })
    } catch (error) {
      res
        .status(400)
        .json({ success: false, error: 'error with status code 400' })
    }
  } else {
    res.status(400).json({ success: false })
  }
}
