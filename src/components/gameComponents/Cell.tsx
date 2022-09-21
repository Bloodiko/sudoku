import { useState } from "react";
import Candidates from "./Candidates";

const Cell = (props: cellProps) => {

    const [cellValue, setCellValue] = useState(props.value);

    const classes = "cell " + (props.locked ? "locked" : "editable") + " row" + props.row + " col" + props.col + " cube" + props.cube;

    return (
        <div className={classes}>
            {
                cellValue !== "-" ? cellValue : <Candidates cell={props.cell} />
            }
        </div>
    )
}

export default Cell