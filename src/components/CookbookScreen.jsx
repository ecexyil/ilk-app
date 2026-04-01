export default function CookbookScreen({ savedRecipes, onViewRecipe }) {
  return (
    <div className="screen cookbook-screen">

      <div className="cookbook-header">
        <div>
          <h1 className="cookbook-title">My Cookbook</h1>
          <p className="cookbook-sub">
            {savedRecipes.length === 0
              ? 'Your saved recipes will appear here'
              : `${savedRecipes.length} saved recipe${savedRecipes.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        {savedRecipes.length > 0 && (
          <div className="cookbook-count-badge">{savedRecipes.length}</div>
        )}
      </div>

      <div className="cookbook-scroll">
        {savedRecipes.length === 0 ? (
          <div className="cookbook-empty-card">
            <div className="cookbook-empty-icon">📖</div>
            <div className="cookbook-empty-content">
              <p className="cookbook-empty-title">Nothing saved yet</p>
              <p className="cookbook-empty-sub">
                Recipes you save will live here. Start cooking and save the ones you love.
              </p>
            </div>
          </div>
        ) : (
          <div className="cookbook-list">
            {savedRecipes.map((recipe, i) => (
              <button
                key={i}
                className="cookbook-item"
                onClick={() => onViewRecipe(recipe)}
              >
                <div
                  className="cookbook-item-avatar"
                  style={{ background: recipe.chef.bgLight }}
                >
                  {recipe.chef.emoji}
                </div>
                <div className="cookbook-item-text">
                  <div className="cookbook-item-title">{recipe.title}</div>
                  <div className="cookbook-item-meta">
                    <span
                      className="cookbook-item-dot"
                      style={{ background: recipe.chef.color }}
                    />
                    {recipe.chef.name} · {recipe.time}
                  </div>
                </div>
                <span className="cookbook-item-arrow">→</span>
              </button>
            ))}
          </div>
        )}
        <div style={{ height: '72px' }} />
      </div>

    </div>
  )
}
