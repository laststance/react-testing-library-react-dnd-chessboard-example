import React from 'react'
import '../index.css'
import { render, screen, fireEvent } from '@testing-library/react'
import Board from '../Board'
import { observe, KnightPosition, releaseObserver } from '../Game'

function dragAndDrop(knight: HTMLElement, cell: HTMLElement) {
  fireEvent.dragStart(knight)
  fireEvent.dragEnter(cell)
  fireEvent.dragOver(cell)
  fireEvent.drop(cell)
}

function dragHold(knight: HTMLElement, cell: HTMLElement) {
  fireEvent.dragStart(knight)
  fireEvent.dragEnter(cell)
  fireEvent.dragOver(cell)
}

beforeEach(() => {
  /*
   * Every time Knight initial position: "57"
   * and Knight droppable positions are "40", "42", "51"
   * when you got all cells with screen.getAllByRole('gridcell')
   */
  observe((knightPosition: KnightPosition) =>
    render(<Board knightPosition={knightPosition} />)
  )
})

afterEach(() => {
  releaseObserver()
})

test('should exist Knight with certain visual on board', () => {
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

test("Knight initial position is 'index 57' of all cell array", () => {
  expect(screen.getByTestId('KnightPosition: 57')).toHaveTextContent('♘')
})

test('testing the moment of dragging hold', () => {
  const knight = screen.getByText('♘')
  const boardSquares = screen.getAllByRole('gridcell')
  const knightPosition = boardSquares[57]

  dragHold(knight, knightPosition)

  // Yellow cell is knight moving range
  const KnightDropableSquares = screen.getAllByTestId('YellowOverlay')

  // Initially knight can move to 3 position
  expect(KnightDropableSquares.length).toBe(3)

  // Yellow color css check
  KnightDropableSquares.forEach((square) => {
    expect(square).toHaveStyle('backgroundColor: yellow')
  })

  // Red cell is current knight position when hold dragging
  expect(screen.getByTestId('RedOverlay')).toHaveStyle('backgroundColor: red')
})

describe('Knight can drag and drop initial moving range', () => {
  // Knight initially has moving position 'index: 40 42 51' of 64 cell array
  test('gridcell[40]', () => {
    const knight = screen.getByText('♘')
    const yellowCell40 = screen.getAllByRole('gridcell')[40]
    dragAndDrop(knight, yellowCell40)
    expect(screen.getByTestId('KnightPosition: 40')).toHaveTextContent('♘')
  })

  test('gridcell[42]', () => {
    const knight = screen.getByText('♘')
    const yellowCell42 = screen.getAllByRole('gridcell')[42]
    dragAndDrop(knight, yellowCell42)
    expect(screen.getByTestId('KnightPosition: 42')).toHaveTextContent('♘')
  })

  test('gridcell[51]', () => {
    const knight = screen.getByText('♘')
    const yellowCell51 = screen.getAllByRole('gridcell')[51]
    dragAndDrop(knight, yellowCell51)
    expect(screen.getByTestId('KnightPosition: 51')).toHaveTextContent('♘')
  })
})

test('Knight can not drop not yellow cell', () => {
  const knight = screen.getByText('♘')
  const whiteCell = screen.getByTestId('0')
  const blackCell = screen.getByTestId('1')
  expect(whiteCell.firstChild).toHaveStyle('background-color: white;')
  expect(blackCell.firstChild).toHaveStyle('background-color: black;')

  dragAndDrop(knight, whiteCell)

  expect(screen.getByTestId('KnightPosition: 57')).toHaveTextContent('♘')

  dragAndDrop(knight, blackCell)

  expect(screen.getByTestId('KnightPosition: 57')).toHaveTextContent('♘')
})
