import React from 'react';
import { GameRules } from './GameRules';
import { Header } from './Header';
import { NewGameButton } from './NewGameButton';
import { JoinGameButton } from './JoinGameButton';

export function MainPage({ onSelect, onPlayer }) {
    return (
        <>
            <Header />
            <div id="links" className="py-4">
                <div className="content row mx-auto my-5">
                    <NewGameButton onSelect={onSelect} onPlayer={onPlayer} />
                    <JoinGameButton onSelect={onSelect} onPlayer={onPlayer} />
                </div>
            </div>
            <GameRules />
        </>
    )
}