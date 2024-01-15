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
    constructor(x,y)
    {
        this.start = [x,y]
        this.parent = null
        this.potentialMoves = []
        this.visited = false
    }
}

let movesXnY = [[-2, -1], [-1, -2], [2, 1], [1, 2], [2, -1],[-1, 2],[-2, 1], [1,-2]];


class KnightMove{
    constructor()
    {
        this.root = null
    }


    isEmpty(){
        return this.root === null
      }
    
    chooseStart(x,y){
        const newStart = new Node(x,y)
        if(this.isEmpty){
            this.root = newStart
            this.getPotentialMoves(this.root, null)
        }else {
            this.getPotentialMoves(newStart, this.root)
        }
    }
    getPotentialMoves(newStart, parent){
        newStart.parent = parent
        
        for(let y = 0; y < movesXnY.length; y++){
            // prevent the cell to be visited twice 
            if(newStart.visited == false){
                newStart.potentialMoves.push([newStart.start[0]+movesXnY[y][0],newStart.start[1]+movesXnY[y][1]])  
            }
        }
        newStart.visited = true
        //prevent the node to get off board ( < 0 ; > 7)
        for(let i = 0; i < 8; i++){
            for(let k = 0; k < 2; k++){
                if(newStart.potentialMoves[i][k] < 0 || newStart.potentialMoves[i][k] > 7){
                    newStart.potentialMoves[i] = null
                }
            }
        }
        console.log(newStart)
    }
}

let chess = new KnightMove()

chess.chooseStart(5,7)

    