import { useEffect, useState } from 'react'
import { AuthScreen } from './screens/AuthScreen'
import Home from './screens/Home'

export function App() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('token')
    if (saved) setToken(saved)
  }, [])

  if (!token) {
    return <AuthScreen onAuthenticated={setToken} />
  }

  return <Home />
}
