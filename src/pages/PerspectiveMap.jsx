import { getPerspectivesForQuestion, computeOverlap, getOverlapLabel } from '../services/perspectiveService'
import { REASONING_TAGS } from '../data/reasoningTags'

function tagLabel(tagId) {
  const tag = REASONING_TAGS.find((t) => t.id === tagId)
  return tag ? tag.label : tagId
}

const GROUP_LABELS = { YES: 'said yes', NO: 'said no', UNSURE: 'are unsure' }

function PerspectiveMap({ questionId, userAnswer, userTags, onSelectPerspective, onViewTrail }) {
  const allPerspectives = getPerspectivesForQuestion(questionId)

  const withOverlap = allPerspectives.map((p) => {
    const { sharedCount } = computeOverlap(userTags, p.tags)
    return { ...p, sharedCount }
  })

  const groups = { YES: [], NO: [], UNSURE: [] }
  withOverlap.forEach((p) => groups[p.answer].push(p))
  Object.keys(groups).forEach((answer) => {
    groups[answer].sort((a, b) => b.sharedCount - a.sharedCount)
  })

  return (
    <div className="min-h-screen bg-paper text-ink px-4 py-10 flex flex-col items-center">
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center font-medium text-white">
          You
        </div>
        <p className="text-muted text-sm mt-2">
          {userAnswer} — {userTags.map(tagLabel).join(' and ')}
        </p>
        <button onClick={onViewTrail} className="text-accent text-sm mt-2 hover:opacity-80">
          View my trail
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center mt-8">
        {['YES', 'NO', 'UNSURE'].map((answer) => (
          <div key={answer} className="flex-1">
            <h3 className="text-center text-muted text-sm mb-4">
              {groups[answer].length} {GROUP_LABELS[answer]}
            </h3>
            <div className="flex flex-col gap-3">
              {groups[answer].map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPerspective(p.id)}
                  className="text-left bg-panel border border-line hover:border-accent rounded-xl p-4 transition-colors"
                >
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-accent mt-1">{getOverlapLabel(p.sharedCount)}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerspectiveMap