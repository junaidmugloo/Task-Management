import { ReactNode } from 'react'

export default function AuthCard({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">{title}</h2>
        {children}
      </div>
    </div>
  )
}