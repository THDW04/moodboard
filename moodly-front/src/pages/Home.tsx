import { useEffect, useMemo, useRef, useState } from 'react'
import { getReferences } from '../services/references'
import type { VisualReference } from '../services/references'
import EditReferenceForm from '../components/EditReferenceForm'
import ReferenceFilters from '../components/Filters'
import ReferenceGrid from '../components/GridReferences'
import ReferenceDetail from '../components/DetailRef'
import '../components/ReferenceLayout.css'

function HomePage() {
  const [references, setReferences] = useState<VisualReference[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [editingReference, setEditingReference] =
    useState<VisualReference | null>(null)

  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getReferences()
      .then(setReferences)
      .catch(() => {
        setError('Impossible de contacter Moodly. Vérifie le serveur API.')
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(
    () => [...new Set(references.map((r) => r.category).filter(Boolean))],
    [references]
  )

  const filteredReferences = useMemo(
    () =>
      references.filter(
        (r) =>
          (category === '' || r.category === category) &&
          r.title.toLowerCase().includes(search.toLowerCase())
      ),
    [references, category, search]
  )

  const selectedReference =
    references.find((r) => r.id === selectedId) ?? null

  // Garde la dernière ref affichée pour que le contenu reste visible
  // pendant l'animation de fermeture du panneau
  const lastReference = useRef<VisualReference | null>(null)

  useEffect(() => {
    if (selectedReference) lastReference.current = selectedReference
  }, [selectedReference])

  const displayedReference = selectedReference ?? lastReference.current

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Veux-tu vraiment supprimer cette inspiration ?'
    )
    if (!confirmed) return

    try {
      const response = await fetch(`http://localhost:3333/references/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('La suppression a échoué.')

      setReferences((current) => current.filter((r) => r.id !== id))
      setSelectedId((current) => (current === id ? null : current))
    } catch (error) {
      console.error(error)
      alert('Impossible de supprimer cette inspiration.')
    }
  }

  return (
    <>
      <div className={`moodly-layout${selectedReference ? ' has-detail' : ''}`}>
        <ReferenceFilters
          categories={categories}
          selectedCategory={category}
          search={search}
          onCategoryChange={setCategory}
          onSearchChange={setSearch}
        />

        <section className="reference-grid-area">
          <h2>Mes inspirations</h2>

          {loading && <p>Chargement des inspirations...</p>}
          {error && <p role="alert">{error}</p>}
          {!loading && !error && filteredReferences.length === 0 && (
            <p>Aucune inspiration à afficher.</p>
          )}

          <ReferenceGrid
            references={filteredReferences}
            selectedId={selectedId}
            onSelect={(r) =>
              setSelectedId((current) => (current === r.id ? null : r.id))
            }
          />
        </section>

        <div
          className="reference-detail-wrapper"
          aria-hidden={!selectedReference}
        >
          {displayedReference && (
            <ReferenceDetail
              reference={displayedReference}
              onClose={() => setSelectedId(null)}
              onEdit={setEditingReference}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {editingReference && (
        <EditReferenceForm
          reference={editingReference}
          onUpdated={(updated) => {
            setReferences((current) =>
              current.map((r) => (r.id === updated.id ? updated : r))
            )
            setEditingReference(null)
          }}
          onCancel={() => setEditingReference(null)}
        />
      )}
    </>
  )
}

export default HomePage