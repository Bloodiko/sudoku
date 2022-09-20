import Candidates from "./Candidates"

const Cell = (props: cellProps) => {

    return (
        <div className={'cell ' + (props.locked ? ' locked' : '')}>
            { }
        </div>
    )
}

export default Cell