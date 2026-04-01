import { useState } from 'react'
import { chefs } from '../data/chefs.js'

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian',  sub: 'No meat or fish' },
  { id: 'vegan',      label: 'Vegan',       sub: 'No animal products' },
  { id: 'gluten',     label: 'Gluten-free', sub: 'Avoid wheat & gluten' },
  { id: 'dairy',      label: 'Dairy-free',  sub: 'No milk or cheese' },
]

function Toggle({ on, onToggle }) {
  return (
    <button
      className={`profile-toggle ${on ? 'profile-toggle--on' : ''}`}
      onClick={onToggle}
      aria-pressed={on}
    >
      <div className="profile-toggle-knob" />
    </button>
  )
}

export default function ProfileScreen({ savedCount }) {
  const [dietary, setDietary] = useState({})
  const [favChefs, setFavChefs] = useState({})

  const toggleDiet = (id) => setDietary(prev => ({ ...prev, [id]: !prev[id] }))
  const toggleChef = (id) => setFavChefs(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="screen profile-screen">
      <div className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <p className="profile-sub">Your preferences and favourites</p>
      </div>

      <div className="profile-scroll">

        {/* Avatar block */}
        <div className="profile-hero">
          <div className="profile-avatar">FY</div>
          <div className="profile-hero-text">
            <div className="profile-name">Foodsy Chef</div>
            <div className="profile-tagline">{savedCount} recipes saved</div>
          </div>
        </div>

        {/* Dietary preferences */}
        <div className="profile-section">
          <p className="profile-section-title">Taste Preferences</p>
          <div className="profile-card">
            {dietaryOptions.map((opt, i) => (
              <div key={opt.id} className={`profile-row ${i < dietaryOptions.length - 1 ? 'profile-row--bordered' : ''}`}>
                <div className="profile-row-text">
                  <span className="profile-row-label">{opt.label}</span>
                  <span className="profile-row-sub">{opt.sub}</span>
                </div>
                <Toggle on={!!dietary[opt.id]} onToggle={() => toggleDiet(opt.id)} />
              </div>
            ))}
          </div>
        </div>

        {/* Favorite chefs */}
        <div className="profile-section">
          <p className="profile-section-title">Favourite Chefs</p>
          <div className="profile-card">
            {chefs.map((chef, i) => (
              <div key={chef.id} className={`profile-row ${i < chefs.length - 1 ? 'profile-row--bordered' : ''}`}>
                <div
                  className="profile-chef-avatar"
                  style={{ background: chef.bgLight }}
                >
                  {chef.emoji}
                </div>
                <div className="profile-row-text">
                  <span className="profile-row-label">{chef.name}</span>
                  <span className="profile-row-sub">{chef.title}</span>
                </div>
                <button
                  className={`profile-fav-btn ${favChefs[chef.id] ? 'profile-fav-btn--on' : ''}`}
                  onClick={() => toggleChef(chef.id)}
                  style={favChefs[chef.id] ? { color: chef.color } : {}}
                >
                  {favChefs[chef.id] ? '❤️' : '🤍'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* App info */}
        <div className="profile-section">
          <p className="profile-section-title">About</p>
          <div className="profile-card">
            <div className="profile-row profile-row--bordered">
              <span className="profile-row-label">Version</span>
              <span className="profile-row-value">1.0.0</span>
            </div>
            <div className="profile-row">
              <span className="profile-row-label">Made with</span>
              <span className="profile-row-value">AI + ❤️</span>
            </div>
          </div>
        </div>

        <div style={{ height: '72px' }} />

      </div>
    </div>
  )
}
