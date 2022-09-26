import React from "react"
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type"
import Cell from "./Cell"

interface GameBoardProps {
    game: Sudoku
}

const GameBoard = (props: GameBoardProps) => {

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


    return (
        <div className="gameBoard">
            {buildGameBoard(props.game)}
        </div>

    )
}

export default GameBoard