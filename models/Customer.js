import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Customer's name
  DOB: { type: Date, required: true }, // Customer's date of birth
  member_number: { type: Number, required: true, unique: true }, // Unique member number
  interest: { type: String, required: false }, // Customer's interest, not required
})

const Customer =
  mongoose.models.customer || mongoose.model('customer', customerSchema)

export default Customer
