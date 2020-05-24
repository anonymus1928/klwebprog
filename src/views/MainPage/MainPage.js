import React from 'react';
import { GameRules } from './GameRules';
import { Header } from './Header';
import { NewGameButton } from './NewGameButton';
import { JoinGameButton } from './JoinGameButton';

export function MainPage() {
    
    return (
        <>
            <Header />
            <div id="links" className="py-4">
                <div className="container row mx-auto my-5">
                    <NewGameButton />
                    <JoinGameButton />
                </div>
            </div>
            <GameRules />
        </>
    )
}