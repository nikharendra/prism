function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-ink/5 rounded-xl p-2 flex items-center justify-center">
        <svg viewBox="0 0 40 28" className="w-8 h-5 text-ink" fill="none">
          <line x1="0" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 4 L24 14 L14 24 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="24" y1="14" x2="40" y2="6" stroke="#E8577B" strokeWidth="1.5" />
          <line x1="24" y1="14" x2="40" y2="14" stroke="#8B5CF6" strokeWidth="1.5" />
          <line x1="24" y1="14" x2="40" y2="22" stroke="#06B6D4" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="font-display italic text-lg">Prism</span>
    </div>
  )
}

export default Logo