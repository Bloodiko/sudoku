import { Sudoku } from "sudoku-gen/dist/types/sudoku.type"

enum Actions {
    selectCell,
    setCellValue,
    toggleCandidate,
    appendLastMove,
    updateLastMoves,
    newGame,
}

type SelectCellAction = {
    type: Actions.selectCell,
    payload: number
}

type SetCellValueAction = {
    type: Actions.setCellValue,
    payload: number
}

type ToggleCandidateAction = {
    type: Actions.toggleCandidate,
    payload: number
}

type NewGameAction = {
    type: Actions.newGame,
    payload: Sudoku
}

type ReducerAction = SelectCellAction | SetCellValueAction | NewGameAction | ToggleCandidateAction;

export type { ReducerAction };
export { Actions };