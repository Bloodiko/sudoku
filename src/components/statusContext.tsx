// status Context

import React from "react";
import { useState } from "react";
import status from "./statusEnum";

interface IStatusProps {
    children?: React.ReactNode;
}

const StatusContext = React.createContext({ appStatus: status.MENU, setAppStatus: (status: status) => { } });

const StatusProvider = (props: IStatusProps) => {
    const [appStatus, setAppStatus] = useState(status.MENU);

    return (
        <StatusContext.Provider value={{ appStatus, setAppStatus }}>
            {props.children}
        </StatusContext.Provider>
    );
}

export { StatusContext, StatusProvider };


