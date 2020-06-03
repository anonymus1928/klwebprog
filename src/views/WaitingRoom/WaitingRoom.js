import React from 'react';

import { logo } from "../../assets/stratego-logo.png";
import { RoomKeyDisplay } from './RoomKeyDisplay';
import { WaitingRoomButtons } from './WaitingRoomButtons';

export function WaitingRoom() {
    return (
        <div id="waitingroom">
            <div className="content mx-auto py-5 text-center">
                <img className="my-5" src={ logo } alt="" />
                <div className="smoke rounded-lg py-5">
                    <h1 className="mb-5">Várakozás második játékosra...</h1>
                    <div className="smoke">
                        <RoomKeyDisplay />
                    </div>
                    <p>Játékszoba kulcs</p>
                    <WaitingRoomButtons />
                </div>
            </div>
        </div>
    )
}