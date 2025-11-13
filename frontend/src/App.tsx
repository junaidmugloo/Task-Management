import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import EditTask from './pages/EditTask'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'


function Protected({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token)
  useEffect(() => { useAuthStore.getState().init() }, [])
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/add-task" element={<Protected><EditTask /></Protected>} />
      <Route path="/edit-task/:id" element={<Protected><EditTask /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      
    </Routes>
  )
}