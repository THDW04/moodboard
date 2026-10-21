import { NavLink } from 'react-router-dom'
import './Filters.css'

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
    <aside className="nav-container">
      <header className="moodly-header">
        <div className="title-wrapper">
          <h1>Moodly</h1>
          <p>Ton espace d'inspiration créative.</p>
        </div>

        <nav>
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/ajouter">Ajouter une ref</NavLink>
        </nav>
      </header>

      <div className="filters">
        <h2>Filtres</h2>

        <label className="filters-field">
          <span>Recherche</span>
          <input
            type="search"
            value={search}
            placeholder="Titre..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="filters-search"
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
      </div>
    </aside>
  )
}