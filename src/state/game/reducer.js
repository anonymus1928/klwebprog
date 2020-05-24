import { reducedDemoGameBoard, reducedDemoEnemyBoard } from "../../domain/demoBoards"
import { MAIN_PAGE, JOIN_PLAYER, GAME_STATE_CHANGE, WAITING_FOR_SECOND_PLAYER, PREPARE_GAME, IN_GAME } from "./gameState_actions"
import { SELECT_TILE, RESET_SELECTED_TILE, MOVE_TILE, REMOVE_TILE, ATTACK, PLAYER_DEFEAT, ENEMY_DEFEAT, DRAW } from "./board_actions"


const initialState = {
    pBoard: reducedDemoGameBoard,
    eBoard: reducedDemoEnemyBoard,
    playerList: [],
    enemyList: [],
    selectedTile: '',
    enemyTile: '',
    fight: false,
    player: 0,
    turn: false,
    gameState: MAIN_PAGE,
}

/*
return {
    pBoard: state.pBoard,
    eBoard: state.eBoard,
    playerList: state.playerList,
    enemyList: state.enemyList,
    selectedTile: state.selectedTile,
    enemyTile: state.enemyTile,
    fight: state.fight,
    player: state.player,
    turn: state.turn,
    gameState: state.gameState,
}
*/

export const gameReducer = (state = initialState, action) => {
    const { type, payload } = action

    // gameState_actions
    if(type === JOIN_PLAYER) {
        //the player joined the game
        const turn = payload === 1 ? true : false
        const gameState = payload === 1 ? WAITING_FOR_SECOND_PLAYER : PREPARE_GAME
        return {
            pBoard: state.pBoard,
            eBoard: state.eBoard,
            playerList: state.playerList,
            enemyList: state.enemyList,
            selectedTile: state.selectedTile,
            enemyTile: state.enemyTile,
            fight: state.fight,
            player: payload,
            turn: turn,
            gameState: gameState,
        }
    }

    if(type === GAME_STATE_CHANGE) {
        if(payload === MAIN_PAGE) {
            return initialState
        } else {
            return {
                pBoard: state.pBoard,
                eBoard: state.eBoard,
                playerList: state.playerList,
                enemyList: state.enemyList,
                selectedTile: '',
                enemyTile: '',
                fight: state.fight,
                player: state.player,
                turn: state.turn,
                gameState: payload,
            }
        }
    }





    //board_actions
    if(type === SELECT_TILE) {
        //selects a tile
        const tile = payload.tile
        const i = payload.i
        const j = payload.j
            
        return {
            pBoard: state.pBoard,
            eBoard: state.eBoard,
            playerList: state.playerList,
            enemyList: state.enemyList,
            selectedTile: {tile: tile, i: i, j: j},
            enemyTile: state.enemyTile,
            fight: state.fight,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
        }
    }

    if(type === RESET_SELECTED_TILE) {
        //reset selectedTile
        return {
            pBoard: state.pBoard,
            eBoard: state.eBoard,
            playerList: state.playerList,
            enemyList: state.enemyList,
            selectedTile: '',
            enemyTile: state.enemyTile,
            fight: state.fight,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
        }
    }

    if(type === MOVE_TILE) {
        //MODIFIED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //place or move a tile
        const tile = state.selectedTile.tile.i_id
        const i = payload.i
        const j = payload.j
        const pBoard = state.pBoard
        const eBoard = state.eBoard
        const selectedTile = state.selectedTile
        const boardY = state.pBoard.length - 1


        pBoard[i][j] = tile
        eBoard[Math.abs(i - boardY)][j] = 'e'

        if(selectedTile.i !== -1 && selectedTile.j !== -1) {
            pBoard[i][j] = tile
            eBoard[Math.abs(i - boardY)][j] = 'e'
            pBoard[selectedTile.i][selectedTile.j] = 0
            eBoard[Math.abs(selectedTile.i - boardY)][selectedTile.j] = 0
        }

        if(state.gameState === IN_GAME) { // !!!
            const player = state.player === 1 ? 2 : 1

            return {
                pBoard: eBoard, // !!!
                eBoard: pBoard, // !!!
                playerList: state.enemyList, // !!!
                enemyList: state.playerList, // !!!
                selectedTile: '',
                enemyTile: state.enemyTile,
                fight: state.fight,
                player: player, // !!!
                turn: state.turn,
                gameState: state.gameState,
            }
        } else {
            return {
                pBoard: pBoard,
                eBoard: eBoard,
                playerList: state.playerList,
                enemyList: state.enemyList,
                selectedTile: '',
                enemyTile: state.enemyTile,
                fight: state.fight,
                player: state.player,
                turn: state.turn,
                gameState: state.gameState,
            }
        }

        
    }

    if(type === REMOVE_TILE) {
        const pBoard = state.pBoard
        const eBoard = state.eBoard
        const i = payload.i
        const j = payload.j
        const boardY = state.pBoard.length - 1

        pBoard[i][j] = 0
        eBoard[Math.abs(i - boardY)][j] = 0

        return {
            pBoard: pBoard,
            eBoard: eBoard,
            playerList: state.playerList,
            enemyList: state.enemyList,
            selectedTile: '',
            enemyTile: state.enemyTile,
            fight: state.fight,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
        }
    }

    if(type === ATTACK) {
        const enemyTile = payload
        const pBoard = state.pBoard
        const eBoard = state.eBoard
        const boardY = state.pBoard.length - 1
        const i = payload.i
        const j = payload.j

        const tmpTileStr = eBoard[Math.abs(i - boardY)][j]

        pBoard[i][j] = "x|" + tmpTileStr

        return {
            pBoard: pBoard,
            eBoard: state.eBoard,
            playerList: state.playerList,
            enemyList: state.enemyList,
            selectedTile: state.selectedTile,
            enemyTile: enemyTile,
            fight: true,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
        }
    }

    if(type === PLAYER_DEFEAT) {
        //MODIFIED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const enemyTile = state.enemyTile
        const selectedTile = state.selectedTile
        const pBoard = state.pBoard
        const eBoard = state.eBoard
        const boardY = state.pBoard.length - 1
        const playerList = state.playerList
        const pi = selectedTile.i
        const pj = selectedTile.j
        const ei = enemyTile.i
        const ej = enemyTile.j

        pBoard[ei][ej] = 'e' //hide enemy tile
        pBoard[pi][pj] = 0 //delete defeated player tile
        eBoard[Math.abs(pi - boardY)][pj] = 0 //delete defeated player tile from eBoard
        playerList.push(selectedTile.tile) //add defeated tile to player's defeat list

        const player = state.player === 1 ? 2 : 1 // !!!

        return {
            pBoard: eBoard, // !!!
            eBoard: pBoard, // !!!
            playerList: state.enemyList, // !!!
            enemyList: playerList, // !!!
            selectedTile: '',
            enemyTile: '',
            fight: false,
            player: player, // !!!
            turn: state.turn,
            gameState: state.gameState,
        }
    }

    if(type === ENEMY_DEFEAT) {
        //MODIFIED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const enemyTile = state.enemyTile
        const selectedTile = state.selectedTile
        const pBoard = state.pBoard
        const eBoard = state.eBoard
        const boardY = state.pBoard.length - 1
        const enemyList = state.enemyList
        const pi = selectedTile.i
        const pj = selectedTile.j
        const ei = enemyTile.i
        const ej = enemyTile.j

        pBoard[ei][ej] = selectedTile.tile.i_id //replace defeated enemy tile with player tile (pBoard)
        pBoard[pi][pj] = 0 //delete replaced tile (pBoard)
        eBoard[Math.abs(pi - boardY)][pj] = 0 //remove player's tile to replace it
        eBoard[Math.abs(ei - boardY)][ej] = 'e' //replace defeated enemy tile with player tile (eBoard)
        enemyList.push(enemyTile.tile) //add defeated tile to enemy's defeat list

        const player = state.player === 1 ? 2 : 1 // !!!

        return {
            pBoard: eBoard, // !!!
            eBoard: pBoard, // !!!
            playerList: enemyList, // !!!
            enemyList: state.playerList, // !!!
            selectedTile: '',
            enemyTile: '',
            fight: false,
            player: player, // !!!
            turn: state.turn,
            gameState: state.gameState,
        }
    }

    if(type === DRAW) {
        //MODIFIED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const enemyTile = state.enemyTile
        const selectedTile = state.selectedTile
        const pBoard = state.pBoard
        const eBoard = state.eBoard
        const boardY = state.pBoard.length - 1
        const playerList = state.playerList
        const enemyList = state.enemyList
        const pi = selectedTile.i
        const pj = selectedTile.j
        const ei = enemyTile.i
        const ej = enemyTile.j

        pBoard[ei][ej] = 0 //delete defeated enemy tile from pBoard
        eBoard[Math.abs(ei - boardY)][ej] = 0 //delete defeated enemy tile from eBoard
        pBoard[pi][pj] = 0 //delete defeated player tile from pBoard
        eBoard[Math.abs(pi - boardY)][pj] = 0 //delete defeated player tile from eBoard
        enemyList.push(enemyTile.tile) //add defeated tile to enemy's defeate list
        playerList.push(selectedTile.tile) //add defeated tile to player's defeate list

        const player = state.player === 1 ? 2 : 1 // !!!

        return {
            pBoard: eBoard, // !!!
            eBoard: pBoard, // !!!
            playerList: enemyList, // !!!
            enemyList: playerList, // !!!
            selectedTile: '',
            enemyTile: '',
            fight: false,
            player: player, // !!!
            turn: state.turn,
            gameState: state.gameState,
        }
    }

    return state
}