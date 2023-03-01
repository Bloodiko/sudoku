import { GameContext } from "./GameContext"
import { useContext, useRef, useState } from "react"
import { Actions } from "../../types/GameDataReducerType"
import confetti from "canvas-confetti"

import { gametimeString, gametime } from "../../state/TimerState"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"

type record = {
    name: string,
    time: number,
}

const recordStorage = {
    easy: [],
    medium: [],
    hard: [],
    expert: [],
}



const addRecord = (name: string, time: number, difficulty: Difficulty) => {
    const records = JSON.parse(localStorage.getItem("records") || JSON.stringify(recordStorage))
    records[difficulty].push({ name, time })
    records[difficulty].sort((a: record, b: record) => a.time - b.time)
    records[difficulty] = records[difficulty].slice(0, 10)
    localStorage.setItem("records", JSON.stringify(records))
}

// game CompletedOverlay 

const CompletedOverlay = () => {

    const { gamedata, dispatch } = useContext(GameContext);

    const [saved, setSaved] = useState(false);

    const [highscoreTime] = useState(gametimeString.get())

    const [name, setName] = useState("Player");

    const highscoreRef = useRef<HTMLInputElement>(null)

    saved && confetti();
    console.log(saved)

    return (
        <div className="completedOverlay">
            <div
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "2rem",
                    backgroundColor: "white",
                    textAlign: "center"
                }}
            >
                <p>Game Completed!</p>
                <div>
                    You solved the puzzle in <span>{highscoreTime}</span>.
                </div>
                <label htmlFor="highscoreNameIN" style={{ fontSize: "1rem" }}>Name</label>

                <input id="highscoreNameIn" ref={highscoreRef} onSubmit={() => {

                }}
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => {
                        !saved && setName(e.target.value)
                    }}
                >
                </input>
                <button onClick={() => {
                    if (!saved) {
                        addRecord(highscoreRef.current?.value || "Player", gametime.get(), gamedata.generatedGame.difficulty)
                        setSaved(true)
                        setName(highscoreRef.current?.value || "Player")
                    }
                }}>Save Highscore</button>
                {
                    saved && <div style={{ color: "green", textAlign: "center" }}>Highscore saved!</div>
                }


            </div>

            <button className="closeOverlayButton" onClick={() => {
                if (!saved) {
                    addRecord(highscoreRef.current?.value || "Player", gametime.get(), gamedata.generatedGame.difficulty)
                    setSaved(true)
                }

                dispatch({ type: Actions.closeOverlay })
            }}>Close</button>

        </div>
    )
}

export default CompletedOverlay