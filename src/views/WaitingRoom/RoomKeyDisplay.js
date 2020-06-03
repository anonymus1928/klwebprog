import React from 'react';
import { useSelector } from 'react-redux';

export function RoomKeyDisplay() {
    const roomKey = useSelector(state => state.game.roomId)
    return <p>{ roomKey }</p>
}