import React from 'react';
import cn from "classnames";

import { GameTile } from './GameTile';

export function GameBoard({ gameBoard, tiles, prep=false, playerState }) {

    return (
        <div className="gameboard">

            {gameBoard.map((row,i) =>
                row.map((tile,j) =>
                    generateTile(tile, playerState, tiles, i, j, (i<6 && prep))
                )
            )}
        </div>
    )
}


function generateTile(tile, playerState, tiles, i, j, smoke=false) {
    if(tile === 0) {
        return <div className={cn('border border-light', {smoke: smoke})} key={i + '_' + j}></div>
    }
    if((tile > 0 && tile < 11) || tile === 'f' || tile === 'b') {
        return <div className="border border-light water" key={i + '_' + j}><GameTile tile={findTile(tile, tiles)} playerState={playerState}/></div>
    }
    if(tile === 'e') {
        return <div class="border border-light" key={i + '_' + j}><div class={cn("gametile enemy rounded-lg", {'bg-primary': playerState === 1 }, {'bg-danger': playerState === 2 })}></div></div>
    }
    if(tile === 'w1') {
        return <div className="border border-light smoke water water-1" key={i + '_' + j}></div>
    }
    if(tile === 'w2') {
        return <div className="border border-light smoke water water-2" key={i + '_' + j}></div>
    }
    if(tile === 'w3') {
        return <div className="border border-light smoke water water-3" key={i + '_' + j}></div>
    }
    if(tile === 'w4') {
        return <div className="border border-light smoke water water-4" key={i + '_' + j}></div>
    }
}

function findTile(id, tiles) {
    return tiles.find(tile=>
        tile.i_id === id
    )
}