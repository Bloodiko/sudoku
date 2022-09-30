import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";
import { Actions, ReducerAction } from "../../types/GameDataReducerType";


export const init = (game: Sudoku) => {
    return {
        generatedGame: game,
        currentGameState: game.puzzle.split(''),
        selectedCell: null,
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


