import React from "react";

// CandidatesContext

// Context for the candidates of each cell


import { createContext, useReducer } from "react";
import candidatesReducer from "./CandidatesReducer";


const candidatesObj: candidates = {
    'one': false,
    'two': false,
    'three': false,
    'four': false,
    'five': false,
    'six': false,
    'seven': false,
    'eight': false,
    'nine': false,
};


const candidatesArray = new Array(81).fill({ ...candidatesObj }) as candidates[];

const CandidatesContext = createContext({ candidates: candidatesArray, dispatch: (action: any) => { } });

const CandidatesProvider = (props: any) => {
    const [candidates, dispatch] = useReducer(candidatesReducer, candidatesArray);

    return (
        <CandidatesContext.Provider value={{ candidates, dispatch }}>
            {props.children}
        </CandidatesContext.Provider>
    )
}

export { CandidatesContext, CandidatesProvider };