import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Game } from './stores/GameStore'

import { Header } from './components/Header'
import { Board } from './components/Board'

const store = Game.create({
    current: 0,
    players: [
        { id: 'p1', position: 1, color: 'red' },
        { id: 'p2', position: 1, color: 'blue' },
        { id: 'p3', position: 1, color: 'green' },
        { id: 'p4', position: 1, color: 'yellow' }
    ]
})

ReactDOM.render(
    <div>
        <Header />
        <div className="button-bar">
            <button onClick={store.move}>Move</button>
        </div>
        <Board store={store} />
    </div>,
    document.getElementById('snakes-n-ladders')
)
