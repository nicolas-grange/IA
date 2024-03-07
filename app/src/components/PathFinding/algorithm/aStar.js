import { HEURISTIC_FUNCTIONS, init } from './algorithmHelper';
import { fillRect, wait } from '../utils';

const heuristic = (position0, position1, heuristicSelected) => {
  switch(heuristicSelected) {
    case HEURISTIC_FUNCTIONS.NONE:
      return 0;
    case HEURISTIC_FUNCTIONS.EUCLIDEAN:
      return Math.sqrt(Math.pow(position1.x - position0.x, 2) + Math.pow(position1.y - position0.y,2));
    case HEURISTIC_FUNCTIONS.MANHATTAN:
      return Math.abs(position1.x - position0.x) + Math.abs(position1.y - position0.y);
    default:
      return null;
  }
};


const aStar = async (grid, gridCellSize, heuristicSelected, ctx, delay) => {
  const path = [];
  const closedSet = [];
  const { goal, openSet} = init(grid);
  while (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[ i ].f < openSet[ lowestIndex ].f && openSet[ i ].free) {
        lowestIndex = i;
      }
    }
    let current = openSet[ lowestIndex ];
    if (current === goal) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      // return the traced path
      return {
        path: path.reverse(),
        closedNodes: closedSet.length,
        openNodes: openSet.length - 1,
      };
    }
    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[ i ];
      if (!closedSet.includes(neighbor)) {
        let possibleG = current.g + (current.cost + neighbor.cost)/2;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          if (!neighbor.start && !neighbor.goal) {
            fillRect(neighbor.y * gridCellSize, neighbor.x * gridCellSize, gridCellSize, gridCellSize, "#75e8e8", ctx);
          }
        } else if (possibleG >= neighbor.g) {
          continue;
        }

        neighbor.g = possibleG;
        neighbor.h = heuristic(neighbor, goal, heuristicSelected);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;

      }
    }

    openSet.splice(lowestIndex, 1);
    closedSet.push(current);
    if (!current.start && !current.goal) {
      fillRect(current.y * gridCellSize, current.x * gridCellSize, gridCellSize, gridCellSize, "#135454", ctx);
    }
    await wait(delay);
  }

  //no solution by default
  return {
    path: [],
    closedNodes: closedSet.length,
    openNodes: openSet.length - 1,
  };
};

export {
  aStar
}
