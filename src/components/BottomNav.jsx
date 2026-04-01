const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
)

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7.5" />
    <path d="M20.5 20.5l-4.5-4.5" />
  </svg>
)

const BookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
)

const ProfileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const ChefHatIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 019.18 0A4 4 0 0118 13.87V21H6V13.87z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
)

const tabs = [
  { id: 'home',     label: 'Home',     Icon: HomeIcon },
  { id: 'search',   label: 'Search',   Icon: SearchIcon },
  { id: 'cookbook', label: 'Cookbook', Icon: BookIcon },
  { id: 'profile',  label: 'Profile',  Icon: ProfileIcon },
]

export default function BottomNav({ activeTab, onTabChange, onFabPress, savedCount }) {
  return (
    <nav className="bottom-nav">
      <div className="nav-items">
        {/* Left two tabs */}
        {tabs.slice(0, 2).map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`nav-item ${activeTab === id ? 'nav-item--active' : ''}`}
            onClick={() => onTabChange(id)}
            aria-label={label}
          >
            <Icon />
            <span className="nav-item-label">{label}</span>
          </button>
        ))}

        {/* Centered FAB slot */}
        <div className="nav-fab-slot">
          <button className="nav-fab" onClick={onFabPress} aria-label="Scan ingredients">
            <ChefHatIcon />
          </button>
        </div>

        {/* Right two tabs */}
        {tabs.slice(2).map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`nav-item ${activeTab === id ? 'nav-item--active' : ''}`}
            onClick={() => onTabChange(id)}
            aria-label={label}
          >
            <Icon />
            <span className="nav-item-label">
              {id === 'cookbook' && savedCount > 0
                ? `${label} (${savedCount})`
                : label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
