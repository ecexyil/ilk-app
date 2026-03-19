import { useState, useEffect } from 'react'

const loadingMessages = {
  fiery: [
    "Don't you dare look away...",
    'Cranking the heat to MAXIMUM...',
    'Perfecting every single detail...',
    "This better be worth it — and it will be.",
    'Almost there. Do NOT rush me.',
  ],
  nonna: [
    'Stirring with love, as always...',
    'Just like Mamma used to make...',
    'Adding a little extra olive oil...',
    "Taking my time. Good food can't be hurried.",
    'Almost ready, caro mio...',
  ],
  gymbro: [
    'Calculating your macros, BRO...',
    'Optimizing protein content...',
    'Running the numbers on your gains...',
    "This is gonna hit DIFFERENT...",
    'Almost dialed in. LFG! 💪',
  ],
  vegan: [
    'Channeling plant energy...',
    "Aligning with nature's wisdom...",
    'Breathing intention into every ingredient...',
    'Finding harmony in flavour...',
    'Almost ready. Breathe with me... 🌿',
  ],
}

export default function LoadingScreen({ chef }) {
  const [msgIndex, setMsgIndex] = useState(0)
  const messages = loadingMessages[chef.id] || loadingMessages.fiery

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="screen loading-screen" style={{ background: chef.bgLight }}>
      <div className="loading-ring" style={{ borderColor: `${chef.color}22`, borderTopColor: chef.color }} />
      <div className="loading-emoji">{chef.emoji}</div>
      <h2 className="loading-title" style={{ color: chef.color }}>
        {chef.name} is cooking...
      </h2>
      <p className="loading-message" key={msgIndex}>
        {messages[msgIndex]}
      </p>
      <div className="loading-dots">
        <span style={{ background: chef.color }} />
        <span style={{ background: chef.color }} />
        <span style={{ background: chef.color }} />
      </div>
    </div>
  )
}
