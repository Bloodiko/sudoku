import React from "react";

import gameDataReducer, { init } from "./GameDataReducer";
import { Actions, ReducerAction } from "../../types/GameDataReducerType";
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";

import { useEffect } from "react";

const GameContext = React.createContext({ gamedata: {} as GameData, dispatch: (action: ReducerAction) => { } });

const GameProvider = (props: { game: Sudoku, children: any }) => {

    const [gamedata, dispatch] = React.useReducer(gameDataReducer, props.game, init);

    useEffect(() => {
        dispatch({ type: Actions.newGame, payload: props.game })
    }, [props.game])


    return (
        <GameContext.Provider value={{ gamedata, dispatch }}>
            {props.children}
        </GameContext.Provider>
    )
}

export { GameContext, GameProvider };