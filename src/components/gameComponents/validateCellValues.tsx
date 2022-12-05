import { rowCells, columnCells, cubeCells } from "./cellMapping";

type toCheckArray = cell[]
type cell = { value: string, cellnumber: number, candidates: candidates }

const candidateMap: { [key: string]: string } = {
    'one': "1",
    'two': "2",
    'three': "3",
    'four': "4",
    'five': "5",
    'six': "6",
    'seven': "7",
    'eight': "8",
    'nine': "9"
}


/* 
    Gets an array of 9 cells to check and returns an array of invalid cells.
    since the check is always the same, we can use the same function for rows, columns and cubes.
*/
function validate(toCheck: toCheckArray): [number[], errorCandidates] { // row, column or box
    let tmpCells: { [key: string]: cell } = {};
    let invalidCells: number[] = [];
    let invalidCandidates: errorCandidates = {};

    for (let i = 0; i < toCheck.length; i++) {
        const element = toCheck[i];
        if (element.value === "-") {
            continue;
        }
        // passing the value as key to the object, if it already exists, we have a duplicate
        if (tmpCells[element.value] === undefined) {
            tmpCells[element.value] = element;
        }
        else {
            invalidCells.push(tmpCells[element.value].cellnumber);
            invalidCells.push(element.cellnumber);
        }
    }
    // run again for candidate cecking

    for (let i = 0; i < toCheck.length; i++) {
        const element = toCheck[i];
        if (element.value === "-") {
            // check candidates
            Object.keys(element.candidates).forEach((key) => {
                if (element.candidates[key] && tmpCells[candidateMap[key]]) {
                    // Candidate <-> Value conflict
                    invalidCells.push(tmpCells[candidateMap[key]].cellnumber);
                    invalidCandidates[element.cellnumber] = [...invalidCandidates[element.cellnumber] || [], Number(candidateMap[key])];
                }
            });
        }
    }

    return [invalidCells, invalidCandidates];
}

function findInvalidCells(currentGameState: string[], candidates: candidates[]): [number[], errorCandidates] {
    // return invalid cell numbers
    const invalidCells: number[] = [];
    const invalidCandidates: errorCandidates = {};

    // check rows
    for (let i = 0; i < rowCells.length; i++) {
        const row = rowCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < row.length; j++) {
            const cellnumber = row[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber, candidates: candidates[cellnumber] });
        }
        const [invalidRowCells, invalidRowCandidates] = validate(toCheck);
        invalidRowCells.forEach((cellnumber) => {
            if (!invalidCells.includes(cellnumber)) {
                invalidCells.push(cellnumber);
            }
        });
        Object.keys(invalidRowCandidates).forEach((key) => {
            const cellnumber = Number(key);
            invalidCandidates[cellnumber] = [...invalidCandidates[cellnumber] || [], ...invalidRowCandidates[cellnumber]];
        });
    }

    // check columns
    for (let i = 0; i < columnCells.length; i++) {
        const column = columnCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < column.length; j++) {
            const cellnumber = column[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber, candidates: candidates[cellnumber] });
        }
        const [invalidColCells, invalidColCandidates] = validate(toCheck);
        invalidColCells.forEach((cellnumber) => {
            if (!invalidCells.includes(cellnumber)) {
                invalidCells.push(cellnumber);
            }
        });
        Object.keys(invalidColCandidates).forEach((key) => {
            const cellnumber = Number(key);
            invalidCandidates[cellnumber] = [...invalidCandidates[cellnumber] || [], ...invalidColCandidates[cellnumber]];
        });


    }

    // check cubes
    for (let i = 0; i < cubeCells.length; i++) {
        const cube = cubeCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < cube.length; j++) {
            const cellnumber = cube[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber, candidates: candidates[cellnumber] });
        }
        const [invalidCubeCells, invalidCubeCandidates] = validate(toCheck);
        invalidCubeCells.forEach((cellnumber) => {
            if (!invalidCells.includes(cellnumber)) {
                invalidCells.push(cellnumber);
            }
        }
        );
        Object.keys(invalidCubeCandidates).forEach((key) => {
            const cellnumber = Number(key);
            invalidCandidates[cellnumber] = [...invalidCandidates[cellnumber] || [], ...invalidCubeCandidates[cellnumber]];
        }
        );
    }
    return [invalidCells, invalidCandidates];
}

export default findInvalidCells;