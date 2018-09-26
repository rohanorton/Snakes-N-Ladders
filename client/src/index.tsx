import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Root } from './stores/RootStore'

import { Header } from './components/Header'
import { Board } from './components/Board'
import { Lobby } from './components/Lobby'
import { observer } from 'mobx-react'

const store = Root.create({})
store.init()

interface IProps {
    store: typeof Root.Type
}

const Top = observer(({ store }: IProps) => (
    <div>
        <Header />
        <div className="button-bar" />
        {store.game ? <Board store={store.game} /> : <Lobby store={store} />}
    </div>
))

ReactDOM.render(<Top store={store} />, document.getElementById('snakes-n-ladders'))
