
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import { GameProvider } from './GameContext';
import GameBoard from './GameBoard';

interface GameBoardWrapperProps {
    game: Sudoku;
}

const GameBoardWrapper = (props: GameBoardWrapperProps) => {

    return (
        <>
            <GameProvider game={props.game}>
                <GameBoard game={props.game} />
            </GameProvider>
        </>
    )
}

export default GameBoardWrapper
