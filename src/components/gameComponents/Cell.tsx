import { useContext } from "react";
import Candidates from "./Candidates";
import { GameContext } from "./GameContext";

import { Actions } from "../../types/GameDataReducerType";

const Cell = (props: cellProps) => {
  // use game context
  const { gamedata, dispatch } = useContext(GameContext);
  const value = gamedata.currentGameState[props.cell];

  const classes = [
    `cell`,
    `row${props.row}`,
    `col${props.col}`,
    `cube${props.cube}`,
    props.locked ? "locked" : "",
    gamedata.selectedCell === props.cell ? "selected" : "",
  ]
    .filter((entry) => entry.length > 0)
    .join(` `);

  const onClick = () => {
    if (!props.locked) {
      dispatch({ type: Actions.selectCell, payload: props.cell });
    }
  };

  return (
    <div className={classes} onClick={onClick}>
      {value !== "-" ? <span>{value}</span> : <Candidates cell={props.cell} />}
    </div>
  );
};

export default Cell;
