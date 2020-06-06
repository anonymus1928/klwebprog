import React from 'react';
import { useDispatch } from 'react-redux';
import { MAIN_PAGE, gameStateChange } from '../../state/game/gameState_actions';

export function WaitingRoomButtons({ onSelect }) {
    const dispatch = useDispatch()
    return (
        <div className="d-flex justify-content-center">
            <form action="#">
                <button className="btn btn-lg btn-danger mt-5" onClick={() => dispatch(gameStateChange(MAIN_PAGE))}>Vissza a főoldalra</button>
            </form>
        </div>
    )
}