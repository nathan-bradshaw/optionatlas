import { api } from '@/api/client'

export type AuthBody = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export async function login(body: AuthBody) {
  try {
    const res = await api.post<LoginResponse>('auth/login', body)
    console.log('Login successful:', res.data)
    return res.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export async function register(body: AuthBody) {
  try {
    const res = await api.post('auth/register', body)
    console.log('Registration successful:', res.data)
    return res.data
  } catch (error) {
    console.error('Registration failed:', error)
    throw error
  }
}
