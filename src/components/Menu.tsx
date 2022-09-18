import { StatusContext } from "./statusContext";
import { useContext } from "react";
import status from './statusEnum';

const Menu = () => {
    const { setAppStatus } = useContext(StatusContext);

    const changeStatus = (newStatus: status) => {
        setAppStatus(newStatus);
    }

    // read local storage for running game
    // if there is a running game, show continue button

    let gameRunning = window.localStorage.getItem("gameRunning");

    return (
        <div>
            <h1>Menu</h1>
            {gameRunning && <button onClick={() => changeStatus(status.GAME)}>Continue Game</button>}
            <button onClick={() => { changeStatus(status.DIFFICULTY) }} >Start Sudoku Game</button>
        </div>
    );
}

export default Menu;