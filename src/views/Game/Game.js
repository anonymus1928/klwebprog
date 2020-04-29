import React from 'react';

import { DevButton } from "../dev/DevButton";
import { GameBoard } from './GameBoard';

import { demoGameBoard } from "../../domain/demoBoards";
import { tiles } from "../../domain/tiles";
import { GameTileList } from './GameTileList';

export function Game({ onSelect, playerState }) {
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