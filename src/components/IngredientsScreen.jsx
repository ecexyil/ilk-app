import { useState } from 'react'

export default function IngredientsScreen({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onPhotoUpload,
  photo,
  onContinue,
  onBack,
}) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    const alreadyAdded = ingredients.some(
      i => i.toLowerCase() === trimmed.toLowerCase()
    )
    if (!alreadyAdded) onAddIngredient(trimmed)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      onPhotoUpload({ file, url: URL.createObjectURL(file) })
    }
  }

  const suggestions = ['Chicken', 'Garlic', 'Pasta', 'Eggs', 'Tomatoes', 'Rice', 'Salmon']
  const unusedSuggestions = suggestions.filter(
    s => !ingredients.some(i => i.toLowerCase() === s.toLowerCase())
  )

  return (
    <div className="screen light-screen">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack} aria-label="Go back">
          ←
        </button>
        <div className="screen-header-text">
          <h2>Your Ingredients</h2>
          <p className="screen-subtitle">What are you working with?</p>
        </div>
        <div className="step-pill">1 / 2</div>
      </div>

      <div className="scroll-content">
        {/* Photo Upload */}
        <label className="photo-card">
          {photo ? (
            <div className="photo-filled">
              <img src={photo.url} alt="Ingredients" className="photo-img" />
              <div className="photo-retake">📷 Tap to change photo</div>
            </div>
          ) : (
            <div className="photo-empty">
              <div className="photo-icon-wrap">📷</div>
              <div className="photo-empty-text">
                <strong>Take or upload a photo</strong>
                <span>We'll scan your ingredients automatically</span>
              </div>
              <div className="photo-badge">AI Scan</div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            hidden
          />
        </label>

        {/* Divider */}
        <div className="or-divider">
          <span>or add manually</span>
        </div>

        {/* Text input */}
        <div className="input-row">
          <input
            className="ingredient-input"
            type="text"
            placeholder="e.g. chicken, garlic, lemon..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="add-btn" onClick={handleAdd} aria-label="Add ingredient">
            +
          </button>
        </div>

        {/* Quick suggestions */}
        {unusedSuggestions.length > 0 && (
          <div className="suggestions-row">
            {unusedSuggestions.slice(0, 5).map(s => (
              <button
                key={s}
                className="suggestion-chip"
                onClick={() => onAddIngredient(s)}
              >
                + {s}
              </button>
            ))}
          </div>
        )}

        {/* Ingredient chips */}
        <div className="ingredients-section">
          <p className="section-label">
            Added Ingredients
            {ingredients.length > 0 && (
              <span className="count-badge">{ingredients.length}</span>
            )}
          </p>
          {ingredients.length === 0 ? (
            <p className="empty-hint">Add at least one ingredient to continue</p>
          ) : (
            <div className="chip-grid">
              {ingredients.map((ing, i) => (
                <div key={i} className="ingredient-chip">
                  <span>{ing}</span>
                  <button
                    className="chip-remove"
                    onClick={() => onRemoveIngredient(ing)}
                    aria-label={`Remove ${ing}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="action-bar">
        <button
          className="btn-primary"
          onClick={onContinue}
          disabled={ingredients.length === 0}
        >
          Choose Your Chef →
        </button>
      </div>
    </div>
  )
}
