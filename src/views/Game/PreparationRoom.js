import React from 'react';
import { GameBoard } from './GameBoard';
import { GameTileList } from './GameTileList';

export function PreparationRoom({ onSelect, playerState, demoPreparationBoard, tiles }) {
    return (
        <>
            <div id="preparationroom">
                <div id="game" className="d-flex mx-auto mt-3 text-center ml-5">
                    <div className="ml-3 mr-3 mr-lg-auto overflow-auto landscape">
                        <GameBoard gameBoard={demoPreparationBoard} playerState={playerState} tiles={tiles} prep={true} />
                    </div>
                    <GameTileList tiles={tiles} playerState={playerState} />
                </div>
                <div className="px-2 mt-5">
                    <button className="btn btn-lg btn-success w-100" onClick={() => onSelect("IN_GAME")} >Start</button>
                </div>
            </div>
        </>
    )
}