import dbConnect from '@/libs/dbConenct'
import UserModel from '@/server/models/userModel'
import axios from 'axios'

export const getUsers = async () => {
  try {
    const {data} = await axios.get('/api/users')
    return data.data
  } catch (error) {
    console.log(error)
  }
}
