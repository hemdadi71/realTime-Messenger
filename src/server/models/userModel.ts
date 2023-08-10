import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
//   image: { type: String, required: false },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: false },
})

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel
