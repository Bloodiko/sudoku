import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";
import { Actions, ReducerAction } from "../../types/GameDataReducerType";
import findInvalidCells from "./validateCellValues";
import highlightCells from "./highlightCellsOnSelect";
import { cellMapping, columnCells, cubeCells, rowCells } from "./cellMapping";


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

const reverseCandidatesObj = {
    'one': true,
    'two': true,
    'three': true,
    'four': true,
    'five': true,
    'six': true,
    'seven': true,
    'eight': true,
    'nine': true,
}

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
        completed: false,
        completedOverlay: false,
        highlightCells: [],
        errorCells: [],
        errorCandidates: {}
    } as GameData
}

const isValidNumber = (value: number) => {
    if (value < 1 || value > 9) {
        return false;
    }
    return true;
}

const checkCompleted = (gameState: string[], game: Sudoku) => {
    return gameState.join('') === game.solution ? true : false;

}

const openCell = (selectedCell: number, generatedGame: string, direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight", originalCell?: number): number => {
    const currentCell = selectedCell;
    let nextCell = currentCell;
    switch (direction) {
        case "ArrowUp":
            nextCell = currentCell - 9;
            break;
        case "ArrowDown":
            nextCell = currentCell + 9;
            break;
        case "ArrowLeft":
            nextCell = currentCell - 1;
            break;
        case "ArrowRight":
            nextCell = currentCell + 1;
            break;
    }
    if (nextCell < 0 || nextCell > 80) {
        return originalCell ? originalCell : currentCell;
    }
    if (generatedGame.charAt(nextCell) === '-') {
        return nextCell;
    } else {
        return openCell(nextCell, generatedGame, direction, originalCell ? originalCell : currentCell);
    }
}


const gameDataReducer = (state: GameData, action: ReducerAction) => {
    console.log("run dispatch with action: ", action.type);
    switch (action.type) {
        case Actions.selectCell:
            if (state.selectedCell === action.payload) {
                console.log("already selected");
                return state;
            }
            if (state.completed) {
                console.log("game completed");
                return state;
            }

            const newStateSelectCell = {
                ...state,
                highlightCells: highlightCells(action.payload),
                selectedCell: action.payload
            }

            return newStateSelectCell;

        case Actions.selectCellWithArrowKey:
            if (state.completed) {
                console.log("game completed");
                return state;
            }

            if (state.selectedCell === null) {
                //select first open cell
                const firstOpenCell = state.generatedGame.puzzle.indexOf('-');
                const newStateSelectCell = {
                    ...state,
                    highlightCells: highlightCells(firstOpenCell),
                    selectedCell: firstOpenCell
                }
                return newStateSelectCell;
            }

            const nextCell = openCell(state.selectedCell, state.generatedGame.puzzle, action.payload);
            const newStateSelectCellWithArrowKey = {
                ...state,
                highlightCells: highlightCells(nextCell),
                selectedCell: nextCell
            }
            return newStateSelectCellWithArrowKey;

        case Actions.setCellValue:

            if (state.selectedCell === null) {
                console.log("nothing selected, aborting")
                return state;
            }
            if (state.currentGameState[state.selectedCell] === action.payload.toString()) {
                console.log("same value, aborting")
                return state;
            }

            if (action.payload === -1) {
                if (state.currentGameState[state.selectedCell] === '-') {
                    console.log("nothing to delete")
                    return state;
                }
                // backspace
                const newGameState = [...state.currentGameState];
                newGameState[state.selectedCell] = "-";
                const [invalidCells, invalidCandidates] = findInvalidCells(newGameState, state.candidates);
                const newStateCellValue = {
                    ...state,
                    currentGameState: newGameState,
                    errorCells: invalidCells,
                    errorCandidates: invalidCandidates,
                }
                return newStateCellValue;
            }
            else {
                if (!isValidNumber(action.payload)) {
                    return state;
                }
                const newGameState = [...state.currentGameState];
                newGameState[state.selectedCell] = action.payload.toString();

                const completed = checkCompleted(newGameState, state.generatedGame);

                // check row, column, box for candidates that are not possible anymore
                const newCandidates = [...state.candidates];
                console.log(state.selectedCell)
                const row = cellMapping[state.selectedCell].row;
                const column = cellMapping[state.selectedCell].column;
                const cube = cellMapping[state.selectedCell].cube;

                for (let i = 0; i < 9; i++) {
                    newCandidates[rowCells[row][i]] = { ...newCandidates[rowCells[row][i]], [candidateOptions[action.payload]]: false };
                    newCandidates[columnCells[column][i]] = { ...newCandidates[columnCells[column][i]], [candidateOptions[action.payload]]: false };
                    newCandidates[cubeCells[cube][i]] = { ...newCandidates[cubeCells[cube][i]], [candidateOptions[action.payload]]: false };
                }

                const [invalidCells, invalidCandidates] = findInvalidCells(newGameState, newCandidates);

                const newStateCellValue = {
                    ...state,
                    currentGameState: newGameState,
                    completed: completed,
                    completedOverlay: completed,
                    candidates: newCandidates,
                    highlightCells: [],
                    errorCells: invalidCells,
                    errorCandidates: invalidCandidates
                }
                return newStateCellValue;
            }

        case Actions.toggleCandidate:
            if (state.selectedCell === null) {
                console.log("nothing selected, aborting")
                return state;
            }

            const newStateToggleCandidate = {
                ...state,
                candidates: [
                    ...state.candidates,
                ]
            }

            newStateToggleCandidate.candidates[state.selectedCell] = {
                ...newStateToggleCandidate.candidates[state.selectedCell],
                [candidateOptions[action.payload]]: !newStateToggleCandidate.candidates[state.selectedCell][candidateOptions[action.payload]]
            }

            const [invalidCells, invalidCandidates] = findInvalidCells(state.currentGameState, newStateToggleCandidate.candidates);

            newStateToggleCandidate.errorCells = invalidCells;
            newStateToggleCandidate.errorCandidates = invalidCandidates;


            return newStateToggleCandidate;

        case Actions.fillCandidates:

            let allTrueCandidates = new Array(81).fill(null);
            for (let i = 0; i < 81; i++) {
                allTrueCandidates[i] = { ...reverseCandidatesObj };
            }

            const [, invalidCandidatesFillCandidates] = findInvalidCells(state.currentGameState, allTrueCandidates);

            let newCandidates = new Array(81).fill(null);
            for (let i = 0; i < 81; i++) {
                newCandidates[i] = { ...candidatesObj };
                if (invalidCandidatesFillCandidates[i] !== undefined) {
                    invalidCandidatesFillCandidates[i].includes(1) ? newCandidates[i].one = false : newCandidates[i].one = true;
                    invalidCandidatesFillCandidates[i].includes(2) ? newCandidates[i].two = false : newCandidates[i].two = true;
                    invalidCandidatesFillCandidates[i].includes(3) ? newCandidates[i].three = false : newCandidates[i].three = true;
                    invalidCandidatesFillCandidates[i].includes(4) ? newCandidates[i].four = false : newCandidates[i].four = true;
                    invalidCandidatesFillCandidates[i].includes(5) ? newCandidates[i].five = false : newCandidates[i].five = true;
                    invalidCandidatesFillCandidates[i].includes(6) ? newCandidates[i].six = false : newCandidates[i].six = true;
                    invalidCandidatesFillCandidates[i].includes(7) ? newCandidates[i].seven = false : newCandidates[i].seven = true;
                    invalidCandidatesFillCandidates[i].includes(8) ? newCandidates[i].eight = false : newCandidates[i].eight = true;
                    invalidCandidatesFillCandidates[i].includes(9) ? newCandidates[i].nine = false : newCandidates[i].nine = true;
                }
            }

            const [invalidCellsFillCandidates, invalidCandidatesFillCandidates2] = findInvalidCells(state.currentGameState, newCandidates);

            const newStateFillCandidates = {
                ...state,
                candidates: newCandidates,
                errorCells: invalidCellsFillCandidates,
                errorCandidates: invalidCandidatesFillCandidates2
            }

            return newStateFillCandidates;


        case Actions.newGame:
            return init(action.payload)

        case Actions.loadGame:
            console.log("load game");
            return action.payload

        case Actions.closeOverlay:
            return {
                ...state,
                completedOverlay: false
            }

        default:
            return state;
    }
}

export default gameDataReducer;


