import { useState } from 'react'
import api from '../api/axiosClient'
import { useNavigate, Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = async (e: any) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', form)
      alert('Account created. Please login.')
      navigate('/login')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <AuthCard title="Register">
      <form onSubmit={submit} className="space-y-4">
       
        <input className="w-full border rounded-lg p-3 bg-gray-50 dark:bg-gray-700" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="w-full border rounded-lg p-3 bg-gray-50 dark:bg-gray-700" placeholder="Password" type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">Register</button>

        <p className="text-center text-gray-500">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </AuthCard>
  )
}