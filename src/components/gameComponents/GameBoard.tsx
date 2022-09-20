import React from "react"
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type"

interface GameBoardProps {
    game: Sudoku
}

const GameBoard = (props: GameBoardProps) => {

    const buildGameBoard = (game: Sudoku) => {

    }

    return (
        <div className="gameBoard">

        </div>

    )
}

export default GameBoard