import React, { useEffect } from "react"
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type"
import Cell from "./Cell"
import { GameContext } from "./GameContext"
import { useContext } from "react"
import { Actions } from "../../types/GameDataReducerType"
import CompletedOverlay from "./CompletedOverlay"
import { cellMapping } from "./cellMapping"

interface GameBoardProps {
    game: Sudoku,
    paused: Boolean
}

const validCodes = [
    "Backspace", "Delete",
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

    const { gamedata, dispatch } = useContext(GameContext);

    const buildGameBoard = (game: Sudoku) => {

        let cells: JSX.Element[] = [];

        for (let i = 0; i < game.puzzle.length; i++) {
            const cellValue = game.puzzle[i];

            const cellNumber = i;

            const cellLocked = cellValue !== "-";

            cells.push(
                <Cell
                    cell={cellNumber}
                    row={cellMapping[cellNumber].row}
                    col={cellMapping[cellNumber].column}
                    cube={cellMapping[cellNumber].cube}
                    locked={cellLocked}
                    value={cellValue}
                    highlighted={gamedata.highlightCells.includes(cellNumber)}
                    isError={gamedata.errorCells.includes(cellNumber)}
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

            e.stopPropagation();

            if (e.code === "Backspace" || e.code === "Delete") {
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
            {!props.paused ? buildGameBoard(props.game) : <div className="paused">Paused</div>}

            {gamedata.completed && gamedata.completedOverlay && <CompletedOverlay />}
        </div>

    )
}

export default GameBoard