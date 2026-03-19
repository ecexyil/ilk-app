export default function WelcomeScreen({ onStart }) {
  return (
    <div className="screen welcome">
      <div className="welcome-glow-1" />
      <div className="welcome-glow-2" />

      <div className="welcome-hero">
        <div className="welcome-badge">✨ AI-Powered Recipes</div>
        <div className="welcome-icon">👨‍🍳</div>
        <h1 className="welcome-title">
          Chef<span>Mode</span>
        </h1>
        <p className="welcome-tagline">
          Your ingredients. Your chef. Your masterpiece.
        </p>
      </div>

      <div className="welcome-features">
        <div className="welcome-feature">
          <span>📸</span>
          <span>Snap your fridge</span>
        </div>
        <div className="welcome-feature-divider" />
        <div className="welcome-feature">
          <span>👨‍🍳</span>
          <span>Pick a chef</span>
        </div>
        <div className="welcome-feature-divider" />
        <div className="welcome-feature">
          <span>🍽</span>
          <span>Get a recipe</span>
        </div>
      </div>

      <div className="welcome-footer">
        <button className="welcome-cta" onClick={onStart}>
          Start Cooking
          <span className="cta-arrow">→</span>
        </button>
        <p className="welcome-trust">No sign-up · Free to use · Always delicious</p>
      </div>
    </div>
  )
}
