
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import { GameProvider } from './GameContext';
import GameBoard from './GameBoard';
import Numpad from './Numpad';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from './GameContext';
import { Actions } from '../../types/GameDataReducerType';
import { communicationContext } from '../ComRefContext';
import Timer from './Timer';

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

    const callSaveGame = useCallback(() => {
        current.comFunctions.call("saveTime");
        saveGame(gamedata);
    }, [current.comFunctions, gamedata]);

    useEffect(() => {

        window.addEventListener("beforeunload", callSaveGame);
        current.comFunctions.register("saveGame", callSaveGame);

        return () => {
            window.removeEventListener("beforeunload", callSaveGame);
            current.comFunctions.unregister("saveGame");
        }
    }, [current.comFunctions, callSaveGame])

    return (
        <button className='SaveGameButton' onClick={() => callSaveGame()}>Save Game</button>
    )
}

const LoadGameButton = (props: { loadRunningGame: boolean }) => {
    // loadRunningGame is only for auto loading
    const { dispatch } = useContext(GameContext);
    const { current } = useContext(communicationContext);

    // state to keep track of when the game was loaded last
    const [loadRunningGame, setLoadRunningGame] = useState(props.loadRunningGame);

    const loadGame = useCallback(() => {
        const gameData = localStorage.getItem("currentGameData");
        if (!gameData) {
            return;
        }
        current.comFunctions.call("loadTime");
        dispatch({ type: Actions.loadGame, payload: JSON.parse(gameData) });
        setLoadRunningGame(false);
        // at this point game is loaded. This is to prevent the game from being loaded again when the component rerenders unless the user clicks the button again
    }, [dispatch, current.comFunctions]);

    useEffect(() => {
        if (loadRunningGame) {
            loadGame();
        }

    }, [loadGame, loadRunningGame, current.comFunctions])

    return (
        <button className='LoadGameButton' onClick={loadGame}>Load Game</button>
    )
}

const DeselectButton = ({ paused }: { paused: boolean }) => {
    const { dispatch } = useContext(GameContext);

    const handleClick = () => {
        dispatch({ type: Actions.selectCell, payload: -1 })
    }

    useEffect(() => {
        paused && dispatch({ type: Actions.selectCell, payload: -1 });
    }, [paused, dispatch])

    return (
        <button className='DeselectButton' onClick={handleClick}>Deselect</button>
    )

}


const GameBoardWrapper = (props: GameBoardWrapperProps) => {
    console.log("GameBoardWrapper rerendered");
    const [paused, setPaused] = useState(false);

    const { current } = useContext(communicationContext);

    useEffect(() => {
        const callPause = () => {
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
            <div className='gameActions'>

                <Timer paused={paused} />
                <br />
                <SaveGameButton />&nbsp;
                <LoadGameButton loadRunningGame={props.loadRunningGame} />

            </div>
            <GameBoard paused={paused} game={props.game} />
            <Numpad />
            <DeselectButton paused={paused} />
        </GameProvider>
    )
}

export default GameBoardWrapper
