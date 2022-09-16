import './App.css';

import { StatusContext, StatusProvider } from "./components/statusContext";
import { useContext } from "react";
import status from './components/statusEnum';

function App() {

  const { appStatus } = useContext(StatusContext);

  const getCurrenView = (appStatus: status) => {

  }

  return (
    <div className="App">
      <StatusProvider>

      </StatusProvider>

    </div>
  );
}

export default App;
