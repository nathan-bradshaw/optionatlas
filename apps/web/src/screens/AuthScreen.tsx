import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login, register, type AuthBody } from '@/api/auth'

type Props = {
  onAuthenticated: (token: string) => void
}

export function AuthScreen({ onAuthenticated }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const registerMutation = useMutation({
    mutationFn: (body: AuthBody) => register(body),
  })

  const loginMutation = useMutation({
    mutationFn: (body: AuthBody) => login(body),
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken)
      onAuthenticated(data.accessToken)
    },
  })

  const isLoading = registerMutation.isPending || loginMutation.isPending
  const error = registerMutation.error || loginMutation.error

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = { email, password }
    if (mode == 'login') loginMutation.mutate(body)
    else registerMutation.mutate(body)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="w-full max-w-sm border border-slate-800 rounded-2xl p-6 bg-slate-900/60">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">OptionAtlas</h1>
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={
                mode === 'login' ? 'font-semibold underline' : 'opacity-60'
              }
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={
                mode === 'register' ? 'font-semibold underline' : 'opacity-60'
              }
            >
              Register
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-400">
              Something went wrong. Check email/password and try again.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-60 py-2 text-sm font-medium"
          >
            {isLoading
              ? 'Working...'
              : mode === 'login'
              ? 'Log in'
              : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}
