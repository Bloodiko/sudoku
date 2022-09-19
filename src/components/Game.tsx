//component for game
import React, { useMemo } from 'react';
import { DifficultyContext } from './DifficultyContext';
import { useContext } from 'react';
import diffEnum from './difficultyEnum';
import { useEffect } from 'react';

import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';

import { useState } from 'react';

import { getSudoku } from 'sudoku-gen'

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
    const { gamedifficulty, setDifficulty } = useContext(DifficultyContext);

    const [game, setGame] = useState(undefined as Sudoku | undefined);
    console.log('rerender game')


    // { game: game, setDifficulty: setDifficulty }
    const combinedGameDiff = useMemo(() => {
        return { game: game, setDifficulty: setDifficulty, gamedifficulty: gamedifficulty }
    }, [game, setDifficulty, gamedifficulty]);

    const combinedDiffSetGame = useMemo(() => {
        return { difficulty: gamedifficulty, setGame: setGame, game: game }
    }, [gamedifficulty, setGame, game]);


    useEffect(() => {
        if (combinedGameDiff.gamedifficulty !== diffEnum.NONE) {
            return;
        }
        console.log('game exists - reset difficulty')
        combinedGameDiff.setDifficulty(diffEnum.NONE)
    }, [combinedGameDiff])

    useEffect(() => {
        if (combinedDiffSetGame.game) {
            return;
        }
        console.log('game does not exist - generate sudoku')
        setGame(getSudoku(genDiff(combinedDiffSetGame.difficulty)))
    }, [combinedDiffSetGame])


    return (
        <div>
            <h1>Game</h1>
            <p>Difficulty: {game?.difficulty}</p>
        </div>
    );
}

export default Game;