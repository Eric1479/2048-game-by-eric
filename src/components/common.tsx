import { moveUp, moveDown, moveLeft, moveRight } from "./actions";

// Return the blank coordinates of the board
export const getBlankCoordinates = (board: number[][]) => {
    const blankCoordinates: number[][] = [];
    board.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (cell === 0) {
          blankCoordinates.push([i, j]);
          return [i, j];
        }
      })
    );
    return blankCoordinates;
};

// Return a random number chose from 2 or 4
export const randomStartingNumber = () => {
    const startingNumbers = [2, 4];
    const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
};

// Return a board object with the number of 2 or 4 in two random coordinates
export const placeRandom = (board: number[][]) => {
    const blankCoordinates = getBlankCoordinates(board);
    const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
};

// Return a boolean value with 2 board object as the parameters
export const boardMoved = (original: number[][], updated: number[][]) => {
    return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
};
  
// Check to see if there are any moves left
export const checkForGameOver = (board: number[][]) => {
    // moves is an array of true or false
    let moves = [
        boardMoved(board, moveUp(board).board),
        boardMoved(board, moveRight(board).board),
        boardMoved(board, moveDown(board).board),
        boardMoved(board, moveLeft(board).board),
    ];  

    // Return the boolean values based on the array moves whether it includes true or false
    return moves.includes(true) ? false : true;
};

// Set the lose animation which requires 2 parameters
export const setLose = (type:string, isLose:boolean) =>{

    if(type === "table"){
      return isLose ? "lose-effect-table" : "";
    }
    if(type === "text"){
      return isLose ? "lose-effect-text" : "lose-text";
    }
    return "";

}