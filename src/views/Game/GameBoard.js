import React, { useEffect } from 'react';
import cn from "classnames";

import { GameTile } from './GameTile';
import { useSelector, useDispatch } from 'react-redux';

import { tilesReducePcs, tilesIncreasePcs } from '../../state/tiles/actions';
import { PREPARE_GAME, IN_GAME } from '../../state/game/gameState_actions';
import { moveTile, selectTile, removeTile, resetSelectedTile, attack, enemyDefeat, playerDefeat, draw } from '../../state/game/board_actions';


export function GameBoard({ setShowModal }) {

    const tiles = useSelector(state => state.tiles)
    const enemyBoard = useSelector(state => state.game.eBoard)
    const gameBoard = useSelector(state => state.game.pBoard)
    const selectedTile = useSelector(state => state.game.selectedTile)
    const player = useSelector(state => state.game.player)
    const turn = useSelector(state => state.game.turn)
    const gameState = useSelector(state => state.game.gameState)
    const enemyTile = useSelector(state => state.game.enemyTile)
    const fight = useSelector(state => state.game.fight)


    const dispatch = useDispatch()

    const tilesCount = countTiles(tiles)
    const boardX = gameBoard.length
    const boardY = gameBoard[0].length
    const rowsCount = Math.ceil(tilesCount/boardX)


    const getFightResult = () => {
        const p = selectedTile.tile.i_id
        const e = enemyTile.tile.i_id

        console.log("[FIGHT] - p: ",p,"   e:",e)

        if(e === 'f') {
            return 0
        } else if(p === 3 && e === 'b') {
            return 1
        } else if(p !== 3 && e === 'b') {
            return 2
        } else if(p === 1 && e === 10) {
            return 1
        } else if(p === e) {
            return 3
        } else if(p > e) {
            return 1
        } else if(p < e) {
            return 2
        }

        
    }

    useEffect(() => {
        //battle
        if(fight) {
            setTimeout(() => {
                const result = getFightResult()

                switch (result) {
                    case 0:
                        console.log("[FIGHT] - GAME OVER")
                        setShowModal(true)
                        break;
                    case 1:
                        console.log("[FIGHT] - PLAYER has won")
                        dispatch(enemyDefeat())
                        break;
                    case 2:
                        console.log("[FIGHT] - ENEMY has won")
                        dispatch(playerDefeat())
                        break;
                    case 3:
                        console.log("[FIGHT] - DRAW")
                        dispatch(draw())
                        break;
                    default:
                        break;
                }
            }, 3000);
        }
    })

    const clickEmptyHandler = (i,j) => {
        if(gameState === PREPARE_GAME) {
            //PREPARE_GAME
            if(selectedTile !== '' && i >= boardY-rowsCount) {
                dispatch(moveTile(i,j,selectedTile.tile.i_id))
                if(selectedTile.i === -1 && selectedTile.j === -1) {
                    dispatch(tilesReducePcs(selectedTile.tile))
                }
            }
        } else if(gameState === IN_GAME) {
            //IN_GAME
            if(selectedTile !== '') {
                if(selectedTile.tile.i_id === 2) {
                    if(validTo2(i,j)) {
                        dispatch(moveTile(i,j))
                    }
                } else {
                    if(validStep(i,j)) {
                        dispatch(moveTile(i,j))
                    }
                }
            }
        } else {
            return <div class="alert alert-danger" role="alert">WRONG GAMESTATE => '{gameState}'</div>
        }
    }

    const clickPlayerHandler = (i,j,tile) => {
        if(gameState === PREPARE_GAME) {
            //PREPERE_GAME
            if(selectedTile !== '') {
                if(selectedTile.i === -1 && selectedTile.j === -1) {
                    dispatch(selectTile(tile,i,j))
                } else if(selectedTile.i === i && selectedTile.j === j) {
                    dispatch(resetSelectedTile())
                } else {
                    dispatch(selectTile(tile,i,j))
                }
            } else {
                dispatch(selectTile(tile,i,j))
            }
        } else if(gameState === IN_GAME) {
            //IN_GAME
            if(turn) {
                if(tile.i_id !== 'b' && tile.i_id !== 'f') {
                    if(selectedTile.i === i && selectedTile.j === j) {
                        dispatch(resetSelectedTile())
                    } else {
                        dispatch(selectTile(tile, i, j))
                    }
                }
            }
        } else {
            return <div class="alert alert-danger" role="alert">WRONG GAMESTATE => '{gameState}'</div>
        }
    }

    const clickEnemyHandler = (i,j) => {
        if(gameState === IN_GAME) {
            //IN_GAME
            if(selectedTile !== '') {
                if(validStep(i,j) || validTo2(i, j, true)) {
                    const tile = findTile(enemyBoard[Math.abs(i - (boardY - 1))][j],tiles)
                    dispatch(attack(i,j,tile))
                }
            }
        }
    }

    const rightClickHandler = (i,j,tile,e) => {
        e.preventDefault()
        if(gameState === PREPARE_GAME) {
            dispatch(removeTile(i,j))
            dispatch(tilesIncreasePcs(tile))
        }
    }

    const divSize = {
        width: 100/boardX + '%',
        height: 100/boardY + '%',
    }

    const checkWater = (x,dir,attack) => {
        const j = selectedTile.j
        const i = selectedTile.i
        
        if(dir === 'vertical') {
            let count = Math.abs(x - j)
            for(let z = (x < j ? x : j); count > 0; count--) {
                //ha az éppen vizsgált mező nem üres, akkor false
                //ha a selectedTile éppen a vizsgálandó mező, akkor skip
                //ha támadás van, az aktuálisan kattintott mezőnek e-nek kell lennie és az aktuálisan vizsgált indexnek meg a kattintottal kell megegyeznie
                if(gameBoard[i][z] !== 0 && z !== j && !(attack && gameBoard[i][x] === 'e' && z === x)) {
                    return false
                }
                z++
            }
        } else if(dir === 'horizontal') {
            let count = Math.abs(x - i)
            for(let z = (x < i ? x : i); count > 0; count--) {
                if(gameBoard[z][j] !== 0 && z !== i && !(attack && gameBoard[x][j] === 'e' && z === x)) {
                    return false
                }
                z++
            }
        }
        return true
    }

    const validTo2 = (i,j,attack=false) => {
        if(selectedTile.tile && selectedTile.tile.i_id === 2) {
            if(selectedTile.i === i) {
                //same row
                return checkWater(j,'vertical',attack)
            } else if(selectedTile.j === j) {
                //same column
                return checkWater(i,'horizontal',attack)
            }
        }
    }

    const validStep = (i,j) => {
        //
        const si = selectedTile.i
        const sj = selectedTile.j

        return (si === i && Math.abs(sj - j) === 1) || ((sj === j && Math.abs(si - i) === 1))
    }

    return (
        <div className="gameboard landscape">

            {gameBoard.map((row,i) =>
                row.map((tile,j) => {
                    if(tile === 0) {
                        //empty
                        return (
                            <div
                                className={
                                        cn('border border-light position-relative',
                                            {"smoke": i<boardY-rowsCount && gameState === PREPARE_GAME},
                                            {"available cursor": (gameState === PREPARE_GAME && i>=boardY-rowsCount && selectedTile !== '')},
                                            {"available cursor": gameState === IN_GAME && (validTo2(i,j) || validStep(i,j))}
                                        )}
                                style={divSize} key={i + '_' + j}
                                onClick={() => clickEmptyHandler(i,j)}
                            >
                            </div>
                        )
                    }
        
                    if((tile > 0 && tile < 11) || tile === 'f' || tile === 'b') {
                        //unit
                        return (
                            <div
                                className={
                                    cn("border border-light position-relative text-white",
                                        {'text-warning': !fight && selectedTile.i === i && selectedTile.j === j}, //if selected
                                        {'text-primary': fight && player === 2 && selectedTile.i === i && selectedTile.j === j}, //if fight && player2 tile
                                        {'text-danger': fight && player === 1 && selectedTile.i === i && selectedTile.j === j } //if fight && player1 tile
                                    )}
                                style={divSize}
                                key={i + '_' + j}
                                onClick={() => {clickPlayerHandler(i,j,findTile(tile,tiles))}}
                                onContextMenu={(e) => rightClickHandler(i,j,findTile(tile,tiles),e)}
                            >
                                <GameTile
                                    tile={findTile(tile, tiles)}
                                    player={player}
                                    fight={enemyTile !== '' && selectedTile.i === i && selectedTile.j === j}
                                />
                            </div>
                        )
                    }

                    if(tile === 'e') {
                        //enemy
                        return (
                            <div
                                className={
                                    cn("border border-light position-relative",
                                    {"available cursor": gameState === IN_GAME && (validTo2(i,j,true) || validStep(i,j))}
                                    )}
                                style={divSize}
                                key={i + '_' + j}
                                onClick={() => {clickEnemyHandler(i,j)}}
                            >
                                <div
                                    className={cn("gametile-in-game enemy rounded-lg",
                                        {'bg-primary': player === 1 },
                                        {'bg-danger': player === 2 })}
                                ></div>
                            </div>
                        )
                    }

                    if(tile === 'w1' || tile === 'w2' || tile === 'w3' || tile === 'w4') {
                        //water
                        return (
                            <div
                                className={
                                    cn("border border-light position-relative smoke water",
                                        {'water-1': tile === 'w1'},
                                        {'water-2': tile === 'w2'},
                                        {'water-3': tile === 'w3'},
                                        {'water-4': tile === 'w4'})
                                }
                                style={divSize}
                                key={i + '_' + j}
                            ></div>
                        )
                    }

                    if(typeof tile === 'string' || tile instanceof String) {
                        if(tile.charAt(0) === 'x') {
                            const tmpTile = tile.split('|')[1]

                            return (
                                <div
                                    className={
                                        cn("border border-light position-relative",
                                            {"text-primary": player === 1},
                                            {"text-danger": player === 2})
                                    }
                                    style={divSize}
                                    key={i + '_' + j}
                                >
                                    <GameTile
                                        tile={findTile(tmpTile, tiles)}
                                        player={player}
                                        fight={true}
                                    />
                                </div>
                            )
                        }
                    }
                    return <div class="alert alert-danger" role="alert">WRONG GAMETILE => '{tile}'</div>
                })
            )}
        </div>
    )
}

function findTile(id, tiles) {
    return tiles.find(tile =>
        tile.i_id == id
    )
}

function countTiles(tiles) {
    let c
    c = 0
    tiles.forEach((t) => {
        c += t.pcs
    })
    return c
}