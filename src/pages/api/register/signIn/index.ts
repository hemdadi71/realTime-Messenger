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
      const { email, password } = body
      // Check if required properties exist
      if (!email || !password) {
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

      const isPasswordValid = (await user.password) === password
      if (!isPasswordValid) {
        res.status(401).json({ success: false, message: 'Invalid credentials' })
        return
      }

      const accessTokenSecret = crypto.randomBytes(64).toString('hex')
      const refreshTokenSecret = crypto.randomBytes(64).toString('hex')
      // Generate tokens
      const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret)
      const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret)
      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          avatar: user.avatar,
          accessToken,
          refreshToken,
        },
        tokens: {
          accessToken,
          refreshToken,
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
