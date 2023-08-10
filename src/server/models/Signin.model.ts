// server/models/User.model.js

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})
const SigninModel = mongoose.models.User || mongoose.model('User', userSchema)

export default SigninModel
