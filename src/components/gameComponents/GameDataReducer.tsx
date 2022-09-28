
const gameDataReducer = (state: GameData, action: any) => {
    switch (action.type) {
        case 'selectCell':
            return { ...state, selectedCell: action.payload };
        case 'updateGameState':
            return { ...state, currentGameState: action.payload };
        case 'updateLastMoves':
            return { ...state, lastMoves: action.payload };
        default:
            return state;
    }
}

export default gameDataReducer;