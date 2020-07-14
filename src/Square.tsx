import React from 'react'

type Color = 'black' | 'white'

interface Props {
  black?: boolean
  white?: boolean
}

const Square: React.FC<Props> = ({ black, children }) => {
  const fill = black ? 'black' : 'white'
  const stroke = black ? 'white' : 'black'

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  )
}

export default Square
