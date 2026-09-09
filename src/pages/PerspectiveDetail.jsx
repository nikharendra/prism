import ScreenHeader from '../components/ScreenHeader'
import { REASONING_TAGS } from '../data/reasoningTags'

const REACTIONS = [
  { id: 'relate', emoji: '🤝', label: 'I relate' },
  { id: 'changed', emoji: '💡', label: 'Changed my thinking' },
  { id: 'different', emoji: '↔️', label: 'I see it differently' },
]

function tagLabel(tagId) {
  const tag = REASONING_TAGS.find((t) => t.id === tagId)
  return tag ? tag.label : tagId
}

function PerspectiveDetail({ perspective, onReact, onBack }) {
  return (
    <main className="min-h-screen bg-paper text-ink px-6 py-10 flex flex-col items-center">
     <ScreenHeader onBack={onBack} />

      <div className="max-w-md w-full">
        <p className="text-muted text-sm mb-2">{perspective.name} answered {perspective.answer}</p>
        <p className="font-display italic text-xl leading-relaxed">{perspective.reasoning}</p>

        <div className="flex gap-2 mt-4">
          {perspective.tags.map((tagId) => (
            <span key={tagId} className="text-xs px-3 py-1 rounded-full bg-panel border border-line text-muted">
              {tagLabel(tagId)}
            </span>
          ))}
        </div>

        <p className="text-muted text-sm mt-10 mb-3">React to this perspective</p>
        <div className="flex flex-col gap-2">
          {REACTIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => onReact(r.id)}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-line hover:border-accent transition-colors text-left"
            >
              <span className="text-lg">{r.emoji}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default PerspectiveDetail