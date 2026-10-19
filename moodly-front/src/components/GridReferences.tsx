import type { VisualReference } from '../services/references'

type Props = {
  references: VisualReference[]
  selectedId: number | null
  onSelect: (reference: VisualReference) => void
}

export default function ReferenceGrid({ references, selectedId, onSelect }: Props) {
  return (
    <div className="reference-grid">
      {references.map((reference) => (
        <button
          type="button"
          key={reference.id}
          className={
            'reference-thumb' +
            (reference.id === selectedId ? ' selected' : '')
          }
          onClick={() => onSelect(reference)}
          aria-pressed={reference.id === selectedId}
          title={reference.title}
        >
          {reference.imageUrl ? (
            <img src={reference.imageUrl} alt={reference.title} />
          ) : (
            <span className="reference-thumb-empty">{reference.title}</span>
          )}
        </button>
      ))}
    </div>
  )
}