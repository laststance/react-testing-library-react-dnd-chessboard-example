import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './Board'
import { observe } from './Game'

import * as serviceWorker from './serviceWorker'

const root = document.getElementById('root')

observe((knightPosition: number[]) =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, root)
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
