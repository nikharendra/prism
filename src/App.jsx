import { useState } from 'react'
import Landing from './pages/Landing'
import Explore from './pages/Explore'
import PerspectiveMap from './pages/PerspectiveMap'
import PerspectiveDetail from './pages/PerspectiveDetail'
import PerspectiveTrail from './pages/PerspectiveTrail'
import { getQuestion, getPerspectivesForQuestion, computeTrailStats } from './services/perspectiveService'
import { SCREENS } from './constants/screens'

function App() {
  const [screen, setScreen] = useState(SCREENS.LANDING)
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
    setScreen(SCREENS.MAP)
  }

  function handleSelectPerspective(id) {
    setSelectedPerspectiveId(id)
    setScreen(SCREENS.DETAIL)
  }

  function handleReact(reactionType) {
    setReactions((prev) => [...prev, { perspectiveId: selectedPerspectiveId, reactionType }])
    setScreen(SCREENS.MAP) // back to the map after reacting
  }

  function handleViewTrail() {
    setScreen(SCREENS.TRAIL)
  }

  if (screen === SCREENS.LANDING) {
    return <Landing onStart={() => setScreen(SCREENS.EXPLORE)} />
  }

  if (screen === SCREENS.EXPLORE) {
    return <Explore question={question} onAnswer={handleAnswer} />
  }

  if (screen === SCREENS.MAP) {
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

  if (screen === SCREENS.DETAIL) {
    return (
      <PerspectiveDetail
        perspective={selectedPerspective}
        onReact={handleReact}
        onBack={() => setScreen(SCREENS.MAP)}
      />
    )
  }

  if (screen === SCREENS.TRAIL) {
    const stats = computeTrailStats(userTags, reactions, allPerspectives)
    return <PerspectiveTrail stats={stats} onBack={() => setScreen(SCREENS.MAP)} />
  }
}

export default App