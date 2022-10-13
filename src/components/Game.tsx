//component for game

/* 
    Generates new Game or loads it, and creates GameBoard
*/
import React, { useMemo } from 'react';
import { DifficultyContext } from './DifficultyContext';
import { useContext } from 'react';
import diffEnum from './difficultyEnum';
import { useEffect } from 'react';

import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';

import { useState } from 'react';

import { getSudoku } from 'sudoku-gen';
import GameBoardWrapper from './gameComponents/GameBoardWrapper';


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

    const [game, setGame] = useState(undefined as Sudoku | undefined);
    console.log('rerender game')

    // the memo is to prevent the game from being generated on every rerender, and only when the difficulty changes
    // TODO: this needs to change! documentations says that this is not a good way to do this → useRef? 

    const combinedDiffSetGame = useMemo(() => {
        return { difficulty: gamedifficulty, setGame: setGame, game: game }
    }, [gamedifficulty, setGame, game]);

    useEffect(() => {
        if (combinedDiffSetGame.game) {
            return;
        }

        // if difficulty is continue, load game from local storage
        if (combinedDiffSetGame.difficulty === diffEnum.CONTINUE) {
            const gameData = JSON.parse(localStorage.getItem("currentGameData") || '{}');
            setGame(gameData.game);
            return;
        }
        console.log('game does not exist - generate sudoku')
        setGame(getSudoku(genDiff(combinedDiffSetGame.difficulty)))
    }, [combinedDiffSetGame])


    return (
        <>
            <h1>Game</h1>
            <p>Difficulty: {game?.difficulty}</p>
            {game && <GameBoardWrapper loadRunningGame={gamedifficulty === diffEnum.CONTINUE} game={game} />}
        </>
    );
}

export default Game;