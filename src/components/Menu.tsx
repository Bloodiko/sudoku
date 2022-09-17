import { StatusContext } from "./statusContext";
import { useContext } from "react";
import status from './statusEnum';

const Menu = () => {
    const { setAppStatus } = useContext(StatusContext);

    const changeStatus = (newStatus: status) => {
        setAppStatus(newStatus);
    }

    return (
        <div>
            <h1>Menu</h1>
            <button onClick={() => { changeStatus(status.DIFFICULTY) }} >Start Sudoku Game</button>
        </div>
    );
}

export default Menu;