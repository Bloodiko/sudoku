import './PreApp.css';

import { StatusProvider } from "./components/statusContext";
import { DifficultyProvider } from "./components/DifficultyContext";
import { CommunicationProvider } from './components/ComRefContext';
import BuyMeABeverage from './BuyMeABeverage';
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
      <BuyMeABeverage />
    </div>
  );
}

export default PreApp;
