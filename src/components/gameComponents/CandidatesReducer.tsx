// Candidates Reducer

interface CandidatesAction {
    type: string;
    payload: any;
}

const switchCandidate = (state: candidates[], payload: { candidate: string, cell: number }) => {

    const newState = [...state];
    newState[payload.cell][payload.candidate] = !newState[payload.cell][payload.candidate];
    return newState;

}

const candidatesReducer = (state: candidates[], action: CandidatesAction) => {
    switch (action.type) {
        case 'switchCandidate':
            return switchCandidate(state, action.payload);
        default:
            return state;
    }
}

export default candidatesReducer;