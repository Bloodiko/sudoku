import React from 'react';
// Sudoku GameBoardWrapper
// Contains Contexts for Game: Cell Info and Candidates

import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import { CandidatesProvider } from './CandidatesContext';

interface GameBoardWrapperProps {
    game: Sudoku;
}

const GameBoardWrapper = (props: GameBoardWrapperProps) => {

    return (
        <>
            <CandidatesProvider>

            </CandidatesProvider>
        </>
    )
}

export default GameBoardWrapper
