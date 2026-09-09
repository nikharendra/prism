import { QUESTIONS } from '../data/questions'
import { PERSPECTIVES } from '../data/perspectives'

// Get a single question by id
export function getQuestion(questionId) {
  return QUESTIONS.find((q) => q.id === questionId)
}

// Get all seeded perspectives for a question
export function getPerspectivesForQuestion(questionId) {
  return PERSPECTIVES.filter((p) => p.questionId === questionId)
}

// Overlap = how many of the user's own tags this perspective shares,
// as a fraction of the user's total tags.
// Example: user=['growth','experience','risk'], other=['freedom','growth','identity']
// shared = ['growth'] → 1 shared out of 3 user tags → 1/3
export function computeOverlap(userTags = [], otherTags = []) {
  if (userTags.length === 0) return { sharedCount: 0, sharedTags: [], fraction: 0 }

  const sharedTags = userTags.filter((tag) => otherTags.includes(tag))
  const fraction = sharedTags.length / userTags.length

  return { sharedCount: sharedTags.length, sharedTags, fraction }
}

// Turns a raw overlap into the human-readable line the UI shows,
// per Point 3 in the spec: the reason matters more than the number.
export function getOverlapLabel(sharedCount) {
  if (sharedCount === 0) return 'A different viewpoint'
  if (sharedCount === 1) return '1 shared reasoning'
  return `${sharedCount} shared reasonings`
}

export function computeTrailStats(userTags, reactions, allPerspectives) {
  const tagCounts = {}

  // Count the user's own reasoning tags once
  userTags.forEach((tagId) => {
    tagCounts[tagId] = (tagCounts[tagId] || 0) + 1
  })

  let differentViewpointsExplored = 0

  reactions.forEach((reaction) => {
    const perspective = allPerspectives.find((p) => p.id === reaction.perspectiveId)
    if (!perspective) return

    // Every tag on a perspective they engaged with counts toward their trail
    perspective.tags.forEach((tagId) => {
      tagCounts[tagId] = (tagCounts[tagId] || 0) + 1
    })

    const { sharedCount } = computeOverlap(userTags, perspective.tags)
    if (sharedCount === 0) differentViewpointsExplored += 1
  })

  const tagFrequencies = Object.entries(tagCounts)
    .map(([tagId, count]) => ({ tagId, count }))
    .sort((a, b) => b.count - a.count)

  return {
    tagFrequencies,
    perspectivesExplored: reactions.length,
    differentViewpointsExplored,
  }
}