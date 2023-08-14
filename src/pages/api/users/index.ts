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

  if (method === 'GET') {
    try {
      const users = await UserModel.find({})
      if (users) {
        res.status(200).json({ success: true, data: users })
      }
    } catch (error) {
      res
        .status(400)
        .json({ success: false, error: 'error with status code 400' })
    }
  } else {
    res.status(400).json({ success: false })
  }
}
