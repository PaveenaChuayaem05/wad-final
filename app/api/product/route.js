import { MongoClient } from 'mongodb'
import clientPromise from '../../../lib/mongodb' // Adjust the path as needed

export async function GET() {
  const client = await clientPromise
  const db = client.db('final')

  const products = await db.collection('products').find({}).toArray()

  return new Response(JSON.stringify(products), { status: 200 })
}

export async function POST(req) {
  const client = await clientPromise
  const db = client.db('final')
  const newProduct = await req.json()

  await db.collection('products').insertOne(newProduct)

  return new Response(JSON.stringify({ message: 'Product added' }), {
    status: 201,
  })
}
