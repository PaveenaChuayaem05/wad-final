import { NextResponse } from 'next/server'

let customers = [] // Temporary in-memory storage for customers

export async function GET(request, { params }) {
  const { id } = params
  const customer = customers.find((c) => c.id === parseInt(id))
  if (!customer) {
    return NextResponse.json({ message: 'Customer not found' }, { status: 404 })
  }
  return NextResponse.json(customer)
}

export async function PUT(request, { params }) {
  const { id } = params
  const data = await request.json()
  const index = customers.findIndex((c) => c.id === parseInt(id))

  if (index === -1) {
    return NextResponse.json({ message: 'Customer not found' }, { status: 404 })
  }

  customers[index] = { ...customers[index], ...data }
  return NextResponse.json(customers[index])
}

export async function DELETE(request, { params }) {
  const { id } = params
  const index = customers.findIndex((c) => c.id === parseInt(id))

  if (index === -1) {
    return NextResponse.json({ message: 'Customer not found' }, { status: 404 })
  }

  customers.splice(index, 1)
  return NextResponse.json({ message: 'Customer deleted' })
}
