import { useEffect, useState } from 'react'
import api from '../api/axiosClient'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { Task } from '../types/Task'

export default function EditTask() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()

  const [task, setTask] = useState<Task>({ title: '', description: '', status: 'incomplete' })

  useEffect(() => {
    if (isEdit) {
      api.get(`/tasks/${id}`).then(res => setTask(res.data))
    }
  }, [id])

  const submit = async (e: any) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await api.put(`/tasks/${id}`, task)
      } else {
        await api.post('/tasks', task)
      }
      alert('Saved')
      navigate('/')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Save failed')
    }
  }

  return (
    <Layout>
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{isEdit ? 'Edit Task' : 'Add Task'}</h2>

        <input className="w-full border rounded-lg p-3 mb-3 bg-gray-50 dark:bg-gray-700" placeholder="Title" value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })} />

        <textarea className="w-full border rounded-lg p-3 mb-3 bg-gray-50 dark:bg-gray-700" placeholder="Description" value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })} />

        <select className="w-full border rounded-lg p-3 mb-3 bg-gray-50 dark:bg-gray-700" value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value as any })}>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>

        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" onClick={() => navigate('/')} className="px-4 py-2 border rounded-md">Cancel</button>
        </div>
      </form>
    </Layout>
  )
}