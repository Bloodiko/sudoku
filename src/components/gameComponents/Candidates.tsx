import { useContext } from "react";
import { GameContext } from "./GameContext";

const candidatesObj: candidates = {
    'one': false,
    'two': false,
    'three': false,
    'four': false,
    'five': false,
    'six': false,
    'seven': false,
    'eight': false,
    'nine': false,
};

const Candidates = (props: candidateProps) => {

    const { gamedata } = useContext(GameContext);

    const candidateErrors = gamedata.errorCandidates ? gamedata.errorCandidates[props.cell] || { ...candidatesObj } : { ...candidatesObj };

    return (
        <>
            <div className="cellCandidatesWrapper">
                <div className={"canCell " + candidateErrors.one ? 'candidateError' : ''}>{gamedata.candidates[props.cell].one ? '1' : ''}</div>
                <div className={"canCell " + candidateErrors.two ? 'candidateError' : ''}>{gamedata.candidates[props.cell].two ? '2' : ''}</div>
                <div className={"canCell " + candidateErrors.three ? 'candidateError' : ''}>{gamedata.candidates[props.cell].three ? '3' : ''}</div>
                <div className={"canCell " + candidateErrors.four ? 'candidateError' : ''}>{gamedata.candidates[props.cell].four ? '4' : ''}</div>
                <div className={"canCell " + candidateErrors.five ? 'candidateError' : ''}>{gamedata.candidates[props.cell].five ? '5' : ''}</div>
                <div className={"canCell " + candidateErrors.six ? 'candidateError' : ''}>{gamedata.candidates[props.cell].six ? '6' : ''}</div>
                <div className={"canCell " + candidateErrors.seven ? 'candidateError' : ''}>{gamedata.candidates[props.cell].seven ? '7' : ''}</div>
                <div className={"canCell " + candidateErrors.eight ? 'candidateError' : ''}>{gamedata.candidates[props.cell].eight ? '8' : ''}</div>
                <div className={"canCell " + candidateErrors.nine ? 'candidateError' : ''}>{gamedata.candidates[props.cell].nine ? '9' : ''}</div>
            </div>
        </>
    )
}

export default Candidates