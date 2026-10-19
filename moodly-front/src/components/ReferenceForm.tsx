import { useState } from 'react'
import type { FormEvent } from 'react'

export default function ReferenceForm() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
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

    const refData = {
      title: title.trim(),
      category: category.trim(),
      imageUrl: imageUrl.trim() || null,
      sourceUrl: sourceUrl.trim() || null,
      notes: notes.trim() || null,
    }

    try {
      const response = await fetch('http://localhost:3333/references', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(refData),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(
          `Erreur ${response.status} : ${message || 'Création impossible'}`
        )
      }

      setTitle('')
      setCategory('')
      setImageUrl('')
      setSourceUrl('')
      setNotes('')

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
        <label htmlFor="imageUrl">Lien de l'image</label>
        <input
          type="url"
          name="imageUrl"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://exemple.com/image.jpg"
        />
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