import React from "react"

import { GameContext } from "./GameContext"
import { useContext } from "react"
import { Actions } from "../../types/GameDataReducerType"


// game CompletedOverlay 

const CompletedOverlay = () => {

    const { dispatch } = useContext(GameContext);

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
                <h1>Completed!</h1>
            </div>

            <button className="closeOverlayButton" onClick={() => dispatch({ type: Actions.closeOverlay })}>Close</button>
        </div>
    )
}

export default CompletedOverlay