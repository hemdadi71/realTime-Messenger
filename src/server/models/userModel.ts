import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: false },
  avatar: { type: String, required: false },
  contacts: { type: Array, required: false, default: [] },
})

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel
