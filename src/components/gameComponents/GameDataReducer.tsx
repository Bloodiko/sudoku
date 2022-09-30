import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";
import { Actions, ReducerAction } from "../../types/GameDataReducerType";


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

export const init = (game: Sudoku) => {
    return {
        generatedGame: game,
        currentGameState: game.puzzle.split(''),
        selectedCell: null,
        candidates: candidatesArray,
        lastMoves: [],
    } as GameData
}

const confirmNumber = (value: number) => {
    if (value < 1 || value > 9) {
        return false;
    }
    return true;
}


const gameDataReducer = (state: GameData, action: ReducerAction) => {
    switch (action.type) {
        case Actions.selectCell:
            return {
                ...state,
                selectedCell: action.payload
            }
        case Actions.setCellValue:
            if (!state.selectedCell) {
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
                if (!confirmNumber(action.payload)) {
                    return state;
                }
                const newGameState = [...state.currentGameState];
                newGameState[state.selectedCell] = action.payload.toString();
                return {
                    ...state,
                    currentGameState: newGameState
                }
            }

        case Actions.newGame:
            return init(action.payload)

        default:
            return state;
    }
}

export default gameDataReducer;


