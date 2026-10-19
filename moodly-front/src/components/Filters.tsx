type Props = {
  categories: string[]
  selectedCategory: string
  search: string
  onCategoryChange: (category: string) => void
  onSearchChange: (search: string) => void
}

export default function ReferenceFilters({
  categories,
  selectedCategory,
  search,
  onCategoryChange,
  onSearchChange,
}: Props) {
  return (
    <aside className="filters">
      <h2>Filtres</h2>

      <label className="filters-field">
        <span>Recherche</span>
        <input
          type="search"
          value={search}
          placeholder="Titre..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <div className="filters-field">
        <span>Catégorie</span>
        <ul className="filters-list">
          <li>
            <button
              type="button"
              className={selectedCategory === '' ? 'active' : ''}
              onClick={() => onCategoryChange('')}
            >
              Toutes
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}