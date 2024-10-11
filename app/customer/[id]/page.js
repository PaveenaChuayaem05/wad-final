'use client' // This file uses client-side code

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const CustomerDetailPage = ({ params }) => {
  const router = useRouter()
  const { id } = params
  const [customer, setCustomer] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`/api/customer/${id}`)
      if (!response.ok) {
        console.error('Failed to fetch customer:', response.statusText)
        return
      }

      const data = await response.json()
      if (!data) {
        console.error('No customer data returned')
        return
      }

      setCustomer(data)
      setName(data.name)
      setEmail(data.email)
    }

    fetchCustomer()
  }, [id])

  const handleUpdateCustomer = async (e) => {
    e.preventDefault()
    const updatedCustomer = { name, email }
    const response = await fetch(`/api/customer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCustomer),
    })

    if (response.ok) {
      router.push('/customer')
    } else {
      console.error('Failed to update customer:', response.statusText)
    }
  }

  const handleDeleteCustomer = async () => {
    const response = await fetch(`/api/customer/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      router.push('/customer')
    } else {
      console.error('Failed to delete customer:', response.statusText)
    }
  }

  if (!customer) return <div>Loading...</div>

  return (
    <div>
      <h1>Edit Customer</h1>
      <form onSubmit={handleUpdateCustomer}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Update Customer</button>
      </form>
      <button onClick={handleDeleteCustomer}>Delete Customer</button>
    </div>
  )
}

export default CustomerDetailPage
