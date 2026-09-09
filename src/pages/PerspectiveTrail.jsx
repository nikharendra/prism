import ScreenHeader from '../components/ScreenHeader'
import { REASONING_TAGS } from '../data/reasoningTags'

function tagInfo(tagId) {
  return REASONING_TAGS.find((t) => t.id === tagId) || { label: tagId, color: '#888' }
}

function PerspectiveTrail({ stats, onBack }) {
  const { tagFrequencies, perspectivesExplored, differentViewpointsExplored } = stats
  const maxCount = tagFrequencies.length > 0 ? tagFrequencies[0].count : 1

  return (
    <main className="min-h-screen bg-paper text-ink px-6 py-10 flex flex-col items-center">
      <ScreenHeader onBack={onBack} />

      <div className="max-w-md w-full">
        <p className="font-display italic text-muted mb-1">Your perspective trail</p>
        <h2 className="font-display text-2xl mb-8">How you've explored so far</h2>

        <div className="flex gap-8 mb-10" aria-live="polite">
          <div>
            <p className="text-3xl font-display text-accent">{perspectivesExplored}</p>
            <p className="text-muted text-sm">perspectives explored</p>
          </div>
          <div>
            <p className="text-3xl font-display text-accent">{differentViewpointsExplored}</p>
            <p className="text-muted text-sm">different viewpoints explored</p>
          </div>
        </div>

        <p className="text-muted text-sm mb-4">Reasoning you've engaged with most</p>
        <div className="flex flex-col gap-3">
          {tagFrequencies.map(({ tagId, count }) => {
            const tag = tagInfo(tagId)
            const widthPercent = (count / maxCount) * 100
            return (
              <div key={tagId}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{tag.label}</span>
                  <span className="text-muted">×{count}</span>
                </div>
                <div className="h-2 rounded-full bg-line overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${widthPercent}%`, backgroundColor: tag.color }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default PerspectiveTrail