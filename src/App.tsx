import { useContext } from "react";
import Difficulty from "./components/Difficulty";
import Game from "./components/Game";
import Menu from "./components/Menu";
import Scoreboard from "./components/Scoreboard";
import Settings from "./components/Settings";
import { StatusContext } from "./components/statusContext";
import status from './components/statusEnum';


function App() {

    const { appStatus } = useContext(StatusContext);

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
        <div>
            <h1>App</h1>
            {getCurrenView(appStatus)}
        </div>
    );
}

export default App;