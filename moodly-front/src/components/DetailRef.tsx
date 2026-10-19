import type { VisualReference } from '../services/references'

type Props = {
  reference: VisualReference
  onClose: () => void
  onEdit: (reference: VisualReference) => void
  onDelete: (id: number) => void
}

export default function ReferenceDetail({ reference, onClose, onEdit, onDelete }: Props) {
  return (
    <aside className="reference-detail">
      <button
        type="button"
        className="reference-detail-close"
        onClick={onClose}
        aria-label="Fermer"
      >
        ×
      </button>

      {reference.imageUrl && (
        <img src={reference.imageUrl} alt={reference.title} />
      )}

      <span className="reference-category">{reference.category}</span>
      <h3>{reference.title}</h3>

      {reference.notes && <p>{reference.notes}</p>}

      {reference.sourceUrl && (
        <a href={reference.sourceUrl} target="_blank" rel="noreferrer">
          Voir la source ↗
        </a>
      )}

      <div className="reference-detail-actions">
        <button type="button" onClick={() => onEdit(reference)}>
          Modifier
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(reference.id)}
        >
          Supprimer
        </button>
      </div>
    </aside>
  )
}