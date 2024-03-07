import React from 'react';
import { ALGORITHM, HEURISTIC_FUNCTIONS } from '../algorithm/algorithmHelper';

import "./BoardControls.scss";

import GRID_1 from '../data/GRID_1';
import GRID_2 from '../data/GRID_2';
import GRID_3 from '../data/GRID_3';
import GRID_4 from '../data/GRID_4';
import GRID_5 from '../data/GRID_5';
import GRID_6 from '../data/GRID_6';

const BoardControls = (props) => {

  const canvasRef = props.canvasRef;

  const clearCanvas = () => {
    canvasRef.current.getContext('2d').clearRect(0, 0, props.gridCellSize * props.GRID[0].length, props.gridCellSize * props.GRID.length);
  }

  const updateGrid = (grid) => {
    props.setGRID(grid);
    clearBoard(grid);
  }

  const clearBoard = (grid = props.GRID) => {
    clearCanvas();
    props.setStepsResult(null);
    props.setCostResult(null)
    props.setOpenNodesResult(null)
    props.setClosedNodesResult(null)
    props.initBoard(grid);
  }

  const updateHeuristic = (heuristic) => {
    props.setHeuristic(heuristic);
    clearBoard();
  };

  const updateAlgorithm = (algo) => {
    props.setAlgorithm(algo);
    clearBoard();
  }

  return (
    <aside className="board-controls">
      <div>
        <h3>Algorithm: {props.algorithm}</h3>
        <button onClick={() => updateAlgorithm(ALGORITHM.DEPTH_FIRST_SEARCH)}>Depth-first search</button>
        <button onClick={() => updateAlgorithm(ALGORITHM.A_STAR)}>A*</button>
      </div>
      <div>
        <h3>Delay:</h3>
        <input value={props.delay} onChange={(e) => props.setDelay(parseInt(e.target.value))} type="number" />
      </div>
      <div>
        <h3>Grid</h3>
        <button onClick={() => updateGrid(GRID_1)}>GRID 1</button>
        <button onClick={() => updateGrid(GRID_2)}>GRID 2</button>
        <button onClick={() => updateGrid(GRID_3)}>GRID 3</button>
        <button onClick={() => updateGrid(GRID_4)}>GRID 4</button>
        <button onClick={() => updateGrid(GRID_5)}>GRID 5</button>
        <button onClick={() => updateGrid(GRID_6)}>GRID 6</button>
      </div>
      {props.algorithm === ALGORITHM.A_STAR ?
        <div>
          <h3>Heuristic function: {props.heuristic}</h3>
          <button onClick={() => updateHeuristic((HEURISTIC_FUNCTIONS.NONE))}>None</button>
          <button onClick={() => updateHeuristic(HEURISTIC_FUNCTIONS.EUCLIDEAN)}>Euclidean</button>
          <button onClick={() => updateHeuristic(HEURISTIC_FUNCTIONS.MANHATTAN)}>Manhattan</button>
        </div> : false}
      <div>
        <h3>Result:</h3>
        {props.algorithm === ALGORITHM.A_STAR ?
          <table>
            <thead>
            <tr>
              <th rowSpan="2"><span>STEPS</span></th>
              <th rowSpan="2">COST</th>
              <th colSpan="3">NODES</th>
            </tr>
            <tr>
              <th>Still open</th>
              <th>Closed</th>
              <th>Total explored</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{props.stepsResult}</td>
              <td>{props.costResult}</td>
              <td>{props.openNodesResult}</td>
              <td>{props.closedNodesResult}</td>
              <td>{props.openNodesResult + props.closedNodesResult}</td>
            </tr>
            </tbody>
          </table>
          :
          <table>
            <thead>
              <tr>
                <th><span>STEPS</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.stepsResult}</td>
              </tr>
            </tbody>
          </table>
        }
      </div>
    </aside>
  );
}

export default BoardControls;

