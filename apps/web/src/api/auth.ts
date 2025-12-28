import { api } from '@/api/client'

export type AuthBody = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export async function login(body: AuthBody) {
  const res = await api.post<LoginResponse>('auth/login', body)
  return res.data
}

export async function register(body: AuthBody) {
  const res = await api.post('auth/register', body)
  return res.data
}
