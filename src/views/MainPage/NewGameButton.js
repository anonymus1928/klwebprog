import React from 'react';
import { useDispatch } from 'react-redux';
import { joinPlayer } from '../../state/game/gameState_actions';

export function NewGameButton() {
    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(joinPlayer({player: 1, roomId: null}))
    }

    return (
        <div className="col card border-0 rounded-lg mx-5 px-0 text-center card1 custom-background">
            <div className="card-body rounded-lg position-relative px-0">
                <h2 className="card-title py-2">Új játék készítése</h2>
                <button className="btn w-100 h-100 position-absolute fixed-bottom border-0" onClick={ () => { clickHandler() } }></button>
            </div>
        </div>
    )
}