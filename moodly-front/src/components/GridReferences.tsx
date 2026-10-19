import type { VisualReference } from '../services/references'

type Props = {
  references: VisualReference[]
  selectedId: number | null
  onSelect: (reference: VisualReference) => void
}

export default function ReferenceGrid({
  references,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="reference-grid">
      {references.map((reference) => (
        <div
          key={reference.id}
          className={
            'reference-thumb' +
            (reference.id === selectedId ? ' selected' : '')
          }
          onClick={() => onSelect(reference)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onSelect(reference)
            }
          }}
          role="button"
          tabIndex={0}
          aria-pressed={reference.id === selectedId}
          aria-label={`Sélectionner ${reference.title}`}
          title={reference.title}
        >
          {reference.imageUrl ? (
            <img src={`http://localhost:3333${reference.imageUrl}`} alt="" />
          ) : (
            <span className="reference-thumb-empty">
              {reference.title}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}