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
    }

    type candidateProps = {
        candidates: candidates,
    }
}