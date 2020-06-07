import * as actions from '../state/websocket/actions'
import io from 'socket.io-client'
import { JOIN_PLAYER, gameStateChange, PREPARE_GAME, GAME_STATE_CHANGE, MAIN_PAGE, IN_GAME, GAME_OVER, WAITING_FOR_SECOND_PLAYER } from '../state/game/gameState_actions'
import { initGameBoard, initEnemyBoard } from '../domain/initBoards'
import { initTiles } from '../domain/initTiles'

let socket = null



export const socketMiddleware = store => next => action => {
    switch(action.type) {
        case actions.WS_CONNECT:
            if(socket !== null) {
                socket.close()
            }
            socket = io('http://webprogramozas.inf.elte.hu:3030')

            socket.on('room-is-full', message => {
                if(store.getState().game.gameState !== WAITING_FOR_SECOND_PLAYER) {
                    console.log("A player has disconnected and an other just connected.");
                    store.dispatch(gameStateChange(MAIN_PAGE))
                } else {
                    store.dispatch(gameStateChange(PREPARE_GAME))
                }
            })
            socket.on('state-changed', message => {
                if(message.state.gameOver) {
                    store.getState().game = {
                        ...store.getState().game,
                        gameOver: {
                            on: message.state.gameOver.on,
                            message: message.state.gameOver.message,
                        }
                    }
                } else {
                    if(message.state.fight) {
                        store.getState().game = {
                            ...store.getState().game,
                            pBoard: message.state.pBoard,
                            eBoard: message.state.eBoard,
                            selectedTile: message.state.selectedTile,
                            enemyTile: message.state.enemyTile,
                            fight: message.state.fight,
                            turn: message.state.turn,
                            defender: true,
                        }
                    } else {
                        store.getState().game = {
                            ...store.getState().game,
                            pBoard: message.state.pBoard,
                            eBoard: message.state.eBoard,
                            playerList: message.state.playerList,
                            enemyList: message.state.enemyList,
                            turn: store.getState().game.gameState === IN_GAME ? true : store.getState().game.turn,
                            defender: false,
                            fight: false,
                            selectedTile: '',
                            enemyTile: '',

                        }
                    }
                }
                next(action)
            })
            socket.on('action-sent', message => {
                if(message.action === 'ready') {
                    store.getState().game.ready.count += 1
                    if(store.getState().game.ready.count === 2) {
                        store.dispatch(gameStateChange(IN_GAME))
                    }
                } else if(message.action === 'looser') {
                    store.getState().game = {
                        ...store.getState().game,
                        looser: true,
                    }
                }
                next(action)
            })
            socket.on('player-left', message => {
                store.dispatch(gameStateChange(MAIN_PAGE))
            })
            break

        case GAME_STATE_CHANGE:
            if(action.payload === MAIN_PAGE) {
                store.getState().game.pBoard = JSON.parse(JSON.stringify(initGameBoard)) //deep copy reset
                store.getState().game.eBoard = JSON.parse(JSON.stringify(initEnemyBoard)) //deep copy reset
                store.getState().tiles = JSON.parse(JSON.stringify(initTiles)) //deep copy reset
                socket.emit('leave-room', store.getState().game.roomId, ack => {
                    if(ack.status === 'error') {
                        console.error('[LEAVE-ROOM] - ', ack)
                    }
                })
            }
            next(action)
            break
        
        case JOIN_PLAYER:
            if(action.payload.roomId === null) {
                socket.emit('create-room', ack => {
                    console.log(ack)
                    if(ack.status === 'ok') {
                        store.getState().game.roomId = ack.roomId
                        next(action)
                    } else {
                        console.error('[CREATE-ROOM] - ', ack)
                    }
                })
            } else {
                socket.emit('join-room', action.payload.roomId, ack => {
                    if(ack.status === 'ok') {
                        next(action)
                    } else if(ack.status === 'error') {
                        let message = "Hiba, sikertelen a csatlakozás."
                        if(ack.message === "The room is already full.") {
                            message = "A játékszoba megtelt."
                        } else if(ack.message === "No such room id on the socket.io server.") {
                            message = "Hibás azonosító! Nincs ilyen szoba."
                        }


                        const tmp = document.createElement('div')
                        tmp.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show', 'text-center', 'w-50', 'mx-auto')
                        tmp.setAttribute('role','alert')
                        tmp.innerHTML = message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                        tmp.firstElementChild.firstElementChild.addEventListener('click', () => tmp.remove())
                        document.getElementById('gamerules').previousSibling.appendChild(tmp)
                    } else {console.error('[ERROR] - Unknown response! ', ack)}
                })
            }
            break

        case actions.WS_SYNC_STATE:
            const roomId = store.getState().game.roomId
            let state = null
            if(store.getState().game.fight) {
                const newPBoard = store.getState().game.eBoard
                const newEBoard = store.getState().game.pBoard
                const boardY = newPBoard.length - 1
                const newEnemyTile = store.getState().game.selectedTile
                const newSelectedTile = {
                    ...store.getState().game.enemyTile,
                    i: Math.abs(store.getState().game.enemyTile.i - boardY)
                }
                
                // reveal the attacker
                newPBoard[Math.abs(newEnemyTile.i - boardY)][newEnemyTile.j] = "x|" + newEnemyTile.tile.i_id

                state = {
                    pBoard: newPBoard,
                    eBoard: newEBoard,
                    selectedTile: newSelectedTile,
                    enemyTile: newEnemyTile,
                    fight: true,
                    turn: false,
                }
            } else {
                state = {
                    pBoard: store.getState().game.eBoard,
                    eBoard: store.getState().game.pBoard,
                    playerList: store.getState().game.enemyList,
                    enemyList: store.getState().game.playerList,
                }
                if(store.getState().game.gameState === IN_GAME) {
                    store.getState().game.turn = false
                }
            }

            socket.emit('sync-state', roomId, state, true, ack => {
                if(ack.status !== 'ok') {
                    console.error("[ACK | WS_SYNC_STATE] - ", ack)
                }
            })
            next(action)
            break

        case actions.WS_READY:
            store.getState().game.ready.player = true
            socket.emit('sync-action', store.getState().game.roomId, 'ready', false, ack => {
                if(ack.status !== 'ok') {
                    console.error("[ACK | WS_READY] - ", ack)
                }
            })
            next(action)
            break

        case GAME_OVER:
            const gameOverState = {
                pBoard: store.getState().game.eBoard,
                eBoard: store.getState().game.pBoard,
                playerList: store.getState().game.enemyList,
                enemyList: store.getState().game.playerList,
                gameOver: {
                    on: true,
                    message: "Vereség!",
                }
            }
            socket.emit('sync-state', store.getState().game.roomId, gameOverState,true, ack => {
                if(ack.status !== 'ok') {
                    console.error("[ACK | WS_GAME_OVER] - ", ack)
                }
            })
            next(action)
            break

        default:
            return next(action)
    }
}