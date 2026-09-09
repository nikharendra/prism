import { describe, it, expect } from 'vitest'
import { computeOverlap, getOverlapLabel } from './perspectiveService'

describe('computeOverlap', () => {
  it('returns full overlap when all user tags match', () => {
    const result = computeOverlap(['growth', 'risk'], ['growth', 'risk'])
    expect(result.sharedCount).toBe(2)
  })

  it('returns zero overlap when no tags match', () => {
    const result = computeOverlap(['growth', 'risk'], ['family', 'security'])
    expect(result.sharedCount).toBe(0)
  })
})

describe('getOverlapLabel', () => {
  it('labels zero shared tags as a different viewpoint', () => {
    expect(getOverlapLabel(0)).toBe('A different viewpoint')
  })
})