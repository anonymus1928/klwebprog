import React from 'react';

export function NewGameButton({ onSelect, onPlayer }) {
    return (
        <div className="col card border-0 rounded-lg mx-5 px-0 text-center card1 custom-background">
            <div className="card-body rounded-lg position-relative px-0">
                <h2 className="card-title py-2">Új játék készítése</h2>
                <button className="btn w-100 h-100 position-absolute fixed-bottom border-0" onClick={ () => { onSelect('WAITING_FOR_SECOND_PLAYER')} }></button>
            </div>
        </div>
    )
}