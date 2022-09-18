import React from "react";
import { useState } from "react";
import diffEnum from "./difficultyEnum";

interface IStatusProps {
    children?: React.ReactNode;
}

const DifficultyContext = React.createContext({ difficulty: diffEnum.NONE, setDifficulty: (difficulty: diffEnum) => { } });

const DifficultyProvider = (props: IStatusProps) => {
    const [difficulty, setDifficulty] = useState(diffEnum.NONE);

    return (
        <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
            {props.children}
        </DifficultyContext.Provider>
    );
}

export { DifficultyContext, DifficultyProvider };