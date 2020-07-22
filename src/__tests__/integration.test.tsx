import React from 'react'
import '../index.css'
import { render, screen, fireEvent } from '@testing-library/react'
import Board from '../Board'
import { observe, KnightPosition, releaseObserver } from '../Game'

beforeEach(() => {
  releaseObserver()
  observe((knightPosition: KnightPosition) =>
    render(<Board knightPosition={knightPosition} />)
  )
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

test('Should be yellow that can Knight drop and Knight position square should be red', () => {
  const Knight = screen.getByText('♘')
  const boardSquares = screen.getAllByRole('gridcell')

  fireEvent.dragStart(Knight)
  fireEvent.drag(Knight)
  fireEvent.dragEnter(boardSquares[57]) // 57 is initial position of Knight
  fireEvent.dragOver(boardSquares[57])

  const KnightDropableSquares = screen.getAllByTestId('YellowOverlay')
  expect(KnightDropableSquares.length).toBe(3)
  KnightDropableSquares.forEach((square) => {
    expect(square).toHaveStyle('backgroundColor: yellow')
  })
  expect(screen.getByTestId('RedOverlay')).toHaveStyle('backgroundColor: red')
})

test('Knight can drag and drop where yellow color cells', () => {
  // Knight initial position: "57" of 64 Cell's araay
  expect(screen.getByTestId('KnightPosition: 57')).toHaveTextContent('♘')

  const Knight = screen.getByText('♘')
  // dropable cell numbers: "40", "42", "51" of 64 Cell's araay
  fireEvent.dragStart(Knight)
  fireEvent.dragEnter(screen.getAllByRole('gridcell')[40])
  fireEvent.dragOver(screen.getAllByRole('gridcell')[40])
  fireEvent.drop(screen.getAllByRole('gridcell')[40])

  expect(screen.getByTestId('KnightPosition: 40')).toHaveTextContent('♘')
})
