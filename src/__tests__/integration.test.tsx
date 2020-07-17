import React from 'react'
import '../index.css'
import { render, screen } from '@testing-library/react'
import Board from '../Board'
import { observe, KnightPosition } from '../Game'

test('hello', () => {
  observe((knightPosition: KnightPosition) =>
    render(<Board knightPosition={knightPosition} />)
  )

  screen.debug()
})
