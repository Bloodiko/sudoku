import React from "react";

import gameDataReducer, { init } from "./GameDataReducer";
import { ReducerAction } from "../../types/GameDataReducerType";
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";


const GameContext = React.createContext({ gamedata: {} as GameData, dispatch: (action: ReducerAction) => { } });

const GameProvider = (props: { game: Sudoku, children: any }) => {

    const [gamedata, dispatch] = React.useReducer(gameDataReducer, props.game, init);

    return (
        <GameContext.Provider value={{ gamedata, dispatch }}>
            {props.children}
        </GameContext.Provider>
    )
}

export { GameContext, GameProvider };