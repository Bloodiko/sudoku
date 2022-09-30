import React, { useEffect } from "react"
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type"
import Cell from "./Cell"
import { GameContext } from "./GameContext"
import { useContext } from "react"
import { Actions } from "../../types/GameDataReducerType"

interface GameBoardProps {
    game: Sudoku
}

const validCodes = [
    "Backspace",
    "Digit1", "Numpad1",
    "Digit2", "Numpad2",
    "Digit3", "Numpad3",
    "Digit4", "Numpad4",
    "Digit5", "Numpad5",
    "Digit6", "Numpad6",
    "Digit7", "Numpad7",
    "Digit8", "Numpad8",
    "Digit9", "Numpad9"
]

const GameBoard = (props: GameBoardProps) => {

    const { dispatch } = useContext(GameContext);

    const buildGameBoard = (game: Sudoku) => {

        let cells: JSX.Element[] = [];

        for (let i = 0; i < game.puzzle.length; i++) {
            const cellValue = game.puzzle[i];

            const cellNumber = i;
            const cellRow = Math.floor(cellNumber / 9);
            const cellColumn = cellNumber % 9;
            const cellBox = Math.floor(cellRow / 3) * 3 + Math.floor(cellColumn / 3);
            const cellLocked = cellValue !== "-";

            cells.push(
                <Cell
                    cell={cellNumber}
                    row={cellRow}
                    col={cellColumn}
                    cube={cellBox}
                    locked={cellLocked}
                    value={cellValue}
                    key={'cell' + cellNumber.toString()}
                ></Cell>
            )

        }
        return (<>
            {
                cells.map((cell, index) => {
                    return cell;
                })
            }
        </>
        )

    }

    useEffect(() => {
        const onKeyPress = (e: any) => {

            if (e.target.nodeName !== "BODY") { // ignore keypresses if the target is input fields or other elements
                return;
            }
            if (!validCodes.includes(e.code)) {
                return;
            }

            console.log(e);

            e.stopPropagation();

            if (e.code === "Backspace") {
                dispatch({ type: Actions.setCellValue, payload: -1 })
                return;
            }

            const value = parseInt(e.code[e.code.length - 1]);
            e.shiftKey ?
                dispatch({ type: Actions.toggleCandidate, payload: value })
                : dispatch({ type: Actions.setCellValue, payload: value })

        }

        window.addEventListener("keydown", onKeyPress);

        return () => {
            window.removeEventListener("keydown", onKeyPress);
        }

    }, [dispatch])


    return (
        <div className="gameBoard">
            {buildGameBoard(props.game)}
        </div>

    )
}

export default GameBoard