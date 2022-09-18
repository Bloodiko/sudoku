//component for difficulty

import { useContext } from "react";
import { DifficultyContext } from "./DifficultyContext";
import { StatusContext } from "./statusContext";
import diffEnum from "./difficultyEnum";
import status from "./statusEnum";

const Difficulty = () => {

    const { setDifficulty } = useContext(DifficultyContext);
    const { setAppStatus } = useContext(StatusContext);

    const changeDifficulty = (newDifficulty: diffEnum) => {
        setDifficulty(newDifficulty);
        setAppStatus(status.GAME);
    }

    return (
        <div>
            <h1>Difficulty</h1>

            <h3>Select Difficulty for the new Game:</h3>
            <br />
            <div className="diffDiv">
                <button className="diffBtn" onClick={() => { changeDifficulty(diffEnum.EASY) }}>Easy</button>
                <button className="diffBtn" onClick={() => { changeDifficulty(diffEnum.MEDIUM) }}>Medium</button>
                <button className="diffBtn" onClick={() => { changeDifficulty(diffEnum.HARD) }}>Hard</button>
                <button className="diffBtn" onClick={() => { changeDifficulty(diffEnum.EXPERT) }}>Expert</button>
                <button className="diffBtn" onClick={() => { changeDifficulty(diffEnum.RANDOM) }}>Random</button>
            </div>
        </div>
    );
}

export default Difficulty;