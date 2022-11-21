import React, { useCallback } from "react";
import { useEffect, useContext } from 'react';
import { communicationContext } from "../ComRefContext";
import { gametime, gametimeString } from "../../state/TimerState";
import { useStore } from "@nanostores/react";

const Timer = (props: { paused: Boolean }) => {

    const timeString = useStore(gametimeString);

    const { current } = useContext(communicationContext);

    const intervalRef = React.useRef<number | null>(null);

    const initInterval = useCallback(() => {
        intervalRef.current = window.setInterval(() => {
            gametime.set(gametime.get() + 1);
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
            return gametime.get();
        }

        function loadTime() {
            const time = localStorage.getItem("currentGameTime");
            if (time) {
                gametime.set(parseInt(time));
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
            {timeString}&nbsp;
            {/* Pause Button */}
            <button onClick={() => { toggleTimer() }}>{!props.paused ? "Pause" : "Resume"}</button>
        </div>
    )
};

export default Timer;
