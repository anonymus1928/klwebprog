import React from 'react';
import { GameBoard } from './GameBoard';
import { GameTileList } from './GameTileList';
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux';
import { gameStateChange, IN_GAME } from '../../state/game/gameState_actions';

export function PreparationRoom() {
    const tiles = useSelector(state => state.tiles)

    const dispatch = useDispatch()

    const isReady = () => {
        for (const t of tiles) {
            if(t.pcs_left > 0) {
                return false
            }
        }
        return true
    }

    const clickStartHandler = (e) => {
        e.preventDefault()
        console.log(isReady())
        if(isReady()) {
            dispatch(gameStateChange(IN_GAME))
        }
    }

    return (
        <div id="preparationroom">
            <div id="game" className="d-flex mx-auto pt-3 text-center ml-5">
                <div className="ml-3 mr-3 mr-lg-auto">
                    <GameBoard />
                </div>
                <GameTileList />
            </div>
            <div className="px-2 pt-5">
                <div className={cn("btn btn-lg btn-success w-100", {disabled: !isReady()})} onClick={(e) => clickStartHandler(e)} >Start</div>
            </div>
        </div>
    )
}