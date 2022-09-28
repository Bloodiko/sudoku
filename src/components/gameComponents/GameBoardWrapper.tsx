
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import { CandidatesProvider } from './CandidatesContext';
import { GameProvider } from './GameContext';
import GameBoard from './GameBoard';

interface GameBoardWrapperProps {
    game: Sudoku;
}

const GameBoardWrapper = (props: GameBoardWrapperProps) => {

    return (
        <>
            <GameProvider game={props.game}>
                <CandidatesProvider>
                    <GameBoard game={props.game} />
                </CandidatesProvider>
            </GameProvider>
        </>
    )
}

export default GameBoardWrapper
