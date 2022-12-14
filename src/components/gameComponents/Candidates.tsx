import { useContext } from "react";
import { GameContext } from "./GameContext";

const Candidates = (props: candidateProps) => {

    const { gamedata } = useContext(GameContext);

    const candidateErrors = gamedata.errorCandidates[props.cell] || [];

    return (
        <>
            <div className="cellCandidatesWrapper">
                <div className={"canCell " + (candidateErrors.includes(1) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].one ? '1' : ''}</div>
                <div className={"canCell " + (candidateErrors.includes(2) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].two ? '2' : ''}</div>
                <div className={"canCell " + (candidateErrors.includes(3) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].three ? '3' : ''}</div>
                <div className={"canCell " + (candidateErrors.includes(4) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].four ? '4' : ''}</div>
                <div className={"canCell " + (candidateErrors.includes(5) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].five ? '5' : ''}</div>
                <div className={"canCell " + (candidateErrors.includes(6) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].six ? '6' : ''}</div>
                <div className={"canCell " + (candidateErrors.includes(7) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].seven ? '7' : ''}</div>
                <div className={"canCell " + (candidateErrors.includes(8) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].eight ? '8' : ''}</div>
                <div className={"canCell " + (candidateErrors.includes(9) ? 'isCandidateError' : '')}>{gamedata.candidates[props.cell].nine ? '9' : ''}</div>
            </div>
        </>
    )
}

export default Candidates