import { rowCells, columnCells, cubeCells } from "./cellMapping";

type toCheckArray = cell[]
type cell = { value: string, cellnumber: number }

const validate = (toCheck: toCheckArray) => { // row, column or box
    let tmp: { [key: string]: cell } = {};
    let invalidCells: number[] = [];

    for (let i = 0; i < toCheck.length; i++) {
        const element = toCheck[i];
        if (element.value === "-") {
            continue;
        }
        if (tmp[element.value] === undefined) {
            tmp[element.value] = element;
        }
        else {
            invalidCells.push(tmp[element.value].cellnumber);
            invalidCells.push(element.cellnumber);
        }
    }
    return invalidCells;
}

const findInvalidCells = (currentGameState: string[]) => {
    // return invalid cell numbers
    let invalidCells: number[] = [];

    // check rows
    for (let i = 0; i < rowCells.length; i++) {
        const row = rowCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < row.length; j++) {
            const cellnumber = row[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber });
        }
        invalidCells = invalidCells.concat(validate(toCheck));
    }

    // check columns
    for (let i = 0; i < columnCells.length; i++) {
        const column = columnCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < column.length; j++) {
            const cellnumber = column[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber });
        }
        invalidCells = invalidCells.concat(validate(toCheck));
    }

    // check cubes
    for (let i = 0; i < cubeCells.length; i++) {
        const cube = cubeCells[i];
        let toCheck: toCheckArray = [];
        for (let j = 0; j < cube.length; j++) {
            const cellnumber = cube[j];
            toCheck.push({ value: currentGameState[cellnumber], cellnumber });
        }
        invalidCells = invalidCells.concat(validate(toCheck));
    }
    return invalidCells;
}

export default findInvalidCells;