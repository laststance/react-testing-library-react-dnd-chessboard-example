/*
 * Copyright (c) The code is copy & modified from original reposotory(https://github.com/react-dnd/react-dnd/tree/main/packages/documentation/examples-hooks/src/00-chessboard).
 *
 * Author
 * Dan Abramov <dan.abramov@me.com> (http://github.com/gaearon)
 *
 * Contributors
 * Chris Trevino <darthtrevino@gmail.com> (http://github.com/darthtrevino)
 * Jordan Gensler (http://github.com/kesne)
 * Gagan (https://github.com/thetechie)
 *
 * The MIT License
 *
 */

import React from 'react'
import Square from './Square'
import Overlay from './Overlay'
import { canMoveKnight, moveKnight, X, Y } from './Game'
import { ItemTypes } from './Game'
import { useDrop } from 'react-dnd'

interface Props {
  x: X
  y: Y
  index: number
}

const BoardSquare: React.FC<Props> = ({ x, y, index, children }) => {
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
      role="gridcell"
      ref={drop}
      data-testid={children ? 'KnightPosition: ' + index : index}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" data-testid="RedOverlay" />}
      {!isOver && canDrop && (
        <Overlay color="yellow" data-testid="YellowOverlay" />
      )}
      {isOver && canDrop && (
        <Overlay color="green" data-testid="GreenOverlay" />
      )}
    </div>
  )
}

export default BoardSquare
