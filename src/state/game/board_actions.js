export const SELECT_TILE = "SELECT_TILE"
export const RESET_SELECTED_TILE = "RESET_SELECTED_TILE"
export const MOVE_TILE = "MOVE_TILE"
export const REMOVE_TILE = "REMOVE_TILE"
export const ATTACK = "ATTACK"
export const PLAYER_DEFEAT = "PLAYER_DEFEAT"
export const ENEMY_DEFEAT = "ENEMY_DEFEAT"
export const DRAW = "DRAW"



export const selectTile = (tile, i = -1, j = -1) => {
    return {
        type: SELECT_TILE,
        payload: {
            tile: tile,
            i: i,
            j: j,
        }
    }
}

export const resetSelectedTile = () => {
    return {
        type: RESET_SELECTED_TILE,
        payload: ''
    }
}

export const moveTile = (i,j) => {
    return {
        type: MOVE_TILE,
        payload: {
            i: i,
            j: j,
        }
    }
}

export const removeTile = (i,j) => {
    return {
        type: REMOVE_TILE,
        payload: {
            i: i,
            j: j,
        }
    }
}

export const attack = (i,j,tile) => {
    return {
        type: ATTACK,
        payload: {
            tile: tile,
            i: i,
            j: j,
        }
    }
}

export const playerDefeat = () => {
    return {
        type: PLAYER_DEFEAT,
        payload: '',
    }
}

export const enemyDefeat = () => {
    return {
        type: ENEMY_DEFEAT,
        payload: '',
    }
}

export const draw = () => {
    return {
        type: DRAW,
        payload: '',
    }
}