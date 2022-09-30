import { useContext } from "react";
import Candidates from "./Candidates";
import { GameContext } from "./GameContext";

import { Actions } from "../../types/GameDataReducerType";

const Cell = (props: cellProps) => {

    // use game context
    const { gamedata, dispatch } = useContext(GameContext);
    const value = gamedata.currentGameState[props.cell];

    const classes = "cell " + (props.locked ? "locked" : "editable") + " row" + props.row + " col" + props.col + " cube" + props.cube + (gamedata.selectedCell === props.cell ? " selected" : "");

    const onClick = () => {
        if (!props.locked) {
            dispatch({ type: Actions.selectCell, payload: props.cell })
        }
    }

    return (
        <div className={classes} onClick={onClick}>
            {
                value !== "-" ? value : <Candidates cell={props.cell} />
            }
        </div>
    )
}

export default Cell