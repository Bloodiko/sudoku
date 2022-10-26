export { }

declare global {

    interface candidates extends Record<string, boolean> {
        'one': boolean,
        'two': boolean,
        'three': boolean,
        'four': boolean,
        'five': boolean,
        'six': boolean,
        'seven': boolean,
        'eight': boolean,
        'nine': boolean,
    }

    type cellProps = {
        cell: number,
        locked: boolean,
        row: number,
        col: number,
        cube: number,
        value: string,
        highlighted: boolean,
        isError: boolean,
    }

    type candidateProps = {
        cell: number,
    }

    type GameData = {
        generatedGame: Sudoku;
        currentGameState: string[];
        selectedCell: number | null;
        candidates: candidates[];
        lastMoves: move[]; // temp, maybe TODO
        completed: boolean;
        completedOverlay: boolean;
        highlightCells: number[];
        errorCells: number[];

    };

    type move = {
        cell: number,
        value?: string,
        candidate?: string,
    }
}