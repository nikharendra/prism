import Logo from '../components/Logo'

function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center px-6 text-center">
      <Logo className="mb-8" />
      <h1 className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
        What if social media wasn't about being seen, but about seeing how others think?
      </h1>
      <p className="text-muted mt-6 max-w-md">
        Connect through perspectives, not followers.
      </p>
      <button
        onClick={onStart}
        className="mt-10 px-8 py-3 rounded-full bg-accent hover:opacity-90 transition-opacity font-medium text-white focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        Explore Perspectives
      </button>
    </div>
  )
}

export default Landing