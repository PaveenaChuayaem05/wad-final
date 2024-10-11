// lib/mongodb.js
import { MongoClient } from 'mongodb'

const uri = process.env.NEXT_PUBLIC_API_URL // Ensure this is set correctly in your .env file

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, create a new connection for each request
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise
