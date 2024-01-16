const squareRegistry = new Map();

const chessSquare = (x, y) => {
    const xPos = x;
    const yPos = y;
    let predecessor;

    const getPredecessor = () => predecessor;
    const setPredecessor = (newPredecessor) => {
        predecessor = predecessor || newPredecessor;
    }

    const name = () => `${x}, ${y}`

    const knightMoves = [[1, 2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];

    const createKnightMoves = () => {
        return knightMoves.map((move) => nextSquareMove(move[0], move[1])).filter((square) => square !== undefined)
    }

    const nextSquareMove = (xMove, yMove) => {
        const [newX, newY] = [xPos + xMove, yPos + yMove];
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
            return chessSquare(newX, newY);
        }
    }

    if (squareRegistry.has(name())) {
        return squareRegistry.get(name())
    } else {
        newSquare = { name, getPredecessor, setPredecessor, createKnightMoves }
        squareRegistry.set(name(), newSquare)
        return newSquare;
    }
}

const knightTravails = (start, end) => {
    squareRegistry.clear();

    const origin = chessSquare(...start);
    const target = chessSquare(...end)

    const queue = [origin];
    while (!queue.includes(target)) {
        const currentSquare = queue.shift();
        const enqueueList = currentSquare.createKnightMoves();
        enqueueList.map((square) => square.setPredecessor(currentSquare))
        queue.push(...enqueueList);
    }

    const path = [target];
    while (!path.includes(origin)) {
        const prevSquare = path[0].getPredecessor();
        path.unshift(prevSquare);
    }

    console.log(`The shortest path was ${path.length - 1} moves!`);
    console.log("The moves were:");
    path.forEach((square) => {
        console.log(square.name())
    });
}

console.log(knightTravails([0, 0], [7, 2]))