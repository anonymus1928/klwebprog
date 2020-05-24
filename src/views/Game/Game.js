import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'

import { DevButton } from "../dev/DevButton";
import { GameBoard } from './GameBoard';

import { GameTileList } from './GameTileList';
import { useDispatch } from 'react-redux';
import { gameStateChange, MAIN_PAGE } from '../../state/game/gameState_actions';

function GameOverModal({ showModal, setShowModal }) {
    const dispatch = useDispatch()

    return (
        <Modal show={showModal} dialogClassName="modal-full" centered aria-labelledby="game-over-modal" onHide={() => {}} >
            <div className="my-auto">
                <h1 className="mb-3">Gratulálunk!</h1>
                <h1>Ön győzött!</h1>
            </div>
            <button type="submit" className="btn btn-outline-light btn-lg mb-5 w-50 mx-auto" onClick={() => { dispatch(gameStateChange(MAIN_PAGE)) }}>Visszatérés a főképernyőre</button>
        </Modal>
    )
}

export function Game() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <GameOverModal showModal={showModal} setShowModal={setShowModal} />
            <div id="game" className="d-flex mx-auto pt-5 text-center">
                <GameTileList title="Ellenfél" />
                <div className="mx-auto">
                    <GameBoard setShowModal={setShowModal} />
                </div>
                <GameTileList title="Játékos" />
            </div>
            {/*
            <DevButton setShowModal={setShowModal} />
            */}
        </>
    )
}