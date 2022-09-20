import Candidates from "./Candidates"

const Cell = (props: cellProps) => {

    return (
        <div className={'cell ' + (props.locked ? ' locked' : '')}>
            {props.value ? <div className="cellValue">{props.value}</div> : <Candidates candidates={props.candidates} />}
        </div>
    )
}

export default Cell