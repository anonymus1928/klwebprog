export const TILES_REDUCE_PCS = "TILES_REDUCE_PCS"
export const TILES_INCREASE_PCS = "TILES_INCREASE_PCS"

export const tilesReducePcs = tile => ({
    type: TILES_REDUCE_PCS,
    payload: tile,
})

export const tilesIncreasePcs = tile => ({
    type: TILES_INCREASE_PCS,
    payload: tile,
})