import React from 'react';
import cn from 'classnames';

import { GameTile } from './GameTile';
import { useSelector, useDispatch } from 'react-redux';
import { PREPARE_GAME, IN_GAME } from '../../state/game/gameState_actions';
import { selectTile, resetSelectedTile } from '../../state/game/board_actions';

export function GameTileList({ title }) {
    const player = useSelector(state => state.game.player)
    const enemy = player === 1 ? 2 : 1
    const gameState = useSelector(state => state.game.gameState)
    const selectedTile = useSelector(state => state.game.selectedTile)
    const turn = useSelector(state => state.game.turn)
    const dispatch = useDispatch()
    const tiles = useSelector(state => {
        if(gameState === IN_GAME) {
            if(title === "Játékos") {
                return state.game.playerList
            } else if(title === "Ellenfél") {
                return state.game.enemyList
            }
        } else {
            return state.tiles
        }
    })

    if(gameState === IN_GAME) {
        return (
            <div className="ml-3 mr-3 rounded-lg text-left overflow-auto text-light tile-container">
                { title && <h5 className={cn("text-center py-3 smoke", {"text-warning": turn && title === "Játékos"}, {"text-warning": !turn && title === "Ellenfél"})}>{title}</h5> }
                <div className="d-flex flex-wrap justify-content-center">
                    {tiles.map(tile =>
                            <div className="my-1 mx-1" key={tile.id + '|' + Date.now()} >
                                <GameTile tile={tile} player={title === "Játékos" ? player : enemy} list={true} />
                            </div>
                        )}
                    </div>
            </div>
        )
    } else if(gameState === PREPARE_GAME) {
        const listClickHandler = tile => {
            if(tile.pcs_left !== 0) {
                if(selectedTile === '') {
                    dispatch(selectTile(tile))
                } else if(selectedTile.tile.i_id === tile.i_id && selectedTile.tile.i_id === tile.i_id) {
                    dispatch(resetSelectedTile())
                } else {
                    dispatch(selectTile(tile))
                }
            }
        }

        return (
            <div className="ml-3 mr-3 rounded-lg text-left overflow-auto text-light tile-container">
                { title && <h5 className="text-center py-3 smoke">{title}</h5> }
                {tiles.map(tile =>
                        <div className={ cn("my-3 mx-3 d-flex align-items-center cursor", {'text-warning': selectedTile.tile && selectedTile.tile.i_id === tile.i_id})} key={tile.i_id} onClick={() => listClickHandler(tile) } >
                            <GameTile tile={tile} player={player} list={true} disabled={tile.pcs_left === 0} />
                            <div className="col-8 p-2">
                                <h5>{tile.name}</h5>
                                {tile.level && 
                                    <p className="m-0">Szint: {tile.level}</p>
                                }
                                <p className="m-0">Lehelyezhető: {tile.pcs_left}/{tile.pcs}</p>
                            </div>
                        </div>
                    )}
            </div>
        )
    } else {
        return <div className="alert alert-danger" role="alert">WRONG GAMESTATE => '{gameState}'</div>
    }
}