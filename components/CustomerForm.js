import { useState, useEffect } from 'react'

export default function CustomerForm({ customer, onSubmit }) {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    DOB: customer?.DOB || '',
    member_number: customer?.member_number || '',
    interest: customer?.interest || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="date"
        placeholder="DOB"
        value={formData.DOB}
        onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Member Number"
        value={formData.member_number}
        onChange={(e) =>
          setFormData({ ...formData, member_number: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Interest"
        value={formData.interest}
        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
