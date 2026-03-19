import { chefs } from '../data/chefs.js'

const quickStarters = [
  { emoji: '🍝', label: 'Pasta',   ingredients: ['pasta', 'garlic', 'olive oil'] },
  { emoji: '🥚', label: 'Eggs',    ingredients: ['eggs', 'butter'] },
  { emoji: '🍗', label: 'Chicken', ingredients: ['chicken breast'] },
  { emoji: '🥩', label: 'Beef',    ingredients: ['beef steak'] },
  { emoji: '🐟', label: 'Fish',    ingredients: ['salmon'] },
  { emoji: '🥦', label: 'Veggie',  ingredients: ['tomato', 'pepper', 'zucchini'] },
  { emoji: '🍚', label: 'Rice',    ingredients: ['rice', 'onion'] },
  { emoji: '🥔', label: 'Potato',  ingredients: ['potato'] },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12)  return { time: 'Good morning',   headline: "What's in your\nfridge", accent: 'today?' }
  if (hour >= 12 && hour < 17) return { time: 'Good afternoon', headline: 'Let\'s sort\ndinner', accent: 'early.' }
  if (hour >= 17 && hour < 21) return { time: 'Good evening',   headline: 'Dinner time.\nWhat are you', accent: 'working with?' }
  return { time: 'Late night',        headline: 'Fridge raid\ntime.', accent: 'Let\'s cook.' }
}

export default function WelcomeScreen({
  onStart,
  onIngredientQuickStart,
  onChefQuickPick,
  onViewSaved,
  savedRecipes = [],
}) {
  const greeting = getGreeting()

  return (
    <div className="screen home">

      {/* Sticky wordmark nav */}
      <div className="home-nav">
        <span className="home-wordmark">Foodsy</span>
        <span className="home-ai-badge">AI</span>
      </div>

      {/* Scrollable body */}
      <div className="home-scroll">

        {/* ── HERO ── */}
        <div className="home-hero-block">
          <p className="home-greeting">{greeting.time}</p>
          <h1 className="home-headline">
            {greeting.headline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < greeting.headline.split('\n').length - 1 ? <br /> : ' '}</span>
            ))}
            <span className="home-headline-accent">{greeting.accent}</span>
          </h1>

          {/* Primary CTA — scan card */}
          <button className="home-scan-card" onClick={onStart}>
            <div className="home-scan-icon-wrap">📸</div>
            <div className="home-scan-text">
              <div className="home-scan-title">Scan your fridge</div>
              <div className="home-scan-sub">Point camera at your ingredients</div>
            </div>
            <div className="home-scan-arrow">→</div>
          </button>

          {/* Secondary text link */}
          <button className="home-type-link" onClick={onStart}>
            or type ingredients manually →
          </button>
        </div>

        {/* ── QUICK START CHIPS ── */}
        <div className="home-section">
          <div className="home-section-header">
            <span className="home-section-title">Quick start</span>
          </div>
          <div className="home-chips-scroll">
            {quickStarters.map((qs) => (
              <button
                key={qs.label}
                className="home-quick-chip"
                onClick={() => onIngredientQuickStart(qs.ingredients)}
              >
                <span className="home-chip-emoji">{qs.emoji}</span>
                <span className="home-chip-label">{qs.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CHEF PERSONALITIES ── */}
        <div className="home-section">
          <div className="home-section-header">
            <span className="home-section-title">Your chefs</span>
            <button className="home-section-link" onClick={onStart}>See all →</button>
          </div>
          <div className="home-chefs-scroll">
            {chefs.map((chef) => (
              <button
                key={chef.id}
                className="home-chef-preview"
                onClick={() => onChefQuickPick(chef)}
              >
                <div
                  className="home-chef-avatar"
                  style={{ background: chef.bgLight }}
                >
                  {chef.emoji}
                </div>
                <span className="home-chef-preview-name">{chef.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── SAVED RECIPES (only if any exist) ── */}
        {savedRecipes.length > 0 && (
          <div className="home-section">
            <div className="home-section-header">
              <span className="home-section-title">Saved</span>
            </div>
            <div className="home-saved-list">
              {savedRecipes.slice(0, 3).map((recipe, i) => (
                <button
                  key={i}
                  className="home-saved-item"
                  onClick={() => onViewSaved(recipe)}
                >
                  <div
                    className="home-saved-chef-dot"
                    style={{ background: recipe.chef.bgLight }}
                  >
                    {recipe.chef.emoji}
                  </div>
                  <div className="home-saved-text">
                    <div className="home-saved-title">{recipe.title}</div>
                    <div className="home-saved-meta">
                      {recipe.chef.name} · {recipe.time}
                    </div>
                  </div>
                  <span className="home-saved-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
