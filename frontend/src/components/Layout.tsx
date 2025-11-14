import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const links = [
  { to: '/', label: '📊 Dashboard' },
  { to: '/add-task', label: '📝 Add Task' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const logout = useAuthStore((s) => s.logout)
  const loc = useLocation()
  const [open, setOpen] = useState(true)

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      
      {/* Sidebar */}
      <aside
        className={`
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          p-4 transition-all duration-300 
          ${open ? 'w-64' : 'w-16'}
        `}
      >

        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="mb-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {open ? '←' : '→'}
        </button>

        {/* Header */}
        {open && (
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Task Admin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage tasks easily
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`
                block px-3 py-2 rounded-md whitespace-nowrap overflow-hidden
                ${loc.pathname === l.to
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              {open ? l.label : l.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {open ? '⏻ Logout' : '⏻'}
          </button>
        </div>

      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

    </div>
  )
}
