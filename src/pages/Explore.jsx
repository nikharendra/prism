import { useState } from 'react'
import { REASONING_TAGS } from '../data/reasoningTags'

function Explore({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])

  function toggleTag(tagId) {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) return prev.filter((t) => t !== tagId)
      if (prev.length >= 2) return prev
      return [...prev, tagId]
    })
  }

  function handleSubmit() {
    onAnswer(selectedAnswer, selectedTags)
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center px-6">
      <p className="font-display italic text-muted mb-4">Today's perspective</p>
      <h2 className="font-display text-2xl md:text-3xl max-w-xl text-center leading-snug">
        {question.text}
      </h2>
      <p className="text-muted mt-4 text-lg">{question.prompt}</p>

      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedAnswer(option)}
            className={`px-6 py-2.5 rounded-full border transition-colors ${
              selectedAnswer === option
                ? 'bg-accent border-accent text-white'
                : 'border-line text-ink hover:border-muted'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="mt-10 flex flex-col items-center">
          <p className="text-muted text-sm mb-3">Why? Pick up to 2.</p>
          <div className="flex flex-wrap gap-2 justify-center max-w-md">
            {REASONING_TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedTags.includes(tag.id) ? 'border-transparent text-white' : 'border-line text-muted hover:border-muted'
                }`}
                style={selectedTags.includes(tag.id) ? { backgroundColor: tag.color } : {}}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedAnswer && selectedTags.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-10 px-8 py-3 rounded-full bg-ink text-paper font-medium hover:opacity-90 transition-opacity"
        >
          See how others think
        </button>
      )}

      <p className="text-muted/70 text-xs mt-12">1,284 perspectives shared so far</p>
    </div>
  )
}

export default Explore