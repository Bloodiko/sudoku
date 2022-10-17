import { useContext } from "react";
import Difficulty from "./components/Difficulty";
import Game from "./components/Game";
import Menu from "./components/Menu";
import Scoreboard from "./components/Scoreboard";
import Settings from "./components/Settings";
import { StatusContext } from "./components/statusContext";
import { communicationContext } from "./components/ComRefContext";
import status from './components/statusEnum';


function App() {

    const { appStatus, setAppStatus } = useContext(StatusContext);
    const { current } = useContext(communicationContext);

    const getCurrenView = (appStatus: status) => {
        switch (appStatus) {
            case status.MENU:
                return <Menu />;
            case status.DIFFICULTY:
                return <Difficulty />;
            case status.GAME:
                return <Game />;
            case status.SCOREBOARD:
                return <Scoreboard />;
            case status.SETTINGS:
                return <Settings />;
            default:
                return <Menu />;
        }
    }

    return (
        <>
            {/* button back to menu, in-document for mobile & absolute for desktop */}
            {appStatus !== status.MENU && <button className="backToMenuButton" onClick={() => {
                current.comFunctions.call("saveGame", undefined);
                setAppStatus(status.MENU);
            }}>Back to menu</button>}
            {getCurrenView(appStatus)}
        </>
    );
}

export default App;