import { Sudoku } from "sudoku-gen/dist/types/sudoku.type"

enum Actions {
    selectCell,
    setCellValue,
    toggleCandidate,
    fillCandidates,
    appendLastMove,
    updateLastMoves,
    newGame,
    loadGame,
    closeOverlay,
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
type LoadGameAction = {
    type: Actions.loadGame,
    payload: GameData
}

type CloseOverlayAction = {
    type: Actions.closeOverlay,
}

type FillCandidatesAction = {
    type: Actions.fillCandidates,
}

type ReducerAction =
    SelectCellAction |
    SetCellValueAction |
    NewGameAction |
    LoadGameAction |
    ToggleCandidateAction |
    CloseOverlayAction |
    FillCandidatesAction;

export type { ReducerAction };
export { Actions };