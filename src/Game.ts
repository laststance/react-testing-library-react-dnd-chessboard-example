/*
 This is chess rules definition
 */
export type X = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type Y = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type KnightPosition = [X, Y]
export enum ItemTypes {
  KNIGHT = 'KNIGHT',
}

let knightPosition: KnightPosition = [1, 7]
let observer: Observer | null = null

export type Observer = (knightPosition: KnightPosition) => void

export function observe(o: Observer) {
  if (typeof observer === 'function') {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

export function moveKnight(toX: X, toY: Y): void {
  knightPosition = [toX, toY]
  emitChange()
}

export function canMoveKnight(toX: X, toY: Y): boolean {
  const [x, y] = knightPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}

function emitChange(): void {
  if (observer === null) {
    throw new Error('observer should be function whthout default value')
  }
  observer(knightPosition)
}
