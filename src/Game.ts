export type KnightPosition = [number, number]
export type Observer = ((knightPosition: KnightPosition) => void) | null

let knightPosition: KnightPosition = [1, 7]
let observer: Observer = null

function emitChange() {
  if (observer === null) {
    throw new Error('observer should be function whthout default value')
  }
  observer(knightPosition)
}

export function observe(o: Observer) {
  if (typeof observer === 'function') {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

export function moveKnight(toX: number, toY: number) {
  knightPosition = [toX, toY]
  emitChange()
}

export function canMoveKnight(toX: number, toY: number) {
  const [x, y] = knightPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}
