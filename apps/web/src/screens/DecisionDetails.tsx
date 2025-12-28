import { createFactor, getFactors, type Decision } from '@/api/decisions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type Props = {
  decision: Decision
  onBack: () => void
}

type FactorForm = {
  type: 'PRO' | 'CON'
  text: string
  weight: number
}

export default function DecisionDetails({ decision, onBack }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState<FactorForm>({
    type: 'PRO',
    text: '',
    weight: 1
  })

  const factorsQuery = useQuery({
    queryKey: ['factors', decision.id],
    queryFn: () => getFactors(decision.id)
  })

  const addMutation = useMutation({
    mutationKey: ['addFactor', decision.id],
    mutationFn: (body: Omit<FactorForm, never>) =>
      createFactor(decision.id, body),
    onSuccess: () => {
      setForm((prev) => ({ ...prev, text: '' }))
      qc.invalidateQueries({ queryKey: ['factors', decision.id] })
    }
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.text.trim()) return
    addMutation.mutate({
      type: form.type,
      text: form.text.trim(),
      weight: form.weight
    })
  }

  const factors = factorsQuery.data || []
  const pros = factors.filter((f) => f.type == 'PRO')
  const cons = factors.filter((f) => f.type == 'CON')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-slate-100 mb-4"
        >
          ← Back to decisions
        </button>

        <header className="mb-6">
          <h1 className="text-2xl font-semibold">{decision.title}</h1>
          {decision.description && (
            <p className="text-sm text-slate-400 mt-1">
              {decision.description}
            </p>
          )}
        </header>

        <section className="mb-6 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
          <h2 className="text-sm font-semibold mb-3">Add a factor</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[100px,1fr,80px] gap-2 items-center"
          >
            <select
              value={form.type}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  type: e.target.value as 'PRO' | 'CON'
                }))
              }
              className="rounded-lg bg-slate-950 border border-slate-700 px-2 py-2 text-xs outline-none focus:border-sky-500"
            >
              <option value="PRO">Pro</option>
              <option value="CON">Con</option>
            </select>

            <input
              value={form.text}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, text: e.target.value }))
              }
              className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
              placeholder="What is the factor?"
              required
            />

            <input
              type="number"
              min={1}
              max={10}
              value={form.weight}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  weight: Number(e.target.value) || 1
                }))
              }
              className="rounded-lg bg-slate-950 border border-slate-700 px-2 py-2 text-xs outline-none focus:border-sky-500 text-center"
            />
          </form>
          <p className="mt-1 text-[10px] text-slate-500">
            Weight is how strong this factor is (1–10)
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-emerald-700/70 rounded-2xl p-4 bg-emerald-950/20">
            <h2 className="text-sm font-semibold text-emerald-300 mb-2">
              Pros
            </h2>
            {pros.length === 0 && (
              <p className="text-xs text-emerald-200/70">
                No pros yet. Add your first one above.
              </p>
            )}
            <ul className="space-y-1">
              {pros.map((f) => (
                <li
                  key={f.id}
                  className="text-xs bg-emerald-900/40 border border-emerald-700/60 rounded-lg px-3 py-2 flex justify-between gap-2"
                >
                  <span>{f.text}</span>
                  <span className="text-[10px] opacity-70">w {f.weight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-rose-700/70 rounded-2xl p-4 bg-rose-950/20">
            <h2 className="text-sm font-semibold text-rose-300 mb-2">Cons</h2>
            {cons.length === 0 && (
              <p className="text-xs text-rose-200/70">
                No cons yet. Add your first one above.
              </p>
            )}
            <ul className="space-y-1">
              {cons.map((f) => (
                <li
                  key={f.id}
                  className="text-xs bg-rose-900/40 border border-rose-700/60 rounded-lg px-3 py-2 flex justify-between gap-2"
                >
                  <span>{f.text}</span>
                  <span className="text-[10px] opacity-70">w {f.weight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
