const Candidates = (props: candidateProps) => {
    return (
        <>
            <div className="candidateRow">
                <div className="canCell">{props.candidates[1] ? '1' : ' '}</div>
                <div className="canCell">{props.candidates[2] ? '2' : ' '}</div>
                <div className="canCell">{props.candidates[3] ? '3' : ' '}</div>
            </div>
            <div className="candidateRow">
                <div className="canCell">{props.candidates[4] ? '4' : ' '}</div>
                <div className="canCell">{props.candidates[5] ? '5' : ' '}</div>
                <div className="canCell">{props.candidates[6] ? '6' : ' '}</div>
            </div>
            <div className="candidateRow">
                <div className="canCell">{props.candidates[7] ? '7' : ' '}</div>
                <div className="canCell">{props.candidates[8] ? '8' : ' '}</div>
                <div className="canCell">{props.candidates[9] ? '9' : ' '}</div>
            </div>
        </>
    )
}

export default Candidates