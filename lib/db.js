import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('DB connected')
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('DB connection error:', e) // Log error
    throw e
  }

  return cached.conn
}

export default dbConnect
