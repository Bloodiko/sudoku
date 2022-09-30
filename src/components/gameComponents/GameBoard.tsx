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

            if (e.target.nodeName !== "BODY") {
                return;
            }
            if (!validCodes.includes(e.code)) {
                return;
            }

            console.log(e);

            e.stopPropagation();

            if (e.code === "Backspace") {
                dispatch({ type: Actions.setCellValue, payload: -1 })
            }

            switch (e.code) {

                case "Digit1":
                case "Numpad1":
                    dispatch({ type: Actions.setCellValue, payload: 1 })
                    break;
                case "Digit2":
                case "Numpad2":
                    dispatch({ type: Actions.setCellValue, payload: 2 })
                    break;
                case "Digit3":
                case "Numpad3":
                    dispatch({ type: Actions.setCellValue, payload: 3 })
                    break;
                case "Digit4":
                case "Numpad4":
                    dispatch({ type: Actions.setCellValue, payload: 4 })
                    break;
                case "Digit5":
                case "Numpad5":
                    dispatch({ type: Actions.setCellValue, payload: 5 })
                    break;
                case "Digit6":
                case "Numpad6":
                    dispatch({ type: Actions.setCellValue, payload: 6 })
                    break;
                case "Digit7":
                case "Numpad7":
                    dispatch({ type: Actions.setCellValue, payload: 7 })
                    break;
                case "Digit8":
                case "Numpad8":
                    dispatch({ type: Actions.setCellValue, payload: 8 })
                    break;
                case "Digit9":
                case "Numpad9":
                    dispatch({ type: Actions.setCellValue, payload: 9 })
                    break;
                default:
                    break;
            }

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