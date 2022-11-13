
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import { GameProvider } from './GameContext';
import GameBoard from './GameBoard';
import Numpad from './Numpad';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from './GameContext';
import { Actions } from '../../types/GameDataReducerType';
import { communicationContext } from '../ComRefContext';
import Timer from './Timer';
import EventHandler from '../EventHandler';

interface GameBoardWrapperProps {
    game: Sudoku;
    loadRunningGame: boolean;
}


const saveGame = (gamedata: GameData) => {
    localStorage.setItem("currentGameData", JSON.stringify(gamedata));
    localStorage.setItem("gameRunning", "true");
}

const SaveGameButton = () => {
    const { gamedata } = useContext(GameContext);
    const { current } = useContext(communicationContext);

    useEffect(() => {

        const callSaveGame = () => {
            saveGame(gamedata);
        }
        window.addEventListener("beforeunload", callSaveGame);
        current.comFunctions.register("saveGame", callSaveGame);

        return () => {
            window.removeEventListener("beforeunload", callSaveGame);
            current.comFunctions.unregister("saveGame");
        }
    }, [gamedata, current.comFunctions])

    return (
        <button className='SaveGameButton' onClick={() => saveGame(gamedata)}>Save Game</button>
    )
}

const LoadGameButton = (props: { loadRunningGame: boolean }) => {
    // loadRunningGame is only for auto loading
    const { dispatch } = useContext(GameContext);

    // state to keep track of when the game was loaded last
    const [loadRunningGame, setLoadRunningGame] = useState(props.loadRunningGame);

    const loadGame = useCallback(() => {
        const gameData = JSON.parse(localStorage.getItem("currentGameData") || "{}");
        dispatch({ type: Actions.loadGame, payload: gameData });
        setLoadRunningGame(false);
        // at this point game is loaded. This is to prevent the game from being loaded again when the component rerenders unless the user clicks the button again
    }, [dispatch])

    useEffect(() => {
        if (loadRunningGame) {
            loadGame();
        }

    }, [loadGame, loadRunningGame])

    return (
        <button className='LoadGameButton' onClick={loadGame}>Load Game</button>
    )
}


const GameBoardWrapper = (props: GameBoardWrapperProps) => {
    const [paused, setPaused] = useState(false);

    const { current } = useContext(communicationContext);

    useEffect(() => {
        const callPause = (e: any) => {
            console.log(e)
            setPaused(true);
        }
        const callResume = () => {
            setPaused(false);
        }
        current.comFunctions.register("pause", callPause);
        current.comFunctions.register("resume", callResume);

        return () => {
            current.comFunctions.unregister("pause");
            current.comFunctions.unregister("resume");
        }
    }, [current.comFunctions])


    return (
        <GameProvider game={props.game}>
            <EventHandler id="PauseHandler" eventlist={[{ name: "PauseGame", callback: () => setPaused(true) }, { name: "ResumeGame", callback: () => setPaused(false) }]} />
            <div className='gameActions'>
                <SaveGameButton />&nbsp;
                <LoadGameButton loadRunningGame={props.loadRunningGame} />
                <br />
                <Timer paused={paused} />
            </div>
            <GameBoard paused={paused} game={props.game} />
            <Numpad />
        </GameProvider>
    )
}

export default GameBoardWrapper
