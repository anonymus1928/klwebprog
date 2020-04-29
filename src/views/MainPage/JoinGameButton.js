import React from 'react';

export function JoinGameButton({ onSelect, onPlayer }) {

    const handleSubmit = e => {
        onPlayer(2)
        onSelect('PREPARE_GAME')
    }

    return (
        <div className="col card border-0 rounded-lg mx-5 px-0 text-center card2 custom-background">
            <div className="card-body rounded-lg px-0">
                <h2 className="card-title py-2">Csatlakozás játékhoz</h2>
                <form id="joinform" action="#" onSubmit={handleSubmit}>
                    <div className="input-group position-absolute fixed-bottom px-1 py-4">
                        <input type="number" className="form-control border-0 border-bottom text-center" placeholder="Játékszoba kód" aria-label="Recipient's username" required />
                        <div className="input-group-append">
                            <button className="btn btn-success border-0" type="submit" >Csatlakozás</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}