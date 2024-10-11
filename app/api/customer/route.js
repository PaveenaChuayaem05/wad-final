import { NextResponse } from 'next/server'

let customers = [] // Temporary in-memory storage for customers

export async function GET() {
  return NextResponse.json(customers)
}

export async function POST(request) {
  const data = await request.json()
  const newCustomer = { id: Date.now(), ...data }
  customers.push(newCustomer)
  return NextResponse.json(newCustomer, { status: 201 })
}
