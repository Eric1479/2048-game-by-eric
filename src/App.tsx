import React, { useEffect, useState } from "react";
import { CaretDown, CaretLeft, CaretRight, CaretUp } from "phosphor-react";
import { gameState } from "./components/types/types";
import { moveUp, moveLeft, moveDown, moveRight } from "./components/actions";
import { boardMoved, checkForGameOver, placeRandom, setLose } from "./components/common";
import { Row } from "./components/row";
import Header from "./components/header";
import Instruction from "./components/instruction";
import "./App.css";

function App() {

  // Initialize the state with the gameState that has the following initial values
  const [state, setState] = useState<gameState>({
    board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    score: 0,
    gameOver: false,
    message: null,
    rows: 4,
    columns: 4,
  });
  
  // Initialize the isLose state with a boolean value
  const [isLose, setIsLose] = useState(false);

  // Initialize the state whenever there is change in either columns or rows
  useEffect(() => {
    setState({
      ...state,
      board: random_generated_board,
      score: 0,
      gameOver: false,
      message: null,
    });
  }, [state.columns, state.rows]);

  //Re-render the DOM whenever the keyboard event is called
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === 'ArrowUp') {
        move("up");
      } else if (e.key === 'ArrowRight') {
        move("right");
      } else if (e.key === 'ArrowDown') {
        move("down");
      } else if (e.key === 'ArrowLeft') {
        move("left");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Initialize a new board with the rows in state and fill each column with 0
  const board = Array.from(Array(state.rows), (_) =>
    Array(state.columns).fill(0)
  );

  // Place 2 or 4 in a random coordinate x and y number in a board
  const random_generated_board = placeRandom(placeRandom(board));

  // Moves board depending on direction and checks for game over
  const move = (direction: string) => {
    if (!state.gameOver) {
      if (direction === "up") {
        const movedUp = moveUp(state.board);
        if (boardMoved(state.board, movedUp.board)) {
          const upWithRandom = placeRandom(movedUp.board);

          if (checkForGameOver(upWithRandom)) {
            setState({
              ...state,
              board: upWithRandom,
              gameOver: true,
              message: "Game over!",
            });
          } else {
            setState({
              ...state,
              board: upWithRandom,
              score: (state.score += movedUp.score),
            });
          }
        }
      } else if (direction === "right") {
        const movedRight = moveRight(state.board);
        if (boardMoved(state.board, movedRight.board)) {
          const rightWithRandom = placeRandom(movedRight.board);

          if (checkForGameOver(rightWithRandom)) {
            setState({
              ...state,
              board: rightWithRandom,
              gameOver: true,
              message: "Game over!",
            });
          } else {
            setState({
              ...state,
              board: rightWithRandom,
              score: (state.score += movedRight.score),
            });
          }
        }
      } else if (direction === "down") {
        const movedDown = moveDown(state.board);
        if (boardMoved(state.board, movedDown.board)) {
          const downWithRandom = placeRandom(movedDown.board);

          if (checkForGameOver(downWithRandom)) {
            setState({
              ...state,
              board: downWithRandom,
              gameOver: true,
              message: "Game over!",
            });
          } else {
            setState({
              ...state,
              board: downWithRandom,
              score: (state.score += movedDown.score),
            });
          }
        }
      } else if (direction === "left") {
        const movedLeft = moveLeft(state.board);
        if (boardMoved(state.board, movedLeft.board)) {
          const leftWithRandom = placeRandom(movedLeft.board);

          if (checkForGameOver(leftWithRandom)) {
            setState({
              ...state,
              board: leftWithRandom,
              gameOver: true,
              message: "Game over!",
            });
          } else {
            setState({
              ...state,
              board: leftWithRandom,
              score: (state.score += movedLeft.score),
            });
          }
        }
      }
    } else {
      setIsLose(true);
      setState({ ...state, message: "Game over. Please start a new game." });
    }
  };

  // Function to initialize the board to its initial state
  const ResetGame = () => {
    setState({
      ...state,
      board: random_generated_board,
      score: 0,
      gameOver: false,
      message: null,
    });
  }

  return (
    <div className="container">

      <div className="row">

        <div className="btnCol">

          <Instruction/>

          <div className="keyboard">
            <div className="keyboard-item">
              <span className="arrow-button" onClick={() => {move("up");}}><CaretUp size={36}/></span>
            </div>
            <div className="keyboard-item">
              <span className="arrow-button" onClick={() => {move("left");}}><CaretLeft size={36}/></span>
              <span className="arrow-button" onClick={() => {move("down");}}><CaretDown size={36}/></span>
              <span className="arrow-button" onClick={() => {move("right");}}><CaretRight size={36}/></span>
            </div>
          </div>

        </div>

        <div className="col">

          <Header score={state.score}/>

          <div className="btn-group">

            <div className="new-game-btn button"               
              onClick={() =>
                ResetGame()
              }>  
              New Game
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>

              <span className="size" style={{textAlign: "center"}}>Size</span>

              <div className="control-btn-group">
                <button className="control-btn" 
                  onClick={() => {
                    setState({
                      ...state,
                      rows: state.rows - 1,
                      columns: state.columns - 1,
                    });
                  }}
                  disabled={state.rows <= 3 ? true : false}
                >
                  -
                </button>
                <div className="size">
                  {state.rows}x{state.columns}
                </div>
                <button className="control-btn" 
                  onClick={() => {
                    setState({
                      ...state,
                      rows: state.rows + 1,
                      columns: state.columns + 1,
                    });
                  }}
                  disabled={state.rows >= 6 ? true : false}
                >
                  +
                </button>
              </div>
            </div>

          </div> 

          <div className="board">
            <div style={{ position:"fixed" }} className={setLose("text", isLose)}>
              <h1>Game Over</h1>
              <button 
              onClick={()=>{
                ResetGame();
                setIsLose(false);
              }} 
              className="reset-button">New Game</button>
            </div>
            <table className={setLose("table", isLose)}>
              {state.board.map((row, i) => (
                <Row key={i} row={row} rowNo={state.rows} isLose={isLose} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
      
  );
}

export default App;
