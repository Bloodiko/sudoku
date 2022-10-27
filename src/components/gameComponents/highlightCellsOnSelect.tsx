import { cellMapping, columnCells, cubeCells, rowCells } from "./cellMapping";



const highlightCells = (selectedCell: number | null) => {
    if (selectedCell === null) {
        return [];
    }

    const selectedCellMap = cellMapping[selectedCell];
    const selectedRow = rowCells[selectedCellMap.row];
    const selectedColumn = columnCells[selectedCellMap.column];
    const selectedCube = cubeCells[selectedCellMap.cube];
    return [...selectedRow, ...selectedColumn, ...selectedCube];
}

export default highlightCells;

