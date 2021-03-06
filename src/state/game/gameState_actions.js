export const MAIN_PAGE = "MAIN_PAGE"
export const WAITING_FOR_SECOND_PLAYER = "WAITING_FOR_SECOND_PLAYER"
export const PREPARE_GAME = "PREPARE_GAME"
export const IN_GAME = "IN_GAME"

export const GAME_OVER = 'GAME_OVER'

export const JOIN_PLAYER = "JOIN_PLAYER"
export const GAME_STATE_CHANGE = "GAME_STATE_CHANGE"

export const joinPlayer = input => {
    return {
        type: JOIN_PLAYER,
        payload: input,
    }
}

export const gameStateChange = state => {
    return {
        type: GAME_STATE_CHANGE,
        payload: state
    }
}

export const gameOver = () => {
    return {
        type: GAME_OVER,
    }
}