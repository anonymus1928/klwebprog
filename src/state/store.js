import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import { gameReducer } from "./game/reducer";
import { tilesReducer } from "./tiles/reducer";

const rootReducer = combineReducers({
    game: gameReducer,
    tiles: tilesReducer,
})


const logger = createLogger({
    collapsed: true,
})

export const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(
        applyMiddleware(logger)
    ))
}