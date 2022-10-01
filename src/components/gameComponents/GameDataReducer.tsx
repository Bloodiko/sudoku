import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";
import { Actions, ReducerAction } from "../../types/GameDataReducerType";


let candidatesObj: candidates = {
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

const candidateOptions = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']; // zero included to match the index of the candidate




export const init = (game: Sudoku) => {
    console.log("init game data");

    // neccessary, otherwise the candidates are references to the same object
    let candidatesArray = new Array(81).fill(null);

    for (let i = 0; i < 81; i++) {
        candidatesArray[i] = { ...candidatesObj };
    }



    return {
        generatedGame: game,
        currentGameState: game.puzzle.split(''),
        selectedCell: null,
        candidates: candidatesArray,
        lastMoves: [],
    } as GameData
}

const isValidNumber = (value: number) => {
    if (value < 1 || value > 9) {
        return false;
    }
    return true;
}


const gameDataReducer = (state: GameData, action: ReducerAction) => {
    console.log("run dispatch");
    switch (action.type) {
        case Actions.selectCell:
            return {
                ...state,
                selectedCell: action.payload
            }
        case Actions.setCellValue:

            if (state.selectedCell === null) {
                console.log("nothing selected, aborting")
                return state;
            }

            if (action.payload === -1) {
                // backspace
                const newGameState = [...state.currentGameState];
                newGameState[state.selectedCell] = "-";
                return {
                    ...state,
                    currentGameState: newGameState
                }
            }
            else {
                if (!isValidNumber(action.payload)) {
                    return state;
                }
                const newGameState = [...state.currentGameState];
                newGameState[state.selectedCell] = action.payload.toString();
                return {
                    ...state,
                    currentGameState: newGameState,
                    selectedCell: null
                }
            }

        case Actions.toggleCandidate:
            if (state.selectedCell === null) {
                console.log("nothing selected, aborting")
                return state;
            }
            return {
                ...state,
                candidates: {
                    ...state.candidates,
                    [state.selectedCell]: {
                        ...state.candidates[state.selectedCell],
                        [candidateOptions[action.payload]]: !state.candidates[state.selectedCell][candidateOptions[action.payload]]
                    }
                }
            }

        case Actions.newGame:
            return init(action.payload)

        default:
            return state;
    }
}

export default gameDataReducer;


