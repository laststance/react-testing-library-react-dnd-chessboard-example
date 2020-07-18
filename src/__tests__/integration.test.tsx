import React from 'react'
import '../index.css'
import { render, screen } from '@testing-library/react'
import Board from '../Board'
import { observe, KnightPosition } from '../Game'

beforeAll(() => {
  observe((knightPosition: KnightPosition) =>
    render(<Board knightPosition={knightPosition} />)
  )
})

test('single big turbo', () => {
  const Knight = screen.getByText('♘')

  const display = window.getComputedStyle(Knight).getPropertyValue('display')
  const opacity = window.getComputedStyle(Knight).getPropertyValue('opacity')
  const fontSize = window.getComputedStyle(Knight).getPropertyValue('font-size')
  const fontWeight = window
    .getComputedStyle(Knight)
    .getPropertyValue('font-weight')
  const cursor = window.getComputedStyle(Knight).getPropertyValue('cursor')

  expect({
    display: display,
    opacity: opacity,
    fontSize: fontSize,
    fontWeight: fontWeight,
    cursor: cursor,
  }).toStrictEqual({
    display: 'block',
    opacity: '1',
    fontSize: '64px',
    fontWeight: 'bold',
    cursor: 'move',
  })

  const boardSquares = screen.getAllByRole('gridcell')
  expect(boardSquares.length).toBe(64) // chessboard ragnge is 8 * 8
})
