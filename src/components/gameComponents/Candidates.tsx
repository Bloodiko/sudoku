const Candidates = (props: candidateProps) => {
    return (
        <>
            <div className="candidateRow">
                <div className="canCell">{props.candidates.one ? '1' : ' '}</div>
                <div className="canCell">{props.candidates.two ? '2' : ' '}</div>
                <div className="canCell">{props.candidates.three ? '3' : ' '}</div>
            </div>
            <div className="candidateRow">
                <div className="canCell">{props.candidates.four ? '4' : ' '}</div>
                <div className="canCell">{props.candidates.five ? '5' : ' '}</div>
                <div className="canCell">{props.candidates.six ? '6' : ' '}</div>
            </div>
            <div className="candidateRow">
                <div className="canCell">{props.candidates.seven ? '7' : ' '}</div>
                <div className="canCell">{props.candidates.eight ? '8' : ' '}</div>
                <div className="canCell">{props.candidates.nine ? '9' : ' '}</div>
            </div>
        </>
    )
}

export default Candidates