export const rotateRight = (matrix: number[][]) => {
  // const result = [];

  // for (let c = 0; c < matrix.length; c++) {
  //   let row = [];
  //   for (let r = matrix.length - 1; r >= 0; r--) {
  //     row.push(matrix[r][c]);
  //   }
  //   result.push(row);
  // }

  const result = matrix[0].map((_,col)=>matrix.map(row=>row[col]).reverse())
  return result;
};

export const rotateLeft = (matrix: number[][]) => {
  // const result = [];

  // for (let c = matrix.length - 1; c >= 0; c--) {
  //   let row = [];
  //   for (let r = matrix.length - 1; r >= 0; r--) {
  //     row.unshift(matrix[r][c]);
  //   }
  //   result.push(row);
  // }

  const result = matrix[0].map((_,col)=>matrix.map(row=>row[col])).reverse()
  return result;
};

export const moveUp = (inputBoard: number[][]) => {
  const rotatedRight = rotateRight(inputBoard);

  // Shift all numbers to the right
  const {board:tempBoard, score} = moveRight(rotatedRight)

  // Rotate board back upright
  const board = rotateLeft(tempBoard);

  return { board, score };
};

export const moveRight = (inputBoard: number[][]) => {
  const board = [];
  let score = 0;

  for (let r = 0; r < inputBoard.length; r++) {
    const row = [];
    for (let c = 0; c < inputBoard[r].length; c++) {
      let current = inputBoard[r][c];
      current === 0 ? row.unshift(current) : row.push(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to right
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

export const moveDown = (inputBoard: number[][]) => {
  const rotatedRight = rotateRight(inputBoard);
  // Shift all numbers to the left

  const {board:tempBoard, score} = moveLeft(rotatedRight)

  // Rotate board back upright
  const board = rotateLeft(tempBoard);

  return { board, score };
};

export const moveLeft = (inputBoard: number[][]) => {
  const board = [];
  let score = 0;

  for (let r = 0; r < inputBoard.length; r++) {
    const row = [];
    for (let c = inputBoard[r].length - 1; c >= 0; c--) {
      let current = inputBoard[r][c];
      current === 0 ? row.push(current) : row.unshift(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to left
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