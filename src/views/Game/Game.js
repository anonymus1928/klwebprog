import React from 'react';
import Modal from 'react-bootstrap/Modal'

import { GameBoard } from './GameBoard';

import { GameTileList } from './GameTileList';
import { useDispatch, useSelector } from 'react-redux';
import { gameStateChange, MAIN_PAGE } from '../../state/game/gameState_actions';

function GameOverModal({ showModal }) {
    const dispatch = useDispatch()

    return (
        <Modal show={showModal.on} dialogClassName="modal-full" centered aria-labelledby="game-over-modal" onHide={() => {}} >
            <div className="my-auto">
                <h1 className="mb-3">Vége a játéknak!</h1>
                <h1>{ showModal.message }</h1>
            </div>
            <button type="submit" className="btn btn-outline-light btn-lg mb-5 w-50 mx-auto" onClick={() => { dispatch(gameStateChange(MAIN_PAGE)) }}>Visszatérés a főképernyőre</button>
        </Modal>
    )
}

export function Game() {
    const gameOver = useSelector(state => state.game.gameOver)

    return (
        <>
            <GameOverModal showModal={gameOver} />
            <div id="game" className="d-flex mx-auto pt-5 text-center">
                <GameTileList title="Ellenfél" />
                <div className="mx-auto">
                    <GameBoard />
                </div>
                <GameTileList title="Játékos" />
            </div>
        </>
    )
}