import { useCallback, useEffect, useState } from 'react';
import './timer.css'
const Themes = [
    "#e0eaf4",
    "#f5f5dc",
    "#d7f0db",
    "#fafafa"
]
const TimerStates = {
    RESET: 0,
    RUNNING: 1,
    STOP: 2
}

function Timer({ updateContentBg }) {
    const [themeId, setThemeId] = useState(0)
    const [nextThemeId, setNextThemeId] = useState(0)
    const [timerState, setTimerState] = useState(TimerStates.STOP)
    const [spacePressStartTime, setSpacePressStartTime] = useState()
    const [spacePressTimeout, setSpacePressTimeout] = useState()
    const [startTime,setStartTime] = useState()
    const [currenttTime,setCurrentTime] = useState()
    const [timerInterval,setTimerInterval] = useState()
    const [elapsedTime,setElapsedTime] = useState(0)
    
    // Timer related code
    const keydownHandler = useCallback((event) => {
        if (event.code === 'Space') {
            setSpacePressStartTime(Date.now());
            setSpacePressTimeout(setTimeout(() => {
                if (timerState === TimerStates.STOP) {
                    setTimerState(TimerStates.RESET)
                    console.log("RESET")
                }
            }, 1000))
        }
    }, [timerState]);

    const keyupHandler = useCallback((event) => {
        if (event.code === 'Space') {
            clearTimeout(spacePressTimeout);
            if (timerState === TimerStates.RESET) {
                setStartTime(Date.now())
                setTimerInterval(setInterval(() => {
                    setCurrentTime(Date.now())
                }, 100))
                setTimerState(TimerStates.RUNNING)
                console.log("STARTED")
            } else {
                if (Date.now() - spacePressStartTime < 500) {
                    setTimerState(TimerStates.STOP)
                    console.log("STOPPED")
                }
            }
        }
    }, [spacePressStartTime, spacePressTimeout, timerState]);

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
            document.removeEventListener('keyup', keyupHandler);
        };
    }, [keydownHandler, keyupHandler]);

    useEffect(()=>{
        if(timerState===TimerStates.RUNNING){
            setElapsedTime(Math.floor((currenttTime - startTime)/100))
        } else if(timerState===TimerStates.STOP){
            clearInterval(timerInterval)
        } else {
            setStartTime(0)
            setStartTime(0)
            setElapsedTime(-1)
        }
    },[currenttTime,timerInterval,startTime,timerState])

    const getElapsedTime = useCallback(() => {
        if(elapsedTime && elapsedTime>0){
            var value = elapsedTime
            const centiSec = value%10
            value = Math.floor(value/10)
            const sec = value % 60
            const min = Math.floor(value/60)
            if(min){
                return `${min}:${sec.toString().padStart(2,'0')}.${centiSec}`
            } else {
                return `${sec}.${centiSec}`
            }
        } else if(elapsedTime===-1){
            return "0.0"
        } else{
            return "-.-"
        }
    },[elapsedTime])

    // Theme related code 
    const handleThemeChange = () => {
        if (themeId === Themes.length - 1) {
            setThemeId(0)
        } else {
            setThemeId(themeId + 1)
        }
    }

    useEffect(() => {
        if (themeId === Themes.length - 1) {
            setNextThemeId(0)
        } else {
            setNextThemeId(themeId + 1)
        }
        updateContentBg(Themes[themeId])
    }, [updateContentBg, themeId])

    return (
        <div className="clickable-container">
            <div className="theme-icon" onClick={handleThemeChange} style={{ backgroundColor: Themes[nextThemeId] }}>T</div>
            <div className="timer-container">
                <div className="scramble">
                    R U R' U R U2 R' U' R U R' U R U2 R' U' R U R' U R U2 R' U'
                </div>
                <div className="timer-display">
                    {getElapsedTime()}
                </div>
            </div>
            <div className="info-icon" title="Click anywhere to start/stop the timer. Double-click to reset.">
                ℹ️
            </div>
        </div>
    );
}

export default Timer;