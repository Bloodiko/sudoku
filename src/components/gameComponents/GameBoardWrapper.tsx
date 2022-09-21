import React from 'react';
// Sudoku GameBoardWrapper
// Contains Contexts for Game: Cell Info and Candidates

import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import { CandidatesProvider } from './CandidatesContext';
import GameBoard from './GameBoard';

interface GameBoardWrapperProps {
    game: Sudoku;
}

const GameBoardWrapper = (props: GameBoardWrapperProps) => {

    return (
        <>
            <CandidatesProvider>
                <GameBoard game={props.game} />
            </CandidatesProvider>
        </>
    )
}

export default GameBoardWrapper
