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
