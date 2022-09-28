import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";
import { Actions, ReducerAction } from "../../types/GameDataReducerType";


export const init = (game: Sudoku) => {
    return {
        generatedGame: game,
        currentGameState: game.puzzle,
        selectedCell: null,
        lastMoves: [],
    } as GameData
}


const gameDataReducer = (state: GameData, action: ReducerAction) => {
    switch (action.type) {
        case Actions.selectCell:
            return {
                ...state,
                selectedCell: action.payload
            }
        case Actions.setCellValue:
            return {
                ...state,
                selectedCell: action.payload
            }

        case Actions.newGame:
            return init(action.payload)

        default:
            return state;
    }
}

export default gameDataReducer;


