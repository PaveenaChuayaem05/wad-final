import { MongoClient } from 'mongodb'
import clientPromise from '../../../lib/mongodb' // Adjust the path as needed

export async function GET(req, { params }) {
  const client = await clientPromise
  const db = client.db('final')

  const product = await db.collection('products').findOne({ _id: params.id })

  if (!product) {
    return new Response(JSON.stringify({ message: 'Product not found' }), {
      status: 404,
    })
  }

  return new Response(JSON.stringify(product), { status: 200 })
}

export async function DELETE(req, { params }) {
  const client = await clientPromise
  const db = client.db('final')

  const result = await db.collection('products').deleteOne({ _id: params.id })

  if (result.deletedCount === 0) {
    return new Response(JSON.stringify({ message: 'Product not found' }), {
      status: 404,
    })
  }

  return new Response(JSON.stringify({ message: 'Product deleted' }), {
    status: 200,
  })
}
