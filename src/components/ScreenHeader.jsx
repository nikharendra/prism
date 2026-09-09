function ScreenHeader({ onBack }) {
  return (
    <button onClick={onBack} className="self-start text-muted text-sm mb-8 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
      Back
    </button>
  )
}

export default ScreenHeader