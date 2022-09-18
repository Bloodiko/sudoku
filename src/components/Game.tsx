//component for game
import React from 'react';
import { DifficultyContext } from './DifficultyContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import diffEnum from './difficultyEnum';

import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';

import { useState } from 'react';

import { getSudoku } from 'sudoku-gen'

const Game = () => {
    const { gamedifficulty, setDifficulty } = useContext(DifficultyContext);

    const [game, setGame] = useState(undefined as Sudoku | undefined);

    useEffect(() => {
        game && setDifficulty(diffEnum.NONE);
    }, [game, setDifficulty]);

    //convert difficulty enum to sudoku-gen difficulty -> is there an easier way?
    const genDiff = (diff: diffEnum): Difficulty => {
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
                return "easy";
        }
    }

    if (gamedifficulty !== diffEnum.NONE) {

        setGame(getSudoku(
            gamedifficulty === diffEnum.RANDOM ? undefined : genDiff(gamedifficulty)
        ));
    }
    return (
        <div>
            <h1>Game</h1>
            <p>Difficulty: {game?.difficulty}</p>
        </div>
    );
}

export default Game;