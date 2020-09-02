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
import ReactDOM from 'react-dom'
import './index.css'
import Board from './Board'
import { KnightPosition, observe } from './Game'

import * as serviceWorker from './serviceWorker'

const root = document.getElementById('root')

observe((knightPosition: KnightPosition) =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, root)
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
