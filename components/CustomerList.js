import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CustomerList() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetch('/api/customer')
      .then((res) => res.json())
      .then((data) => setCustomers(data))
  }, [])

  return (
    <div>
      <h1>Customers</h1>
      <Link href="/customer/new">Add New Customer</Link>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.name} - {customer.DOB} - {customer.member_number} -{' '}
            {customer.interest}
            <Link href={`/customer/${customer._id}/edit`}>Edit</Link>
            <Link href={`/customer/${customer._id}/delete`}>Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
