export { }

declare global {

    type candidates = {
        1: bool,
        2: bool,
        3: bool,
        4: bool,
        5: bool,
        6: bool,
        7: bool,
        8: bool,
        9: bool
    }

    type cellProps = {
        value: string | undefined,
        candidates: candidates,
        locked: bool,
    }

    type candidateProps = {
        candidates: candidates,
    }
}