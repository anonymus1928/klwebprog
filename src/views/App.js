import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/assets/app.css';

import { MainPage } from './MainPage/MainPage';
import { WaitingRoom } from './WaitingRoom/WaitingRoom';
import { PreparationRoom } from './Game/PreparationRoom';
import { Game } from './Game/Game';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';

import { demoGameBoard, demoPreparationBoard } from "../domain/demoBoards";
import { tiles } from "../domain/tiles";
 
library.add(faBomb, faFlag)

export function App() {
    const [gameState, setGameState] = useState('MAIN_PAGE')
    const [playerState, setPlayerState] = useState(1)

    if(gameState === 'MAIN_PAGE') {
        return <MainPage onSelect={setGameState} onPlayer={ setPlayerState } />
    } else if(gameState === 'WAITING_FOR_SECOND_PLAYER') {
        return <WaitingRoom onSelect={setGameState} />
    } else if(gameState === 'PREPARE_GAME') {
        return <PreparationRoom onSelect={setGameState} playerState={playerState} tiles={tiles} demoPreparationBoard={demoPreparationBoard} />
    } else if(gameState === 'IN_GAME') {
        return <Game onSelect={setGameState} playerState={playerState} tiles={tiles} demoGameBoard={demoGameBoard} />
    }
}