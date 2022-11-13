import React from "react";
import { useState, useEffect } from 'react';

const getTimeString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}


const Timer = (props: { paused: Boolean }) => {
    const [gametime, setGameTime] = useState(0);


    const intervalRef = React.useRef<number | null>(null);

    const startTimer = () => {
        console.log("start timer");
        intervalRef.current = window.setInterval(() => {
            setGameTime((prevTime) => prevTime + 1);
        }, 1000);
        //document.dispatchEvent(new CustomEvent("ResumeGame")); // Not Clean - All events should be sended where they are needed
        document.getElementById("PauseHandler")?.dispatchEvent(new CustomEvent("ResumeGame"));

    }

    const stopTimer = () => {
        console.log("stop timer");
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            //document.dispatchEvent(new CustomEvent("PauseGame")); // Not Clean - All events should be sended where they are needed
            document.getElementById("PauseHandler")?.dispatchEvent(new CustomEvent("PauseGame"));
        }
    }

    useEffect(() => {
        startTimer();
        return () => {
            stopTimer();
        }
    }, [])

    const toggleTimer = () => {
        if (intervalRef.current === null) {
            startTimer();
        } else {
            stopTimer();
        }
    }


    return (
        <div className='Timer'>
            {getTimeString(gametime)}
            {/* Pause Button */}
            <button onClick={() => { toggleTimer() }}>{!props.paused ? "Pause" : "Resume"}</button>
        </div>
    )
};

export default Timer;
