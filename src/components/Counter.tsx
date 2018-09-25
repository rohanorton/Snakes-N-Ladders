import * as React from 'react'
import { observer } from 'mobx-react'
import { Player } from '../stores/PlayerStore'

interface IProps {
    player: typeof Player.Type
}

export const Counter = observer(({ player }: IProps) => {
    return <div className="counter" style={{ backgroundColor: player.color }} />
})
