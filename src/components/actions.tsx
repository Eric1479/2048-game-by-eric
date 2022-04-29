// Right rotate the board and create new arrays with new nested arrays for each row
export const rotateRight = (matrix: number[][]) => {
  const result = [];

  for (let c = 0; c < matrix.length; c++) {
    let row = [];
    for (let r = matrix.length - 1; r >= 0; r--) {
      row.push(matrix[r][c]);
    }
    result.push(row);
  }

  // First try using array.map 
  //const result = matrix[0].map((_,col)=>matrix.map(row=>row[col]).reverse())
  return result;
};

// Left rotate the board and create new arrays with new nested arrays for each row
export const rotateLeft = (matrix: number[][]) => {
  const result = [];

  for (let c = matrix.length - 1; c >= 0; c--) {
    let row = [];
    for (let r = matrix.length - 1; r >= 0; r--) {
      row.unshift(matrix[r][c]);
    }
    result.push(row);
  }

  // First try using array.map
  // const result = matrix[0].map((_,col)=>matrix.map(row=>row[col])).reverse()
  return result;
};

// Move up as in the cells are moving right to the right rotated board and then left rotate back to provide the result
export const moveUp = (inputBoard: number[][]) => {
  const rotatedRight = rotateRight(inputBoard);

  // Shift all numbers to the right
  const {board:tempBoard, score} = moveRight(rotatedRight)

  // Rotate board back upright
  const board = rotateLeft(tempBoard);

  return { board, score };
};

export const moveDown = (inputBoard: number[][]) => {
  const rotatedRight = rotateRight(inputBoard);

  // Shift all numbers to the left
  const {board:tempBoard, score} = moveLeft(rotatedRight)

  // Rotate board back upright
  const board = rotateLeft(tempBoard);

  return { board, score };
};


export const moveRight = (inputBoard: number[][]) => {
  const board = [];
  let score = 0;

  // If it is 0, then unshift it in front of the array, if its not, the push it as the last of the array

  for (let r = 0; r < inputBoard.length; r++) {
    const row = [];
    for (let c = 0; c < inputBoard[r].length; c++) {
      let current = inputBoard[r][c];
      current === 0 ? row.unshift(current) : row.push(current);
    }
    board.push(row);
  }

  // First try using array.map
  // const tempBoard= inputBoard.map(row=>{
  //   const newRow = row.filter(col=>col>0);
  //   return Array(row.length-newRow.length).fill(0).concat(newRow)
  // })

  // First try using array.map
  // const board = tempBoard.map(row=>row.reverse().reduce((newRow,currentNumber,currentIndex)=>{
  //   if (currentIndex===0) return newRow
  //   const previousNumber = newRow.pop()
  //   if(previousNumber===currentNumber){
  //     const newNumber = previousNumber*2
  //     score += newNumber;
  //     return [...newRow,...[newNumber,0]]
  //   }
  //   else if (previousNumber===0 && currentNumber>0)
  //     return [...newRow,...[currentNumber,0]]
  //   else
  //     return [...newRow,...[previousNumber,currentNumber]]
  // },[row[0]]).reverse())


  // Combine numbers if the current cell value is the same with the cell from the left hand side column and shift to right
  for (let r = 0; r < board.length; r++) {
    for (let c = board[r].length - 1; c >= 0; c--) {
      if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c - 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
        board[r][c] = board[r][c - 1];
        board[r][c - 1] = 0;
      }
    }
  }

  return { board, score };
};

export const moveLeft = (inputBoard: number[][]) => {
  const board = [];
  let score = 0;

  // If it is not 0, then unshift it in front of the array, if its 0, the push it as the last of the array
  for (let r = 0; r < inputBoard.length; r++) {
    const row = [];
    for (let c = inputBoard[r].length - 1; c >= 0; c--) {
      let current = inputBoard[r][c];
      current === 0 ? row.push(current) : row.unshift(current);
    }
    board.push(row);
  }

  // First try using array.map
  // const board= inputBoard.map(row=>{
  //   const newRow = row.filter(col=>col>0);
  //   return newRow.concat(Array(row.length-newRow.length).fill(0))
  // })

  // Combine numbers if the current cell value is the same with the cell from the right hand side column and shift to left
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c + 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
        board[r][c] = board[r][c + 1];
        board[r][c + 1] = 0;
      }
    }
  }

  return { board, score };
};