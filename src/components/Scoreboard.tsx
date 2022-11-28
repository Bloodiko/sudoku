//component for scoreboard
import React, { useState } from 'react';

import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';

const recordStorage = {
    easy: [],
    medium: [],
    hard: [],
    expert: [],
}

const gametimeString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const Scoreboard = () => {
    const records = JSON.parse(localStorage.getItem("records") || JSON.stringify(recordStorage))

    const [showDifficulty, setShowDifficulty] = useState("easy" as Difficulty)

    const recordList = (difficulty: Difficulty) => {
        return records[difficulty].map((record: { name: string, time: number }, index: number) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{record.name}</td>
                    <td>{gametimeString(record.time)}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <h1>Scoreboard</h1>

            <button onClick={() => { setShowDifficulty("easy") }} >Easy</button>
            <button onClick={() => { setShowDifficulty("medium") }} >Medium</button>
            <button onClick={() => { setShowDifficulty("hard") }} >Hard</button>
            <button onClick={() => { setShowDifficulty("expert") }} >Expert</button>

            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {recordList(showDifficulty)}
                </tbody>
            </table>

        </div>
    );
}

export default Scoreboard;