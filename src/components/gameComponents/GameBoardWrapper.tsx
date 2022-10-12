
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import { GameProvider } from './GameContext';
import GameBoard from './GameBoard';
import Numpad from './Numpad';

interface GameBoardWrapperProps {
    game: Sudoku;
}

const GameBoardWrapper = (props: GameBoardWrapperProps) => {

    return (
        <>
            <GameProvider game={props.game}>
                <GameBoard game={props.game} />
                <Numpad />
            </GameProvider>
        </>
    )
}

export default GameBoardWrapper
