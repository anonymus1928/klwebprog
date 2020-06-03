import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import { gameReducer } from "./game/reducer";
import { tilesReducer } from "./tiles/reducer";
import { socketMiddleware } from "../middleware/websocket";

const rootReducer = combineReducers({
    game: gameReducer,
    tiles: tilesReducer,
})


const logger = createLogger({
    collapsed: true,
})

export const configureStore = () => {

    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(logger, socketMiddleware))
    )

    /*return createStore(rootReducer, composeWithDevTools(
        applyMiddleware(logger)
    ))*/
}