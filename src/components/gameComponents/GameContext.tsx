import React from "react";

import gameDataReducer from "./GameDataReducer";

const GameContext = React.createContext({ data: {} as GameData, dispatch: (action: any) => { } });

const GameProvider = (props: any) => {

    const [data, dispatch] = React.useReducer(gameDataReducer, {} as GameData);

    return (
        <GameContext.Provider value={{ data, dispatch }}>
            {props.children}
        </GameContext.Provider>
    )
}

export { GameContext, GameProvider };