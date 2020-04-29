import React from 'react';

import { GameTile } from './GameTile';

export function GameTileList({ tiles, title, playerState }) {

    return (
        <div className="ml-3 mr-3 rounded-lg text-left overflow-auto text-light tile-container">
            { title && <h5 className="text-center py-3 smoke">{title}</h5> }
            {tiles.map(tile =>
                    <div className="my-3 mx-3 d-flex align-items-center" key={playerState + '_' + tile.id} >
                        <GameTile tile={tile} playerState={playerState} />
                        <div className="col-8 p-2">
                            <h5>{tile.name}</h5>
                            {tile.level && 
                                <p className="m-0">Szint: {tile.level}</p>
                            }
                            <p className="m-0">Lehelyezhető: 0/{tile.pcs}</p>
                        </div>
                    </div>
                )}
            

        </div>
    )
}