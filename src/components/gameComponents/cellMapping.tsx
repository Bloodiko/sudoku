
type cellMap = { row: number, column: number, cube: number }



const generateCellMapping = () => {
    let cellMap: cellMap[] = [];

    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i / 9);
        const column = i % 9;
        const cube = Math.floor(row / 3) * 3 + Math.floor(column / 3);
        cellMap.push({ row, column, cube });
    }
    return cellMap;
}

const generateRowNumbers = () => {
    let rowNumbers: number[][] = [];
    for (let i = 0; i < 9; i++) {
        let row: number[] = [];
        for (let j = 0; j < 9; j++) {
            row.push(i * 9 + j);
        }
        rowNumbers.push(row);
    }
    return rowNumbers;
}

const generateColumnNumbers = () => {
    let columnNumbers: number[][] = [];
    for (let i = 0; i < 9; i++) {
        let column: number[] = [];
        for (let j = 0; j < 9; j++) {
            column.push(j * 9 + i);
        }
        columnNumbers.push(column);
    }
    return columnNumbers;

}

const generateCubeNumbers = () => {
    let cubeNumbers: number[][] = [];
    for (let i = 0; i < 9; i++) {
        let cube: number[] = [];
        for (let j = 0; j < 9; j++) {
            const row = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            const column = (i % 3) * 3 + (j % 3);
            cube.push(row * 9 + column);
        }
        cubeNumbers.push(cube);
    }
    return cubeNumbers;
}



const cellMapping: cellMap[] = generateCellMapping();
const rowCells: number[][] = generateRowNumbers();
const columnCells: number[][] = generateColumnNumbers();
const cubeCells: number[][] = generateCubeNumbers();


export { cellMapping, rowCells, columnCells, cubeCells };