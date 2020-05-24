import React from 'react';
import { useDispatch } from 'react-redux';
import { gameStateChange, MAIN_PAGE } from '../../state/game/gameState_actions';

export function DevButton({ setShowModal }) {
    const dispatch = useDispatch()
    return (
        <div className="px-2 pt-5 w-100">
            <button type="submit" className="btn btn-lg btn-success w-100" onClick={() => { setShowModal(true) }}>DEV: ShowModal</button>
            <button type="submit" className="btn btn-lg btn-success w-100" onClick={() => { dispatch(gameStateChange(MAIN_PAGE)) }}>DEV: MainPage</button>
        </div>
    )
}