import { api } from './client'

export type Decision = {
  id: string
  title: string
  description?: string | null
  createdAt?: string
}

export type createDecisionBody = {
  title: string
  description?: string
}

export async function getDecisions() {
  try {
    const res = await api.get<Decision[]>('/api/decisions')
    console.log('Fetched decisions: ', res.data)
    return res.data
  } catch (error) {
    console.error('Failed to fetch decisions: ', error)
  }
}

export async function createDecision(body: createDecisionBody) {
  try {
    const res = await api.post<Decision>('/api/decisions', body)
    console.log('Created decision: ', res.data)
    return res.data
  } catch (error) {
    console.error('Failed to create decision: ', error)
  }
}
