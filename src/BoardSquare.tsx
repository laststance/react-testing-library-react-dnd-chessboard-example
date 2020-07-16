import React from 'react'
import Square from './Square'
import Overlay from './Overlay'
import { canMoveKnight, moveKnight, X, Y } from './Game'
import { ItemTypes } from './Game'
import { useDrop } from 'react-dnd'

interface Props {
  x: X
  y: Y
}

const BoardSquare: React.FC<Props> = ({ x, y, children }) => {
  const black = (x + y) % 2 === 1
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: () => moveKnight(x, y),
    canDrop: () => canMoveKnight(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  )
}

export default BoardSquare
