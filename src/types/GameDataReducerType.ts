import { Sudoku } from "sudoku-gen/dist/types/sudoku.type"

enum Actions {
    selectCell,
    selectCellWithArrowKey,
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
    payload: number | null
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

type SelectCellWithArrowKeyAction = {
    type: Actions.selectCellWithArrowKey,
    payload: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
}

type ReducerAction =
    SelectCellAction |
    SelectCellWithArrowKeyAction |
    SetCellValueAction |
    NewGameAction |
    LoadGameAction |
    ToggleCandidateAction |
    CloseOverlayAction |
    FillCandidatesAction;

export type { ReducerAction };
export { Actions };