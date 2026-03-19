import { chefs } from '../data/chefs.js'

export default function ChefSelectScreen({ selectedChef, onSelectChef, onContinue, onBack }) {
  return (
    <div className="screen light-screen">

      <div className="screen-header">
        <button className="back-btn" onClick={onBack} aria-label="Go back">←</button>
        <div className="screen-header-text">
          <h2>Your Chef Tonight</h2>
          <p className="screen-subtitle">Pick the voice of your recipe</p>
        </div>
        <div className="step-pill">2 / 2</div>
      </div>

      <div className="scroll-content">
        <p className="chefs-intro">
          Same ingredients, four completely different dishes. Choose who's cooking.
        </p>

        <div className="chef-list">
          {chefs.map((chef) => {
            const isSelected = selectedChef?.id === chef.id
            return (
              <button
                key={chef.id}
                className={`chef-row ${isSelected ? 'chef-row--selected' : ''}`}
                onClick={() => onSelectChef(chef)}
              >
                {/* Colored left bar — expands on select to show emoji */}
                <div
                  className="chef-row-bar"
                  style={{ background: chef.color }}
                />
                <span className="chef-row-emoji" aria-hidden="true">
                  {chef.emoji}
                </span>

                {/* Content */}
                <div className="chef-row-content">
                  <span className="chef-content-emoji" aria-hidden="true">
                    {chef.emoji}
                  </span>
                  <div className="chef-row-text">
                    <div className="chef-row-name">{chef.name}</div>
                    <div className="chef-row-title">{chef.title}</div>
                    <div className="chef-row-desc">{chef.description}</div>
                  </div>
                  <div
                    className="chef-row-indicator"
                    style={isSelected ? { background: chef.color } : {}}
                  >
                    {isSelected ? '✓' : '→'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="action-bar">
        <button
          className="btn-primary"
          style={
            selectedChef
              ? {
                  background: selectedChef.color,
                  boxShadow: `0 8px 24px ${selectedChef.color}55`,
                }
              : {}
          }
          onClick={onContinue}
          disabled={!selectedChef}
        >
          {selectedChef ? `Cook with ${selectedChef.name} →` : 'Select a Chef'}
        </button>
      </div>

    </div>
  )
}
