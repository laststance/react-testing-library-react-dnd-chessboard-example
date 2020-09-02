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

import React, { HTMLProps } from 'react'

export interface OverlayProps {
  color: string
  other?: HTMLProps<HTMLDivElement>[]
}

const Overlay: React.FC<OverlayProps> = ({ color, ...other }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
      {...other}
    />
  )
}

export default Overlay
