import * as actions from '../state/websocket/actions'
import io from 'socket.io-client'
import { JOIN_PLAYER, gameStateChange, PREPARE_GAME, GAME_STATE_CHANGE, MAIN_PAGE, IN_GAME, GAME_OVER } from '../state/game/gameState_actions'

let socket = null



export const socketMiddleware = store => next => action => {
    console.log('[WS] - store: ', store.getState().game.roomId)
    console.log('[WS] - action: ', action)
    switch(action.type) {
        case actions.WS_CONNECT:
            if(socket !== null) {
                socket.close()
            }
            socket = io('http://webprogramozas.inf.elte.hu:3030')

            socket.on('room-is-full', message => {
                console.log('room-is-full: ', message);
                store.dispatch(gameStateChange(PREPARE_GAME))
            })
            socket.on('state-changed', message => {
                console.log('state-changed: ', message);
                if(message.state.gameOver) {
                    store.getState().game = {
                        ...store.getState().game,
                        gameOver: {
                            on: message.state.gameOver.on,
                            message: message.state.gameOver.message,
                        }
                    }
                } else {
                    store.getState().game = {
                        ...store.getState().game,
                        pBoard: message.state.pBoard,
                        eBoard: message.state.eBoard,
                        playerList: message.state.playerList,
                        enemyList: message.state.enemyList,
                        turn: store.getState().game.gameState === IN_GAME ? !store.getState().game.turn : store.getState().game.turn,
                    }
                }
                next(action)
            })
            socket.on('action-sent', message => {
                console.log('action-sent: ', message);
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
                console.log('player-left: ', message);
                store.dispatch(gameStateChange(MAIN_PAGE))
            })
            break

        case GAME_STATE_CHANGE:
            if(action.payload === MAIN_PAGE) {
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
                console.log('create-room')
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
                console.log('join-room')
                socket.emit('join-room', action.payload.roomId, ack => {
                    console.log(ack)
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
            let state = {
                pBoard: store.getState().game.eBoard,
                eBoard: store.getState().game.pBoard,
                playerList: store.getState().game.enemyList,
                enemyList: store.getState().game.playerList,
            }
            if(store.getState().game.gameState === IN_GAME) {
                store.getState().game.turn = !store.getState().game.turn
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