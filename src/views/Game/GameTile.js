import React from 'react';
import cn from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function GameTile({ tile, player, fight=false, disabled=false, list=false }) {
    
    return (
        <div className={ cn('rounded-lg', { 'bg-danger': player === 1 && !disabled && !fight }, { 'bg-primary': player === 2 && !disabled && !fight }, {'bg-secondary': disabled && !fight}, {"bg-warning": fight}, {'gametile': list===true}, {'gametile-in-game': list===false}) } >
            {tile.icon
                ? <FontAwesomeIcon icon={tile.icon} size="4x" className="p-2" />
                : <span className="tile-number p-2">{tile.level}</span>
            }
        </div>
    )
}