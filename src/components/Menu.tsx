import { StatusContext } from "./statusContext";
import { DifficultyContext } from "./DifficultyContext";
import { useContext } from "react";
import status from './statusEnum';
import diffEnum from "./difficultyEnum";

const Menu = () => {
    const { setAppStatus } = useContext(StatusContext);
    const { setDifficulty } = useContext(DifficultyContext);

    const changeStatus = (newStatus: status) => {
        setAppStatus(newStatus);
    }

    // read local storage for running game
    // if there is a running game, show continue button

    const gameRunning = window.localStorage.getItem("gameRunning");

    return (
        <>
            <h1>Menu</h1>
            {gameRunning && <button className="menu" onClick={() => {
                setDifficulty(diffEnum.CONTINUE)
                changeStatus(status.GAME)
            }
            }>Continue Game</button>}
            <button className="menu" onClick={() => { changeStatus(status.DIFFICULTY) }} >Start Sudoku Game</button>
            <button className="menu" onClick={() => { changeStatus(status.SCOREBOARD) }}>Highscores</button>
        </>
    );
}

export default Menu;