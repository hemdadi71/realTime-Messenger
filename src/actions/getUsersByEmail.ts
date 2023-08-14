import axios from 'axios'

export const getUsersByEmail = async (email: any) => {
  try {
    const data = await axios.post('/api/userByEmail', email)
    return data
  } catch (error) {
    console.log(error)
  }
}
