import './PreApp.css';

import { StatusProvider } from "./components/statusContext";
import App from "./App";


function PreApp() {

  return (
    <div className="PreApp">
      <StatusProvider>
        <App />
      </StatusProvider>

    </div>
  );
}

export default PreApp;
