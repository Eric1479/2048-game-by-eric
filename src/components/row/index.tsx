import { Cell } from "../cell";
import { rowProps } from "../types/types";



export const Row = (props: rowProps) => {
    const { row, rowNo, isLose} = props;
    return (
      <tr>
        {row.map((cell, i) => (
          <Cell key={i} cellValue={cell} rowNo={rowNo} isLose={isLose}/>
        ))}
      </tr>
    );
  };