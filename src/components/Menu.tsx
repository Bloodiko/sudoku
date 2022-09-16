import React from "react";

import { StatusContext } from "./statusContext";
import { useContext } from "react";
import status from './statusEnum';

const Menu = () => {
    const { appStatus, setAppStatus } = useContext(StatusContext);

    const changeStatus = (appStatus) => {
        setAppStatus(appStatus.GAME);
    }

    return (
        <div>
            <h1>Menu</h1>
            <button onClick={() => { changeStatus(status.DIFFICULTY) }} >Start Sudoku Game</button>
        </div>
    );
}

export default Menu;