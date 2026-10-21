import { useState } from 'react'
import type { FormEvent } from 'react'
import './ReferenceForm.css'

export default function ReferenceForm() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [notes, setNotes] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')
    setSuccess('')
    setIsSubmitting(true)



    try {
      const formData = new FormData()

      formData.append('title', title.trim())
      formData.append('category', category.trim())
      formData.append('sourceUrl', sourceUrl.trim())
      formData.append('notes', notes.trim())

      if (image) {
        formData.append('image', image)
      }

      const response = await fetch('http://localhost:3333/references', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(
          `Erreur ${response.status} : ${message || 'Création impossible'}`
        )
      }

      setTitle('')
      setCategory('')
      setImage(null)
      setImagePreview('')
      setSourceUrl('')
      setNotes('')

      const fileInput = document.getElementById('image') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      setSuccess('Inspiration ajoutée avec succès !')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Une erreur inattendue est survenue.'
      )
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <form className="reference-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'inspiration"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <select
          name="category"
          id="category"
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
        <label htmlFor="image">Image de l’inspiration</label>

        <input
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            const file = event.target.files?.[0]

            if (!file) {
              setImage(null)
              setImagePreview('')
              return
            }

            if (file.size > 5 * 1024 * 1024) {
              setError('L’image ne doit pas dépasser 5 Mo.')
              event.target.value = ''
              setImage(null)
              setImagePreview('')
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
            alt="Aperçu de l’image sélectionnée"
            style={{
              width: '200px',
              maxHeight: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="sourceUrl">Lien de la source</label>
        <input
          type="url"
          name="sourceUrl"
          id="sourceUrl"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://exemple.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes sur l'inspiration"
        />
      </div>

      {error && <p role="alert">{error}</p>}
      {success && <p role="status">{success}</p>}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Ajout en cours...' : "Ajouter l'inspiration"}
      </button>
    </form>
  )
}