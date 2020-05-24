import React from 'react';
import { useDispatch } from 'react-redux';
import { PREPARE_GAME, MAIN_PAGE, gameStateChange } from '../../state/game/gameState_actions';

export function WaitingRoomButtons({ onSelect }) {
    const dispatch = useDispatch()
    return (
        <div className="d-flex justify-content-center">
            <form action="#" className="mr-5">
                <button className="btn btn-lg btn-danger mt-5" onClick={() => dispatch(gameStateChange(MAIN_PAGE))}>Vissza a főoldalra</button>
            </form>
            <form action="#">
                <button className="btn btn-lg btn-success mt-5" onClick={() => dispatch(gameStateChange(PREPARE_GAME))}>DEV: FORWARD</button>
            </form>
        </div>
    )
}