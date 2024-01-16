{
    // class cell
    // {
    //     constructor(x,y,dis)
    //     {
    //         this.x = x;
    //         this.y = y;
    //         this.dis = dis;
    //     }
    // }

    // function isInside(x,y,N)
    // {
    //     if (x >= 1 && x <= N && y >= 1 && y <= N)
    //             return true;
    //         return false;
    // }

    // function minStepToReachTarget(knightPos,targetPos,N)
    // {
    //     // x and y direction, where a knight can move
    //         let dx = [ -2, -1, 1, 2, -2, -1, 1, 2 ];
    //         let dy = [ -1, -2, -2, -1, 1, 2, 2, 1 ];

    //         // queue for storing states of knight in board
    //         let q = [];

    //         // push starting position of knight with 0 distance
    //         q.push(new cell(knightPos[0], knightPos[1], 0));

    //         let t;
    //         let x, y;
    //         let visit = new Array(N + 1);

    //         // make all cell unvisited
    //         for (let i = 1; i <= N; i++)
    //         {
    //             visit[i]=new Array(N+1);
    //             for (let j = 1; j <= N; j++)
    //                 visit[i][j] = false;
    //         }

    //         // visit starting state
    //         visit[knightPos[0]][knightPos[1]] = true;

    //         [[,false,false,false,false],[,false,false,false,false],[,false,false,false,false]]

    //         // loop until we have one element in queue
    //         while (q.length!=0) {
    //             t = q.shift();


    //             // if current cell is equal to target cell,
    //             // return its distance
    //             if (t.x == targetPos[0] && t.y == targetPos[1])
    //                 return t.dis;

    //             // loop for all reachable states
    //             for (let i = 0; i < 8; i++) {
    //                 x = t.x + dx[i];
    //                 y = t.y + dy[i];

    //                 // If reachable state is not yet visited and
    //                 // inside board, push that state into queue
    //                 if (isInside(x, y, N) && !visit[x][y]) {
    //                     visit[x][y] = true;
    //                     q.push(new cell(x, y, t.dis + 1));
    //                 }
    //             }
    //         }
    //         return Number.MAX_VALUE;
    // }

    // // Driver code
    // let N = 8;
    // let knightPos=[1,1];
    // let targetPos=[9,9];

    // console.log(minStepToReachTarget(knightPos, targetPos, N))
    //////////////////////////////////////
}
//! Node tree with each node having nodes of its possible moves
class Node {
    constructor(coord) {
        this.start = coord
        this.potentialMoves = []
    }
}

let movesXnY = [[-2, -1], [-1, -2], [2, 1], [1, 2], [2, -1], [-1, 2], [-2, 1], [1, -2]];
let counter = 0
let path = []
let visited;

class KnightMove {
    constructor() {
        this.root = null
    }

    isEmpty() {
        return this.root === null
    }

    chooseStart(x, y) {
        const newStart = new Node([x, y])

        if (this.isEmpty()) {
            this.root = newStart
            this.getPotentialMoves(this.root, null)
        } else {
            this.getPotentialMoves(newStart)
        }
    }
    getPotentialMoves(newStart) {
        if (counter === 5) {
            return 0
        } else {
            visited = newStart.start
            counter++
            // newStart.parent = parent
            // prevent the cell to be visited twice 
            for (let y = 0; y < movesXnY.length; y++) {
                if (newStart.visited == false) {
                    newStart.potentialMoves.push([newStart.start[0] + movesXnY[y][0], newStart.start[1] + movesXnY[y][1]])
                }
            }

            //prevent the node to get off board ( < 0 ; > 7)
            for (let i = 0; i < 8; i++) {
                for (let k = 0; k < 2; k++) {
                    if (newStart.potentialMoves[i][k] < 0 || newStart.potentialMoves[i][k] > 7) {
                        newStart.potentialMoves[i][k] = null
                    }
                }
            }
            const cleanArray = []
            for (let z = 0; z < 8; z++) {
                if (newStart.potentialMoves[z][0] != null && newStart.potentialMoves[z][1] != null) {
                    cleanArray.push(newStart.potentialMoves[z])
                }
            }
            newStart.potentialMoves = cleanArray
            for (let w = 0; w < newStart.potentialMoves.length; w++) {
                for (let x = 0; x < visited.length; x++) {
                    if (visited[x][0] !== newStart.potentialMoves[w][0] && visited[x][1] !== newStart.potentialMoves[w][1]) {
                        console.log('visited' + visited[x][0], visited[x][1])
                        console.log('pot' + newStart.potentialMoves[w][0], newStart.potentialMoves[w][1])

                        this.chooseStart(newStart.potentialMoves[w][0], newStart.potentialMoves[w][1])
                    }
                }
            }
            path.push(newStart.potentialMoves)
            console.log(visited)
            console.log(path)

        }
    }
    findPath(start, end) {
        this.chooseStart(start[0], start[1])
        console.log(path)
        if (start[0] === end[0] && start[1] === end[1]) {
            return 0
        } else {
            for (let i = 0; i < path.length; i++) {
                for (let y = 0; y < path[i].length; y++) {
                    if (path[i][y][0] === end[0] && path[i][y][1] === end[1]) {
                        return i
                    }
                }
            }
        }
    }
}

let chess = new KnightMove()
chess.chooseStart(2, 0)

// console.log(chess.findPath([0, 1], [5, 2]))
// console.log(chess.findPath([2,0], [5, 2]))
