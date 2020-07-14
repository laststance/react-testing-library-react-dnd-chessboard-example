import React from 'react'
import Square from './Square'
import Knight from './Knight'

interface Props {
  knightPosition: number[]
}

const Board: React.FC<Props> = function Board({ knightPosition }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {renderSquare(0, 0, knightPosition)}
      {renderSquare(1, 0, knightPosition)}
      {renderSquare(2, 0, knightPosition)}
    </div>
  )
}

function renderSquare(x: number, y: number, [knightX, knightY]: number[]) {
  const black = (x + y) % 2 === 1
  const isKnightHere = knightX === x && knightY === y
  const piece = isKnightHere ? <Knight /> : null

  return <Square black={black}>{piece}</Square>
}

export default Board
