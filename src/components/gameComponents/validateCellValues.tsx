import { rowCells, columnCells, cubeCells } from "./cellMapping";

type toCheckArray = cell[]
type cell = { value: string, cellnumber: number, candidates: candidates }


/* 
    Gets an array of 9 cells to check and returns an array of invalid cells.
    since the check is always the same, we can use the same function for rows, columns and cubes.
*/
const validate = (toCheck: toCheckArray) => { // row, column or box
    let tmp: { [key: string]: cell } = {};
    let invalidCells: number[] = [];
    let invalidCandidates: { [key: number]: number[] } = {};

    for (let i = 0; i < toCheck.length; i++) {
        const element = toCheck[i];
        if (element.value === "-") {
            continue;
        }
        // passing the value as key to the object, if it already exists, we have a duplicate
        if (tmp[element.value] === undefined) {
            tmp[element.value] = element;
        }
        else {
            invalidCells.push(tmp[element.value].cellnumber);
            invalidCells.push(element.cellnumber);
        }
    }



    return [invalidCells, invalidCandidates];
}

function findInvalidCells(currentGameState: string[], candidates: candidates[]): [number[], errorCandidates] {
    // return invalid cell numbers
    let invalidCells: number[] = [];
    let invalidCandidates: { [key: number]: number[] } = {};

    // check rows
    for (let i = 0; i < rowCells.length; i++) {
        const row = rowCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < row.length; j++) {
            const cellnumber = row[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber, candidates: candidates[cellnumber] });
        }
        const [invalidRowCells, invalidRowCandidates] = validate(toCheck);
        invalidCells = [...invalidCells, ...invalidRowCells as number[]];
        invalidCandidates = { ...invalidCandidates, ...invalidRowCandidates as { [key: number]: number[] } };
    }

    // check columns
    for (let i = 0; i < columnCells.length; i++) {
        const column = columnCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < column.length; j++) {
            const cellnumber = column[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber, candidates: candidates[cellnumber] });
        }
        const [invalidRowCells, invalidRowCandidates] = validate(toCheck);
        invalidCells = [...invalidCells, ...invalidRowCells as number[]];
        invalidCandidates = { ...invalidCandidates, ...invalidRowCandidates as { [key: number]: number[] } };
    }

    // check cubes
    for (let i = 0; i < cubeCells.length; i++) {
        const cube = cubeCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < cube.length; j++) {
            const cellnumber = cube[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber, candidates: candidates[cellnumber] });
        }
        const [invalidRowCells, invalidRowCandidates] = validate(toCheck);
        invalidCells = [...invalidCells, ...invalidRowCells as number[]];
        invalidCandidates = { ...invalidCandidates, ...invalidRowCandidates as { [key: number]: number[] } };
    }
    return [invalidCells, invalidCandidates];
}

export default findInvalidCells;