import React, { useCallback } from "react";
import { useState, useEffect, useContext } from 'react';
import { communicationContext } from "../ComRefContext";

const getTimeString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}


const Timer = (props: { paused: Boolean }) => {
    const [gametime, setGameTime] = useState(0);
    const { current } = useContext(communicationContext);

    const intervalRef = React.useRef<number | null>(null);

    const initInterval = useCallback(() => {
        intervalRef.current = window.setInterval(() => {
            setGameTime((currentGameTime) => currentGameTime + 1);
        }, 1000);
    }, [])

    const removeInterval = useCallback(() => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [])

    const startTimer = () => {
        console.log("start timer");
        initInterval();
        current.comFunctions.call("resume");
    }

    const stopTimer = () => {
        console.log("stop timer");
        if (intervalRef.current !== null) {
            removeInterval();
            intervalRef.current = null;
            current.comFunctions.call("pause");
        }
    }

    useEffect(() => {
        initInterval();
        return () => {
            removeInterval();
        }
    }, [initInterval, removeInterval])

    const toggleTimer = () => {
        if (intervalRef.current === null) {
            startTimer();
        } else {
            stopTimer();
        }
    }

    useEffect(() => {

        function getTime() {
            let time;
            setGameTime((currentGameTime) => {
                console.log("currentGameTime ", currentGameTime);
                time = currentGameTime;
                return currentGameTime;
            }
            );

            console.log("time: ", time);
            return time;
        }

        function loadTime() {
            const time = localStorage.getItem("currentGameTime");
            if (time) {
                setGameTime(parseInt(time));
            }
        }

        function saveTime() {
            const time = current.comFunctions.callWithReturn("getCurrentTime");
            if (time) {
                localStorage.setItem("currentGameTime", time.toString());
            }
        }

        // register getter for current time
        current.comFunctions.register("getCurrentTime", getTime);
        current.comFunctions.register("loadTime", loadTime);
        current.comFunctions.register("saveTime", saveTime);

        return () => {
            current.comFunctions.unregister("getCurrentTime");
            current.comFunctions.unregister("loadTime");
            current.comFunctions.unregister("saveTime");
        }
    }, [current.comFunctions])



    return (
        <div className='Timer'>
            {getTimeString(gametime)}&nbsp;
            {/* Pause Button */}
            <button onClick={() => { toggleTimer() }}>{!props.paused ? "Pause" : "Resume"}</button>
        </div>
    )
};

export default Timer;
