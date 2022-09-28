import { useContext } from "react";
import Candidates from "./Candidates";
import { GameContext } from "./GameContext";

const Cell = (props: cellProps) => {

    // use game context
    const { gamedata, dispatch } = useContext(GameContext);
    const value = gamedata.currentGameState[props.cell];

    const classes = "cell " + (props.locked ? "locked" : "editable") + " row" + props.row + " col" + props.col + " cube" + props.cube;

    return (
        <div className={classes}>
            {
                value !== "-" ? value : <Candidates cell={props.cell} />
            }
        </div>
    )
}

export default Cell