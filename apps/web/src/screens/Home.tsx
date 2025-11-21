import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getDecisions, createDecision, type Decision } from '@/api/decisions'
import { useState } from 'react'

export default function Home() {
  const qc = useQueryClient()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const decisionsQuery = useQuery({
    queryKey: ['decisions'],
    queryFn: getDecisions,
  })

  const createMutation = useMutation({
    mutationKey: ['createDecision'],
    mutationFn: createDecision,
    onSuccess: () => {
      setTitle('')
      setDescription('')
      qc.invalidateQueries({ queryKey: ['decisions'] })
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    createMutation.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
    })
  }

  const isLoading = decisionsQuery.isLoading
  const isCreating = createMutation.isPending
  const decisions = decisionsQuery.data || []

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">OptionAtlas</h1>
            <p className="text-sm text-slate-400">
              Compare your decisions with pros and cons
            </p>
          </div>
        </header>

        <section className="mb-8 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
          <h2 className="text-sm font-semibold mb-3">New decision</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-slate-400">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
                placeholder="Enter a title"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-slate-400">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500 min-h-[60px]"
                placeholder="Add more details"
              />
            </div>
            <button
              type="submit"
              disabled={isCreating || !title.trim()}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-sm font-medium"
            >
              {isCreating ? 'Creating…' : 'Add decision'}
            </button>
          </form>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Your decisions</h2>
          </div>

          {isLoading && (
            <p className="text-sm text-slate-400">Loading decisions…</p>
          )}

          {!isLoading && decisions.length === 0 && (
            <p className="text-sm text-slate-500">
              No decisions yet. Create your first one above.
            </p>
          )}

          <div className="space-y-2">
            {decisions.map((d: Decision) => (
              <article
                key={d.id}
                className="border border-slate-800 rounded-xl px-4 py-3 bg-slate-900/60 hover:border-sky-500/60 transition-colors"
              >
                <h3 className="text-sm font-medium">{d.title}</h3>
                {d.description && (
                  <p className="text-xs text-slate-400 mt-1">{d.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
