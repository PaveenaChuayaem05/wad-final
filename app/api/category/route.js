import { MongoClient } from 'mongodb'
import clientPromise from '../../../lib/mongodb' // Adjust the path as needed

export async function GET() {
  const client = await clientPromise
  const db = client.db('final')

  const categories = await db.collection('categories').find({}).toArray()

  return new Response(JSON.stringify(categories), { status: 200 })
}

export async function POST(req) {
  const client = await clientPromise
  const db = client.db('final')
  const newCategory = await req.json()

  await db.collection('categories').insertOne(newCategory)

  return new Response(JSON.stringify({ message: 'Category added' }), {
    status: 201,
  })
}
