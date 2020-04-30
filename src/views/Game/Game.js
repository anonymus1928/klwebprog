import React from 'react';

import { DevButton } from "../dev/DevButton";
import { GameBoard } from './GameBoard';

import { GameTileList } from './GameTileList';

export function Game({ onSelect, playerState, demoGameBoard, tiles }) {
    return (
        <>
            <div id="game" class="d-flex mx-auto mt-5 text-center">
                <GameTileList tiles={[]} title="Ellenfél" playerState={playerState} />
                <div class="mx-auto overflow-auto landscape">
                    <GameBoard gameBoard={demoGameBoard} tiles={tiles} playerState={playerState} />
                </div>
                <GameTileList tiles={[]} title="Saját" playerState={playerState} />
            </div>
            <DevButton onSelect={onSelect} />
        </>
    )
}