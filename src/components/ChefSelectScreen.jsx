import { chefs } from '../data/chefs.js'

export default function ChefSelectScreen({ selectedChef, onSelectChef, onContinue, onBack }) {
  return (
    <div className="screen light-screen">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack} aria-label="Go back">
          ←
        </button>
        <div className="screen-header-text">
          <h2>Choose Your Chef</h2>
          <p className="screen-subtitle">Who's cooking tonight?</p>
        </div>
        <div className="step-pill">2 / 2</div>
      </div>

      <div className="scroll-content">
        <p className="chefs-intro">
          Every ingredient shines brighter in the right hands. Pick your chef and we'll craft a recipe in their signature style.
        </p>

        <div className="chefs-grid">
          {chefs.map((chef) => {
            const isSelected = selectedChef?.id === chef.id
            return (
              <button
                key={chef.id}
                className={`chef-card ${isSelected ? 'chef-card--selected' : ''}`}
                style={{ background: chef.gradient }}
                onClick={() => onSelectChef(chef)}
              >
                {isSelected && (
                  <div className="chef-check">✓</div>
                )}
                <span className="chef-emoji">{chef.emoji}</span>
                <div className="chef-info">
                  <div className="chef-name">{chef.name}</div>
                  <div className="chef-title">{chef.title}</div>
                  <div className="chef-desc">{chef.description}</div>
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
              ? { background: selectedChef.gradient, boxShadow: `0 8px 24px ${selectedChef.color}55` }
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
