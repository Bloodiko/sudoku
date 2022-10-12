import React, { useContext, useEffect, useState } from "react";

import { GameContext } from "./GameContext";
import { Actions } from "../../types/GameDataReducerType";

const countNumber = (currentGameState: string[]) => {
    let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < currentGameState.length; i++) {
        if (currentGameState[i] !== "-") {
            counts[parseInt(currentGameState[i]) - 1]++; // -1 because array starts at 0 and numbers start at 1
        }
    }
    return counts;
}

const NumberButton = (props: { num: number, count: number, onClick: (num: number) => void }) => {

    let classNames = "numberButton";
    if (props.count === 9) {
        classNames += " numberComplete";
    }
    else if (props.count > 9) {
        classNames += " numberTooMany";
    }

    return (
        <button className={classNames} onClick={() => props.onClick(props.num)}>{props.num}</button>
    )
}

const CandidateButton = (props: { num: number, onClick: (num: number) => void }) => {

    let candidateView = [];
    for (let i = 1; i < 10; i++) {
        candidateView.push(<div className="canCell" key={props.num.toString() + i.toString()}>{props.num === i ? i : ''}</div>)
    }

    return (
        <button className="candidateButton" onClick={() => props.onClick(props.num)}>
            {candidateView}
        </button>
    )
}

const isShiftKeyEvent = (e: KeyboardEvent) => {
    return e.key === "Shift" || e.key === "ShiftLeft" || e.key === "ShiftRight";
}


const Numpad = () => {
    const { gamedata, dispatch } = useContext(GameContext);
    const [useCandidatesNumpad, setUseCandidatesNumpad] = useState(false); //unused for now

    useEffect(() => {

        const onKeyDown = (e: KeyboardEvent) => {
            if (isShiftKeyEvent(e)) {
                setUseCandidatesNumpad(true);
            }
        }
        const onKeyUp = (e: KeyboardEvent) => {
            if (isShiftKeyEvent(e)) {
                setUseCandidatesNumpad(false);
            }
        }

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        }
    }, []);



    const numberCount = countNumber(gamedata.currentGameState);

    const numpad = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleClickCell = (num: number) => {
        dispatch({ type: Actions.setCellValue, payload: num })
    }
    const handleClickCandidate = (num: number) => {
        dispatch({ type: Actions.toggleCandidate, payload: num })
    }

    return (
        <div className="numpad">
            {!useCandidatesNumpad && numpad.map((num, index) => (
                <NumberButton key={num} count={numberCount[index]} num={num} onClick={handleClickCell} />
            ))}
            {useCandidatesNumpad && numpad.map((num) => (
                <CandidateButton key={num} num={num} onClick={handleClickCandidate} />
            ))}
        </div>
    )
}

export default Numpad;
