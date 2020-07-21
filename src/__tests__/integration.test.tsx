import React from 'react'
import '../index.css'
import { render, screen, fireEvent } from '@testing-library/react'
import Board from '../Board'
import { observe, KnightPosition, releaseObserver } from '../Game'

beforeEach(() => {
  observe((knightPosition: KnightPosition) =>
    render(<Board knightPosition={knightPosition} />)
  )
})

afterEach(() => {
  releaseObserver()
})

test('should exist Knight on board', () => {
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
})

test('should board have 64 cells', () => {
  const boardSquares = screen.getAllByRole('gridcell')
  expect(boardSquares.length).toBe(64) // chessboard ragnge is 8 * 8
})

test('can move yellow Knight position red', () => {
  const Knight = screen.getByText('♘')
  fireEvent.dragOver(Knight)
  const boardSquares = screen.getAllByRole('gridcell')
  screen.debug(boardSquares)
})
