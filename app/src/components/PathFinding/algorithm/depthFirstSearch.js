import { fillRect, wait } from '../utils';
import { init } from './algorithmHelper';

const depthFirstSearch = async (grid, gridCellSize, ctx, delay) => {
  const { goal, openSet} = init(grid);
  const openNodes = [];
  const path = [];

  while(!openSet.isEmpty) {
    const node = openSet.pop()
    if (node === goal) {
      return path;
    }
    if (!openNodes.includes(node)) {
      openNodes.push(node)
      path.push(node);
      if(!node.start && !node.goal) {
        await wait(delay)
        fillRect(node.y * gridCellSize, node.x * gridCellSize, gridCellSize , gridCellSize, '#75e8e8', ctx)
      }
      for (let j = 0; j < node.neighbors.length; j++) {
        if (!openNodes.includes(node.neighbors[j])){
          openSet.push(node.neighbors[j]);
        }
      }
    }
  }
  return [];
};

export {
  depthFirstSearch
}
