import { useState } from 'react'

const categories = [
  { id: 'all',      label: 'All',          emoji: '✦' },
  { id: 'quick',    label: 'Quick',         emoji: '⚡' },
  { id: 'protein',  label: 'High Protein',  emoji: '💪' },
  { id: 'vegan',    label: 'Plant-based',   emoji: '🌿' },
  { id: 'comfort',  label: 'Comfort',       emoji: '🥘' },
  { id: 'italian',  label: 'Italian',       emoji: '🍝' },
  { id: 'seafood',  label: 'Seafood',       emoji: '🐟' },
]

const recipes = [
  { title: 'Garlic & Herb Pasta',    category: 'Italian',      categoryId: 'italian', time: '20 min', emoji: '🍝', bg: '#FFFBEB', ingredients: ['pasta', 'garlic'] },
  { title: 'Soft Scrambled Eggs',    category: 'Quick',        categoryId: 'quick',   time: '10 min', emoji: '🥚', bg: '#FEF9EC', ingredients: ['eggs'] },
  { title: 'Pan-Seared Salmon',      category: 'Seafood',      categoryId: 'seafood', time: '15 min', emoji: '🐟', bg: '#EFF6FF', ingredients: ['salmon'] },
  { title: 'Smashed Potatoes',       category: 'Comfort',      categoryId: 'comfort', time: '45 min', emoji: '🥔', bg: '#FEF2F2', ingredients: ['potato'] },
  { title: 'Pan-Seared Chicken',     category: 'High Protein', categoryId: 'protein', time: '30 min', emoji: '🍗', bg: '#FEF2F2', ingredients: ['chicken breast'] },
  { title: 'Roasted Vegetables',     category: 'Plant-based',  categoryId: 'vegan',   time: '35 min', emoji: '🥦', bg: '#ECFDF5', ingredients: ['tomato', 'pepper'] },
  { title: 'Seared Beef',            category: 'High Protein', categoryId: 'protein', time: '25 min', emoji: '🥩', bg: '#FEF2F2', ingredients: ['beef steak'] },
  { title: 'Fragrant Golden Rice',   category: 'Comfort',      categoryId: 'comfort', time: '30 min', emoji: '🍚', bg: '#FFFBEB', ingredients: ['rice', 'onion'] },
]

export default function SearchScreen({ onQuickStart }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = recipes.filter(r => {
    const matchesCat = activeCategory === 'all' || r.categoryId === activeCategory
    const q = query.toLowerCase()
    const matchesQuery = !q || r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    return matchesCat && matchesQuery
  })

  return (
    <div className="screen search-screen">

      <div className="search-header">
        <h1 className="search-title">Discover</h1>
        <p className="search-sub">Find a recipe to cook tonight</p>
      </div>

      <div className="search-bar-wrap">
        <svg className="search-bar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7.5" />
          <path d="M20.5 20.5l-4.5-4.5" />
        </svg>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search recipes or ingredients…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button className="search-bar-clear" onClick={() => setQuery('')}>×</button>
        )}
      </div>

      {/* Category chips */}
      <div className="search-cats-scroll">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`search-cat-chip ${activeCategory === cat.id ? 'search-cat-chip--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Results grid */}
      <div className="search-scroll">
        {filtered.length > 0 ? (
          <>
            <p className="search-results-label">
              {activeCategory === 'all' && !query ? 'Curated picks' : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
            </p>
            <div className="search-grid">
              {filtered.map((r, i) => (
                <button
                  key={i}
                  className="search-card"
                  onClick={() => onQuickStart(r.ingredients)}
                >
                  <div className="search-card-visual" style={{ background: r.bg }}>
                    <span className="search-card-emoji">{r.emoji}</span>
                  </div>
                  <div className="search-card-body">
                    <div className="search-card-title">{r.title}</div>
                    <div className="search-card-meta">
                      <span className="search-card-cat">{r.category}</span>
                      <span className="search-card-dot">·</span>
                      <span>{r.time}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="search-empty">
            <span className="search-empty-icon">🔍</span>
            <p className="search-empty-text">No recipes match "{query}"</p>
            <p className="search-empty-sub">Try scanning your ingredients instead</p>
          </div>
        )}
        <div style={{ height: '72px' }} />
      </div>

    </div>
  )
}
