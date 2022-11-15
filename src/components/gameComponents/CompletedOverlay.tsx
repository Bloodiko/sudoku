import React from "react"

import { GameContext } from "./GameContext"
import { useContext } from "react"
import { Actions } from "../../types/GameDataReducerType"
import { communicationContext } from "../ComRefContext"
import confetti from "canvas-confetti"


// game CompletedOverlay 

const CompletedOverlay = () => {

    const { dispatch } = useContext(GameContext);
    const { current } = useContext(communicationContext);

    confetti();

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
                    You solved the puzzle in <span>{current.comFunctions.callWithReturn("getCurrentTime")}</span> seconds.
                </div>
            </div>

            <button className="closeOverlayButton" onClick={() => dispatch({ type: Actions.closeOverlay })}>Close</button>
        </div>
    )
}

export default CompletedOverlay