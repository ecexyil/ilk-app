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

      {/* Clean top nav — no gradient, chef identity via dot + text */}
      <div className="recipe-nav">
        <button className="recipe-back-btn" onClick={onStartOver} aria-label="Start over">
          ←
        </button>
        <div className="recipe-chef-credit">
          <span className="recipe-chef-dot" style={{ background: chef.color }} />
          <span className="recipe-chef-credit-text">
            {chef.emoji} {chef.name}
          </span>
        </div>
        <button
          className="recipe-save-btn"
          onClick={onSave}
          aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Scrollable editorial content */}
      <div className="recipe-scroll">

        {/* Title — large, confident */}
        <h1 className="recipe-title">{recipe.title}</h1>

        {/* Chef quote — typographic treatment */}
        <div className="recipe-quote">
          <p className="recipe-quote-text">{recipe.intro}</p>
        </div>

        {/* Meta */}
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
                <span className="ingredient-dot" style={{ background: chef.color }} />
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
                  style={{ background: chef.color, color: 'white' }}
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
          style={{ borderColor: `${chef.color}28`, background: `${chef.color}06` }}
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
