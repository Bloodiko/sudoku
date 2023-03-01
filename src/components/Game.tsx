//component for game

/* 
    Generates new Game or loads it, and creates GameBoard
*/
import { useRef } from 'react';
import { DifficultyContext } from './DifficultyContext';
import { useContext } from 'react';
import diffEnum from './difficultyEnum';

import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';

import { useState } from 'react';

import { getSudoku } from 'sudoku-gen';
import GameBoardWrapper from './gameComponents/GameBoardWrapper';

import { gametime } from '../state/TimerState';


//convert difficulty enum to sudoku-gen difficulty -> is there an easier way?
const genDiff = (diff: diffEnum): Difficulty | undefined => {
    switch (diff) {
        case diffEnum.EASY:
            return "easy";
        case diffEnum.MEDIUM:
            return "medium";
        case diffEnum.HARD:
            return "hard";
        case diffEnum.EXPERT:
            return "expert";
        default:
            return undefined;
    }
}

const Game = () => {
    const { gamedifficulty } = useContext(DifficultyContext);

    gametime.set(0);

    const [game, setGame] = useState(undefined as Sudoku | undefined);
    console.log('rerender game')

    //generate game only once
    // previous solution useEffect and useMemo. But this is better

    const gameGenerated = useRef(false);

    if (!gameGenerated.current) {
        if (gamedifficulty === diffEnum.CONTINUE) {
            const gameData = JSON.parse(localStorage.getItem("currentGameData") || '{}');
            setGame(gameData.generatedGame);
            return null;
        }
        console.log('game does not exist - generate sudoku')
        setGame(getSudoku(genDiff(gamedifficulty)))
        gameGenerated.current = true;
    }

    return (
        <>
            <h1>Game</h1>
            <p>Difficulty: {game?.difficulty}</p>
            {game && <GameBoardWrapper loadRunningGame={gamedifficulty === diffEnum.CONTINUE} game={game} />}
        </>
    );
}

export default Game;