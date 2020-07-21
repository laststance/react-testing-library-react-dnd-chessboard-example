import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Knight from './Knight'
import BoardSquare from './BoardSquare'
import { KnightPosition, X, Y } from './Game'

interface Props {
  knightPosition: KnightPosition
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

function renderSquare(i: number, knightPosition: KnightPosition) {
  const x = (i % 8) as X
  const y = Math.floor(i / 8) as Y
  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <BoardSquare x={x} y={y} data-testid={i + ': Square'}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  )
}

function renderPiece(x: X, y: Y, [knightX, knightY]: [X, Y]) {
  if (x === knightX && y === knightY) {
    return <Knight />
  }
}

export default Board
