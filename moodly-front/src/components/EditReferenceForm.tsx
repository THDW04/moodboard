import { useState } from 'react'
import type { FormEvent } from 'react'
import type { VisualReference } from '../services/references'

type EditReferenceFormProps = {
  reference: VisualReference
  onUpdated: (updatedReference: VisualReference) => void
  onCancel: () => void
}

export default function EditReferenceForm({
  reference,
  onUpdated,
  onCancel,
}: EditReferenceFormProps) {
  const [title, setTitle] = useState(reference.title)
  const [category, setCategory] = useState(reference.category)
  const [imageUrl, setImageUrl] = useState(reference.imageUrl ?? '')
  const [sourceUrl, setSourceUrl] = useState(reference.sourceUrl ?? '')
  const [notes, setNotes] = useState(reference.notes ?? '')

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const refData = {
      title: title.trim(),
      category: category.trim(),
      imageUrl: imageUrl.trim() || null,
      sourceUrl: sourceUrl.trim() || null,
      notes: notes.trim() || null,
    }

    try {
      const response = await fetch(
        `http://localhost:3333/references/${reference.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(refData),
        }
      )

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || `Erreur HTTP ${response.status}`)
      }

      const updatedReference: VisualReference = await response.json()
      onUpdated(updatedReference)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Impossible de modifier cette référence.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="reference-form" onSubmit={handleSubmit}>
      <h2>Modifier une inspiration</h2>

      <div className="form-group">
        <label htmlFor="edit-title">Titre</label>
        <input
          id="edit-title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-category">Catégorie</label>
        <select
          id="edit-category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Sélectionne une catégorie</option>
          <option value="graphisme">Graphisme</option>
          <option value="photographie">Photographie</option>
          <option value="illustration">Illustration</option>
          <option value="typographie">Typographie</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="edit-imageUrl">Lien de l’image</label>
        <input
          id="edit-imageUrl"
          name="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-sourceUrl">Lien de la source</label>
        <input
          id="edit-sourceUrl"
          name="sourceUrl"
          type="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-notes">Notes</label>
        <textarea
          id="edit-notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
      </button>

      <button type="button" onClick={onCancel} disabled={isSubmitting}>
        Annuler
      </button>
    </form>
  )
}
