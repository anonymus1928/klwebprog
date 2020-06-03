import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { joinPlayer } from '../../state/game/gameState_actions';

export function JoinGameButton() {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')

    const handleFocus = e => {
        e.target.parentElement.parentElement.parentElement.parentElement.classList.add('on-focus')
    }

    const handleBlur = e => {
        e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('on-focus')
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(inputValue)
        dispatch(joinPlayer({player: 2, roomId: inputValue}))
    }

    return (
        <div className="col card border-0 rounded-lg mx-5 px-0 text-center card2 custom-background">
            <div className="card-body rounded-lg px-0">
                <h2 className="card-title py-2">Csatlakozás játékhoz</h2>
                <form id="joinform" onSubmit={handleSubmit}>
                    <div className="input-group position-absolute fixed-bottom px-1 py-4">
                        <input type="text" className="form-control border-0 border-bottom text-center" placeholder="Játékszoba kód" value={inputValue} onChange={e => setInputValue(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                        <div className="input-group-append">
                            <button className="btn btn-success border-0" type="submit" >Csatlakozás</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}