import './PreApp.css';

import { StatusProvider } from "./components/statusContext";
import { DifficultyProvider } from "./components/DifficultyContext";
import App from "./App";


function PreApp() {

  return (
    <div className="PreApp">
      <StatusProvider>
        <DifficultyProvider>
          <App />
        </DifficultyProvider>
      </StatusProvider>

    </div>
  );
}

export default PreApp;
