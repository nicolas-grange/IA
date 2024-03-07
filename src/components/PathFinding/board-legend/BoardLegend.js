import React from 'react';

import "./BoardLegend.scss";
import { ALGORITHM, HEURISTIC_FUNCTIONS } from '../algorithm/algorithmHelper';

const BoardLegend = (props) => {

  return (
    <aside className="board-legend">
      <h3>Legend:</h3>
      <ul>
        <li className="start">Starting point</li>
        <li className="goal">Goal point</li>
        <li className="basic">Basic node</li>
        <li className="obstruction">Block</li>
        <li className="open">Open node</li>
        {props.algorithm === ALGORITHM.A_STAR ?
            <li className="close">Closed node</li>
           : false}
        <li className="path">Path</li>
      </ul>
    </aside>
  );
}

export default BoardLegend;

