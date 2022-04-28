export type gameState = {
    board: number[][];
    score: number;
    gameOver: boolean;
    message: null | string;
    rows: number;
    columns: number;
};

export type rowProps = {
    key: number;
    row: number[];
    rowNo: number;
    isLose: boolean;
};
  
export type cellProps = {
    key: number;
    cellValue: number;
    rowNo: number;
    isLose: boolean;
}

export type headerProps = {
    score:number;
}
