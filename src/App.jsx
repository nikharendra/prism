import { useState } from 'react'
import Landing from './pages/Landing'
import Explore from './pages/Explore'
import PerspectiveMap from './pages/PerspectiveMap'
import PerspectiveDetail from './pages/PerspectiveDetail'
import { getQuestion, getPerspectivesForQuestion , computeTrailStats } from './services/perspectiveService'
import PerspectiveTrail from './pages/PerspectiveTrail'

function App() {
  const [screen, setScreen] = useState('landing')
  const [userAnswer, setUserAnswer] = useState(null)
  const [userTags, setUserTags] = useState([])
  const [selectedPerspectiveId, setSelectedPerspectiveId] = useState(null)
  const [reactions, setReactions] = useState([]) // [{ perspectiveId, reactionType }]

  const question = getQuestion('q1')
  const allPerspectives = getPerspectivesForQuestion(question.id)
  const selectedPerspective = allPerspectives.find((p) => p.id === selectedPerspectiveId)

  function handleAnswer(answer, tags) {
    setUserAnswer(answer)
    setUserTags(tags)
    setScreen('map')
  }

  function handleSelectPerspective(id) {
    setSelectedPerspectiveId(id)
    setScreen('detail')
  }

  function handleReact(reactionType) {
    setReactions((prev) => [...prev, { perspectiveId: selectedPerspectiveId, reactionType }])
    setScreen('map') // back to the map after reacting
  }

  // ...inside App, alongside the other handlers:
function handleViewTrail() {
  setScreen('trail')
}

// ...add this branch:
if (screen === 'trail') {
  const stats = computeTrailStats(userTags, reactions, allPerspectives)
  return <PerspectiveTrail stats={stats} onBack={() => setScreen('map')} />
}

  if (screen === 'landing') return <Landing onStart={() => setScreen('explore')} />
  if (screen === 'explore') return <Explore question={question} onAnswer={handleAnswer} />
  if (screen === 'map') {
    return (
      <PerspectiveMap
        questionId={question.id}
        userAnswer={userAnswer}
        userTags={userTags}
        onSelectPerspective={handleSelectPerspective}
        onViewTrail={handleViewTrail}
      />
    )
  }
  if (screen === 'detail') {
    return (
      <PerspectiveDetail
        perspective={selectedPerspective}
        onReact={handleReact}
        onBack={() => setScreen('map')}
      />
    )
  }
}

export default App