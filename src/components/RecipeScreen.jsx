export default function RecipeScreen({
  recipe,
  onRegenerate,
  onChangeChef,
  onStartOver,
  onSave,
  isSaved,
}) {
  const { chef } = recipe

  return (
    <div className="screen recipe-screen">
      {/* Chef header */}
      <div className="recipe-header" style={{ background: chef.gradient }}>
        <div className="recipe-header-inner">
          <div className="recipe-chef-avatar">{chef.emoji}</div>
          <div className="recipe-chef-info">
            <div className="recipe-chef-name">{chef.name}</div>
            <div className="recipe-chef-title">{chef.title}</div>
          </div>
          <button
            className="save-btn"
            onClick={onSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="recipe-scroll">

        {/* Title */}
        <h1 className="recipe-title">{recipe.title}</h1>

        {/* Chef intro quote */}
        <blockquote
          className="recipe-intro"
          style={{ borderLeftColor: chef.color }}
        >
          {recipe.intro}
        </blockquote>

        {/* Badges */}
        <div className="recipe-badges">
          <div className="recipe-badge">
            <span>⏱</span>
            <span>{recipe.time}</span>
          </div>
          <div className="recipe-badge">
            <span>🍽</span>
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        {/* Ingredients */}
        <section>
          <p className="section-heading">Ingredients</p>
          <div className="recipe-ingredient-list">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="recipe-ingredient-item">
                <span
                  className="ingredient-dot"
                  style={{ background: chef.color }}
                />
                <span>{ing}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section>
          <p className="section-heading">Instructions</p>
          <div className="recipe-steps">
            {recipe.steps.map((step, i) => (
              <div key={i} className="recipe-step">
                <div
                  className="step-number"
                  style={{ background: chef.gradient, color: 'white' }}
                >
                  {i + 1}
                </div>
                <div className="step-body">
                  <p className="step-instruction">{step.instruction}</p>
                  {step.comment && (
                    <div className="step-comment">
                      <span className="step-comment-emoji">{chef.emoji}</span>
                      <span>{step.comment}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outro */}
        <div
          className="recipe-outro"
          style={{ borderColor: `${chef.color}33`, background: `${chef.color}08` }}
        >
          <span className="outro-emoji">{chef.emoji}</span>
          <p>{recipe.outro}</p>
        </div>
      </div>

      {/* Action bar */}
      <div className="recipe-actions">
        <div className="recipe-action-row">
          <button className="btn-secondary" onClick={onRegenerate}>
            ↺ Regenerate
          </button>
          <button className="btn-secondary" onClick={onChangeChef}>
            Change Chef
          </button>
        </div>
        <button className="btn-ghost" onClick={onStartOver}>
          ← Start Over
        </button>
      </div>
    </div>
  )
}
