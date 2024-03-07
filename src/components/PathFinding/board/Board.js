import React, { useRef, useEffect, useState } from 'react';
import { fillRect, strokeRect } from '../utils';
import { HEURISTIC_FUNCTIONS, ALGORITHM } from '../algorithm/algorithmHelper';

import "./Board.scss";

import GRID_1 from '../data/GRID_1';
import BoardControls from '../board-controls/BoardControls';
import BoardLegend from '../board-legend/BoardLegend';
import { depthFirstSearch } from '../algorithm/depthFirstSearch';
import { aStar } from '../algorithm/aStar';

const GRID_CELL_SIZE = 20;

const Board = (props) => {
  const [algorithm, setAlgorithm] = useState(ALGORITHM.DEPTH_FIRST_SEARCH);
  const [GRID, setGRID] = useState(GRID_1);
  const [delay, setDelay] = useState(10);
  const [stepsResult, setStepsResult] = useState(null);
  const [costResult, setCostResult] = useState(null);
  const [openNodesResult, setOpenNodesResult] = useState(null);
  const [closedNodesResult, setClosedNodesResult] = useState(null);
  const [heuristic, setHeuristic] = useState(HEURISTIC_FUNCTIONS.MANHATTAN);

  const canvasRef = useRef(props.ref);

  const findPath = async () => {
    switch (algorithm) {
      case ALGORITHM.DEPTH_FIRST_SEARCH:
        const path = await depthFirstSearch(GRID, GRID_CELL_SIZE, canvasRef.current.getContext('2d'), delay);
        for (let i=0; i<path.length; i++) {
          const cellPath = path[ i ];
          if (!cellPath.start && !cellPath.goal) {
            fillRect(path[i].y * GRID_CELL_SIZE, path[i].x * GRID_CELL_SIZE,GRID_CELL_SIZE, GRID_CELL_SIZE,  "#E7D83A", canvasRef.current.getContext('2d'))
          }
        }
        setStepsResult(path.length-1);
        break;
      case ALGORITHM.A_STAR: {
        const { path, closedNodes, openNodes }  = await aStar(GRID, GRID_CELL_SIZE, heuristic, canvasRef.current.getContext('2d'), delay);
        for (let i = 0; i < path.length; i++) {
          const cellPath = path[ i ];
          if (!cellPath.start && !cellPath.goal) {
            fillRect(cellPath.y * GRID_CELL_SIZE, cellPath.x * GRID_CELL_SIZE, GRID_CELL_SIZE, GRID_CELL_SIZE, "#E7D83A", canvasRef.current.getContext('2d'))
          }
        }
        setStepsResult(path.length-1);
        setCostResult(path[path.length -1].f);
        setOpenNodesResult(openNodes);
        setClosedNodesResult(closedNodes);
        break;
      }
      default:
        console.error("No algorithm found!");
    }
  }

  const initBoard =  (grid) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath()
    for (let i = 0; i < grid.length; i++) {
      const currentRow = grid[ i ];
      for (let j = 0; j < currentRow.length; j++) {
        const currentCell = grid[ i ][ j ];
        switch (currentCell) {
          case "x":
            fillRect(j * GRID_CELL_SIZE, i * GRID_CELL_SIZE, GRID_CELL_SIZE, GRID_CELL_SIZE, "#000", ctx);
            break;
          case "s":
            fillRect(j * GRID_CELL_SIZE, i * GRID_CELL_SIZE, GRID_CELL_SIZE, GRID_CELL_SIZE, "#00FF00", ctx);
            break;
          case "g":
            fillRect(j * GRID_CELL_SIZE, i * GRID_CELL_SIZE, GRID_CELL_SIZE, GRID_CELL_SIZE, "#FF0000", ctx);
            break;
          case "1":
            strokeRect(j * GRID_CELL_SIZE, i * GRID_CELL_SIZE, GRID_CELL_SIZE, GRID_CELL_SIZE, "#000", ctx);
            break;
          default:
            fillRect(j * GRID_CELL_SIZE, i * GRID_CELL_SIZE, GRID_CELL_SIZE, GRID_CELL_SIZE, `rgba(50, 50, 50, ${parseInt(currentCell)/10})`, ctx);
            break;
        }
      }
    }
  }

  useEffect( () => initBoard(GRID), [])

  return (
    <div className="board-container">
      <BoardControls
        canvasRef = {canvasRef}
        GRID = {GRID}
        delay = {delay}
        heuristic = {heuristic}
        stepsResult = {stepsResult}
        closedNodesResult = {closedNodesResult}
        openNodesResult = {openNodesResult}
        costResult = {costResult}
        gridCellSize = {GRID_CELL_SIZE}
        algorithm = {algorithm}
        initBoard = {(grid) => initBoard(grid)}
        setGRID = {(grid) => setGRID(grid)}
        setDelay = {(delay) => setDelay(delay)}
        setStepsResult = {(steps) => setStepsResult(steps)}
        setCostResult = {(cost) => setCostResult(cost)}
        setOpenNodesResult = {(openNodes) => setOpenNodesResult(openNodes)}
        setClosedNodesResult = {(closedNodes) => setClosedNodesResult(closedNodes)}
        setHeuristic = {(heuristic) => setHeuristic(heuristic)}
        setAlgorithm = {(algo) => setAlgorithm(algo)}
      />
      <div className="board">
        <canvas width={`${GRID_CELL_SIZE * GRID[0].length}px`} height={`${GRID_CELL_SIZE * GRID.length}px`} ref={canvasRef} />
        <br/>
        <button onClick={() => findPath()}>Find path</button>
      </div>
      <BoardLegend algorithm = {algorithm} />
  </div>
  );
}

export default Board;

