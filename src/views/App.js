import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/assets/app.css';

import { MainPage } from './MainPage/MainPage';
import { WaitingRoom } from './WaitingRoom/WaitingRoom';
import { PreparationRoom } from './Game/PreparationRoom';
import { Game } from './Game/Game';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { MAIN_PAGE, WAITING_FOR_SECOND_PLAYER, PREPARE_GAME, IN_GAME } from '../state/game/gameState_actions';
import { wsConnect } from '../state/websocket/actions';
 
library.add(faBomb, faFlag)

export function App() {
    const gameState = useSelector(state => state.game.gameState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(wsConnect())
    }, [dispatch])

    if(gameState === MAIN_PAGE) {
        return <MainPage />
    } else if(gameState === WAITING_FOR_SECOND_PLAYER) {
        return <WaitingRoom />
    } else if(gameState === PREPARE_GAME) {
        return <PreparationRoom />
    } else if(gameState === IN_GAME) {
        return <Game />
    }
}