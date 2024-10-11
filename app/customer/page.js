'use client' // This file uses client-side code

import { useEffect, useState } from 'react'

const CustomerPage = () => {
  const [customers, setCustomers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('/api/customer')
      if (!response.ok) {
        console.error('Failed to fetch customers:', response.statusText)
        return
      }
      const data = await response.json()
      setCustomers(data)
    }

    fetchCustomers()
  }, [])

  const handleAddCustomer = async (e) => {
    e.preventDefault()
    const newCustomer = { name, email }
    const response = await fetch('/api/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    })

    if (response.ok) {
      const customer = await response.json()
      setCustomers([...customers, customer])
      setName('')
      setEmail('')
    } else {
      console.error('Failed to add customer:', response.statusText)
    }
  }

  return (
    <div>
      <h1>Customer Management</h1>
      <form onSubmit={handleAddCustomer}>
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
        <button type="submit">Add Customer</button>
      </form>

      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.email}
            <a href={`/customer/${customer.id}`}> Edit</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomerPage
