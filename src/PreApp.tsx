import './PreApp.css';

import { StatusProvider } from "./components/statusContext";
import { DifficultyProvider } from "./components/DifficultyContext";
import { CommunicationProvider } from './components/ComRefContext';
import App from "./App";


function PreApp() {

  return (
    <div className="PreApp">
      <StatusProvider>
        <DifficultyProvider>
          <CommunicationProvider>
            <App />
          </CommunicationProvider>
        </DifficultyProvider>
      </StatusProvider>

    </div>
  );
}

export default PreApp;
