import React from 'react';

export function WaitingRoomButtons({ onSelect }) {
    return (
        <div className="d-flex justify-content-center">
            <form action="#" className="mr-5">
                <button className="btn btn-lg btn-danger mt-5" onClick={() => onSelect("MAIN_PAGE") }>Vissza a főoldalra</button>
            </form>
            <form action="#">
                <button className="btn btn-lg btn-success mt-5" onClick={() => onSelect("PREPARE_GAME") }>DEV: FORWARD</button>
            </form>
        </div>
    )
}