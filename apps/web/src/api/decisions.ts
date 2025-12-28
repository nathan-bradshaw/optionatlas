import { api } from './client'

export type Decision = {
  id: string
  title: string
  description?: string | null
  createdAt?: string
}

export type CreateDecisionBody = {
  title: string
  description?: string
}

export type Factor = {
  id: string
  decisionId: string
  type: 'PRO' | 'CON'
  text: string
  weight: number
  createdAt?: string
}

export type CreateFactorBody = {
  type: 'PRO' | 'CON'
  text: string
  weight: number
}

export async function getDecisions() {
  const res = await api.get<Decision[]>('/api/decisions')
  return res.data
}

export async function createDecision(body: CreateDecisionBody) {
  const res = await api.post<Decision>('/api/decisions', body)
  return res.data
}

export async function getFactors(decisionId: string) {
  const res = await api.get<Factor[]>(`/api/decisions/${decisionId}/factors`)
  return res.data
}

export async function createFactor(decisionId: string, body: CreateFactorBody) {
  const res = await api.post<Factor>(
    `/api/decisions/${decisionId}/factors`,
    body,
  )
  return res.data
}
