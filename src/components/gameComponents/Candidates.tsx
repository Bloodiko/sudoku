import { useContext } from "react";
import { CandidatesContext } from "./CandidatesContext";

const Candidates = (props: candidateProps) => {

    const { candidates, dispatch } = useContext(CandidatesContext);

    return (
        <>
            <div className="candidateRow">
                <div className="canCell">{candidates[props.cell].one ? '1' : ' '}</div>
                <div className="canCell">{candidates[props.cell].two ? '2' : ' '}</div>
                <div className="canCell">{candidates[props.cell].three ? '3' : ' '}</div>
            </div>
            <div className="candidateRow">
                <div className="canCell">{candidates[props.cell].four ? '4' : ' '}</div>
                <div className="canCell">{candidates[props.cell].five ? '5' : ' '}</div>
                <div className="canCell">{candidates[props.cell].six ? '6' : ' '}</div>
            </div>
            <div className="candidateRow">
                <div className="canCell">{candidates[props.cell].seven ? '7' : ' '}</div>
                <div className="canCell">{candidates[props.cell].eight ? '8' : ' '}</div>
                <div className="canCell">{candidates[props.cell].nine ? '9' : ' '}</div>
            </div>
        </>
    )
}

export default Candidates