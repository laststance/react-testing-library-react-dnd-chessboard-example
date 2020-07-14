import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Square from './Square'
import Knight from './Knight'
import { canMoveKnight, moveKnight } from './Game'

interface Props {
  knightPosition: number[]
}

const Board: React.FC<Props> = function Board({ knightPosition }) {
  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {squares}
      </div>
    </DndProvider>
  )
}

function renderSquare(i: number, [knightX, knightY]: number[]) {
  const x = i % 8
  const y = Math.floor(i / 8)
  const isKnightHere = x === knightX && y === knightY
  const black = (x + y) % 2 === 1
  const piece = isKnightHere ? <Knight /> : null

  return (
    <div
      key={i}
      onClick={() => handleSquareClick(x, y)}
      style={{
        width: '12.5%',
        height: '12.5%',
      }}
    >
      <Square black={black}>{piece}</Square>
    </div>
  )
}

function handleSquareClick(toX: number, toY: number) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY)
  }
}

export default Board
