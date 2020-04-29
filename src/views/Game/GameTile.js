import React from 'react';
import cn from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function GameTile({ tile, playerState }) {
    return (
        <div className={ cn('gametile text-white rounded-lg', { 'bg-danger': playerState === 1 }, { 'bg-primary': playerState === 2 }) } >
            {tile.icon
                ? <FontAwesomeIcon icon={tile.icon} size="4x" className="p-2" />
                : <span className="tile-number p-2">{tile.level}</span>
            }
        </div>
    )
}