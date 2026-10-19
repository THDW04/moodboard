import { useEffect, useState } from 'react'
import { getReferences } from './services/references'
import type { VisualReference } from './services/references'
import ReferenceForm from './components/ReferenceForm'
import EditReferenceForm from './components/EditReferenceForm'
import './App.css'

function App() {
  const [references, setReferences] = useState<VisualReference[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getReferences()
      .then(setReferences)
      .catch(() => {
        setError('Impossible de contacter Moodly. Vérifie le serveur API.')
      })
      .finally(() => setLoading(false))
  }, [])

  const [editingReference, setEditingReference] =
    useState<VisualReference | null>(null)


  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Veux-tu vraiment supprimer cette inspiration ?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `http://localhost:3333/references/${id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('La suppression a échoué.')
      }

      setReferences((current) =>
        current.filter((reference) => reference.id !== id)
      )
    } catch (error) {
      console.error(error)
      alert('Impossible de supprimer cette inspiration.')
    }
  }


  return (
    <main className="moodly">
      <header className="moodly-header">
        <h1>Moodly<span>.</span></h1>
        <p>Ton espace d'inspiration créative.</p>
      </header>

      <section>
        <h2>Mes inspirations</h2>

        {loading && <p>Chargement des inspirations...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && references.length === 0 && (
          <p>Aucune inspiration pour le moment. Reviens bientôt !</p>
        )}

        <div className="reference-grid">
          {references.map((reference) => (
            <article className="reference-card" key={reference.id}>
              {reference.imageUrl && (
                <img
                  src={reference.imageUrl}
                  alt={reference.title}
                />
              )}

              <div className="reference-content">
                <span className="reference-category">
                  {reference.category}
                </span>
                <h3>{reference.title}</h3>
                {reference.notes && <p>{reference.notes}</p>}

                {reference.sourceUrl && (
                  <a
                    href={reference.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir la source ↗
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setEditingReference(reference)}
                >
                  Modifier
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(reference.id)}
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ReferenceForm />

      {editingReference && (
        <EditReferenceForm
          reference={editingReference}
          onUpdated={(updatedReference) => {
            setReferences((current) =>
              current.map((reference) =>
                reference.id === updatedReference.id
                  ? updatedReference
                  : reference
              )
            )
            setEditingReference(null)
          }}
          onCancel={() => setEditingReference(null)}
        />
      )}
    </main>
  )
}

export default App