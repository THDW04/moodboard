import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { VisualReference } from '../services/references'
import './ReferenceForm.css'
import './EditReferenceForm.css'

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
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(
    reference.imageUrl
      ? `http://localhost:3333${reference.imageUrl}`
      : ''
  )
  const [sourceUrl, setSourceUrl] = useState(reference.sourceUrl ?? '')
  const [notes, setNotes] = useState(reference.notes ?? '')

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('title', title.trim())
    formData.append('category', category.trim())
    formData.append('sourceUrl', sourceUrl.trim())
    formData.append('notes', notes.trim())

    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await fetch(
        `http://localhost:3333/references/${reference.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
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


  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) onCancel()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onCancel, isSubmitting])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        if (!isSubmitting) onCancel()
      }}
    >
    <form
      className="reference-form modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
    >
      <h2 id="edit-modal-title">Modifier une inspiration</h2>

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
        <label htmlFor="edit-image">Image de l’inspiration</label>

        <input
          id="edit-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (!file) return

            if (file.size > 2 * 1024 * 1024) {
              setError('L’image ne doit pas dépasser 2 Mo.')
              event.target.value = ''
              return
            }

            setError('')
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
          }}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Aperçu de l’image"
            style={{
              width: '200px',
              maxHeight: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        )}

        {image && (
          <button
            type="button"
            onClick={() => {
              setImage(null)
              setImagePreview(
                reference.imageUrl
                  ? `http://localhost:3333${reference.imageUrl}`
                  : ''
              )
            }}
            className="btn-img-cancel"
          >
            Annuler le remplacement de l’image
          </button>
        )}
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

      <div className="edit-form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Annuler
        </button>
      </div>
    </form>
    </div>
  )
}