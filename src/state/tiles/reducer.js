import { tiles, reducedTiles } from "../../domain/tiles"
import { TILES_REDUCE_PCS, TILES_INCREASE_PCS } from "./actions"


export const tilesReducer = (state = reducedTiles, action) => {
    const { type, payload } = action

    if(type === TILES_REDUCE_PCS) {
        const tiles = state
        const tile = payload

        tile.pcs_left--

        return tiles.map(t => t.id !== tile.id ? t : tile)
    }

    if(type === TILES_INCREASE_PCS) {
        const tiles = state
        const tile = payload

        tile.pcs_left++

        return tiles.map(t => t.id !== tile.id ? t : tile)
    }

    return state
}