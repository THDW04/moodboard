import type { VisualReference } from '../services/references'
import './DetailRef.css'

type Props = {
  reference: VisualReference
  onClose: () => void
  onEdit: (reference: VisualReference) => void
  onDelete: (id: number) => void
}

export default function ReferenceDetail({ reference, onClose, onEdit, onDelete }: Props) {
  return (
    <aside className="reference-detail">
      <div className="wrapper">
        <p className="reference-category">{reference.category}</p>
        
        <button
          type="button"
          className="reference-detail-close"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
        </button>
      </div>

      {reference.imageUrl && (
        <img src={`http://localhost:3333${reference.imageUrl}`} alt={reference.title} />
      )}

      <h3>{reference.title}</h3>

      {reference.notes && <p>{reference.notes}</p>}

      {reference.sourceUrl && (
        <a href={reference.sourceUrl} target="_blank" rel="noreferrer" className="reference-source-link">
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