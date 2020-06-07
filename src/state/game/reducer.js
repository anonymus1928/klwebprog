import { initGameBoard, initEnemyBoard } from "../../domain/initBoards"
import { MAIN_PAGE, JOIN_PLAYER, GAME_STATE_CHANGE, WAITING_FOR_SECOND_PLAYER, PREPARE_GAME, IN_GAME, GAME_OVER } from "./gameState_actions"
import { SELECT_TILE, RESET_SELECTED_TILE, MOVE_TILE, REMOVE_TILE, ATTACK, PLAYER_DEFEAT, ENEMY_DEFEAT, DRAW } from "./board_actions"


const initialState = {
    pBoard: initGameBoard,
    eBoard: initEnemyBoard,
    playerList: [],
    enemyList: [],
    selectedTile: '',
    enemyTile: '',
    fight: false,
    defender: false,
    player: 0,
    turn: false,
    gameState: MAIN_PAGE,
    roomId: null,
    ready: {
        count: 0,
        player: false,
    },
    gameOver: {
        on: false,
        message: '',
    }
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
    defender: state.defender,
    player: state.player,
    turn: state.turn,
    gameState: state.gameState,
    roomId: state.roomId,
    ready: state.ready,
    gameOver: state.gameOver,
}
*/

export const gameReducer = (state = initialState, action) => {
    const { type, payload } = action

    // gameState_actions
    if(type === JOIN_PLAYER) {
        //the player joined the game
        const roomId = payload.roomId !== null ? payload.roomId : state.roomId
        const turn = payload.player === 1 ? true : false
        const gameState = payload.player === 1 ? WAITING_FOR_SECOND_PLAYER : PREPARE_GAME
        return {
            pBoard: state.pBoard,
            eBoard: state.eBoard,
            playerList: state.playerList,
            enemyList: state.enemyList,
            selectedTile: state.selectedTile,
            enemyTile: state.enemyTile,
            fight: state.fight,
            defender: state.defender,
            player: payload.player,
            turn: turn,
            gameState: gameState,
            roomId: roomId,
            ready: state.ready,
            gameOver: state.gameOver,
        }
    }

    if(type === GAME_STATE_CHANGE) {
        if(payload === MAIN_PAGE) {
            return {
                pBoard: initGameBoard,
                eBoard: initEnemyBoard,
                playerList: [],
                enemyList: [],
                selectedTile: '',
                enemyTile: '',
                fight: false,
                defender: false,
                player: 0,
                turn: false,
                gameState: MAIN_PAGE,
                roomId: null,
                ready: {
                    count: 0,
                    player: false,
                },
                gameOver: {
                    on: false,
                    message: '',
                }
            }
        } else {
            return {
                pBoard: state.pBoard,
                eBoard: state.eBoard,
                playerList: state.playerList,
                enemyList: state.enemyList,
                selectedTile: '',
                enemyTile: '',
                fight: state.fight,
                defender: state.defender,
                player: state.player,
                turn: state.turn,
                gameState: payload,
                roomId: state.roomId,
                ready: state.ready,
                gameOver: state.gameOver,
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
            defender: state.defender,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
            roomId: state.roomId,
            ready: state.ready,
            gameOver: state.gameOver,
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
            defender: state.defender,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
            roomId: state.roomId,
            ready: state.ready,
            gameOver: state.gameOver,
        }
    }

    if(type === MOVE_TILE) {
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

        if(state.gameState === IN_GAME) {

            return {
                pBoard: pBoard,
                eBoard: eBoard,
                playerList: state.playerList,
                enemyList: state.enemyList,
                selectedTile: '',
                enemyTile: state.enemyTile,
                fight: state.fight,
                defender: state.defender,
                player: state.player,
                turn: state.turn,
                gameState: state.gameState,
                roomId: state.roomId,
                ready: state.ready,
                gameOver: state.gameOver,
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
                defender: state.defender,
                player: state.player,
                turn: state.turn,
                gameState: state.gameState,
                roomId: state.roomId,
                ready: state.ready,
                gameOver: state.gameOver,
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
            defender: state.defender,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
            roomId: state.roomId,
            ready: state.ready,
            gameOver: state.gameOver,
        }
    }

    if(type === ATTACK) {
        const enemyTile = payload
        const selectedTile = state.selectedTile
        const pBoard = state.pBoard
        const eBoard = state.eBoard
        const boardY = state.pBoard.length - 1
        const i = payload.i
        const j = payload.j

        pBoard[i][j] = "x|" + enemyTile.tile.i_id
        eBoard[Math.abs(selectedTile.i - boardY)][selectedTile.j] = "x|" + selectedTile.tile.i_id

        return {
            pBoard: pBoard,
            eBoard: eBoard,
            playerList: state.playerList,
            enemyList: state.enemyList,
            selectedTile: state.selectedTile,
            enemyTile: enemyTile,
            fight: true,
            defender: state.defender,
            player: state.player,
            turn: false,
            gameState: state.gameState,
            roomId: state.roomId,
            ready: state.ready,
            gameOver: state.gameOver,
        }
    }

    if(type === PLAYER_DEFEAT) {
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
        playerList.push({...selectedTile.tile, id: Date.now()}) //add defeated tile to player's defeat list

        return {
            pBoard: pBoard,
            eBoard: eBoard,
            playerList: playerList,
            enemyList: state.enemyList,
            selectedTile: '',
            enemyTile: '',
            fight: false,
            defender: state.defender,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
            roomId: state.roomId,
            ready: state.ready,
            gameOver: state.gameOver,
        }
    }

    if(type === ENEMY_DEFEAT) {
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
        enemyList.push({...enemyTile.tile, id: Date.now()}) //add defeated tile to enemy's defeat list

        return {
            pBoard: pBoard,
            eBoard: eBoard,
            playerList: state.playerList,
            enemyList: enemyList,
            selectedTile: '',
            enemyTile: '',
            fight: false,
            defender: state.defender,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
            roomId: state.roomId,
            ready: state.ready,
            gameOver: state.gameOver,
        }
    }

    if(type === DRAW) {
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
        enemyList.push({...enemyTile.tile, id: Date.now()}) //add defeated tile to enemy's defeate list
        playerList.push({...selectedTile.tile, id: Date.now()}) //add defeated tile to player's defeate list

        return {
            pBoard: pBoard,
            eBoard: eBoard,
            playerList: playerList,
            enemyList: enemyList,
            selectedTile: '',
            enemyTile: '',
            fight: false,
            defender: state.defender,
            player: state.player,
            turn: state.turn,
            gameState: state.gameState,
            roomId: state.roomId,
            ready: state.ready,
            gameOver: state.gameOver,
        }
    }

    if(type === GAME_OVER) {
        return {
            ...state,
            selectedTile: '',
            enemyTile: '',
            fight: false,
            gameOver: {
                on: true,
                message: "Győzelem!",
            }
        }
    }

    return state
}