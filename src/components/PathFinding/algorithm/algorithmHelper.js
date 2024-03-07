const HEURISTIC_FUNCTIONS = {
  NONE: "NONE",
  EUCLIDEAN: "EUCLIDEAN",
  MANHATTAN: "MANHATTAN"
}

const ALGORITHM = {
  DEPTH_FIRST_SEARCH: "DEPTH_FIRST_SEARCH",
  A_STAR: "A_STAR"
}

//constructor function to create all the grid points as objects containing the data for the points
function Node(x, y, free = true, cost= 1, start = false, goal = false) {
  this.x = x; //x location of the grid point
  this.y = y; //y location of the grid point
  this.f = 0; //total cost function
  this.g = 0; //cost function from start to the current grid point
  this.start = start;
  this.goal = goal;
  this.cost = cost;
  this.free = free;
  this.h = 0; //heuristic estimated cost function from current grid point to the goal
  this.neighbors = []; // neighbors of the current grid point
  this.parent = undefined; // immediate source of the current grid point

  // update neighbors array for a given grid point
  this.updateNeighbors = function (grid) {
    let i = this.x;
    let j = this.y;
    if (i < grid[0].length - 1 && grid[i+1][j].free) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0 && grid[i-1][j].free) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < grid.length - 1 && grid[i][j+1].free) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0 && grid[i][j-1].free) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}

//initializing the grid
const init = (grid) => {
 let start; let goal;
  //making a 2D array
  const nodes = new Array(grid[0].length);
  for (let i = 0; i < grid[0].length; i++) {
    nodes[i] = new Array(grid.length);
  }

  for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const currentCell = grid[i][j];
      switch (currentCell) {
        case "1":
          nodes[i][j] = new Node(i, j);
          break;
        case "s":
          start = new Node(i, j, true, 1, true);
          nodes[i][j] = start;
          break;
        case "g":
          goal = new Node(i, j, true, 1, false, true);
          nodes[i][j] = goal;
          break;
        case "x":
          nodes[i][j] = new Node(i, j, false);
          break;
        default:
          const cost = parseInt(currentCell);
          nodes[i][j] = new Node(i, j, true, cost);
      }
    }
  }
  for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
      nodes[i][j].updateNeighbors(nodes);
    }
  }
  const openSet = [];
  openSet.push(start);
  return {goal, openSet};
}


export {
  init,
  HEURISTIC_FUNCTIONS,
  ALGORITHM
}
