import * as React from 'react'
import { observer } from 'mobx-react'
import { Root } from '../stores/RootStore'

interface IProps {
    store: typeof Root.Type
}

export const Lobby = observer(({ store }: IProps) => {
    return (
        <div className="lobby">
            <div>
                <label>
                    <button onClick={store.createGame}>Create New Game</button>
                </label>
            </div>
            <div>
                <label className="code-input-label">
                    Enter a code to join an existing game!
                    <input className="code-input" type="text" onChange={store.storeCode} />
                </label>
                <button onClick={store.joinGame}>Join</button>
            </div>
        </div>
    )
})
