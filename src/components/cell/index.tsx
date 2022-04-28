import classNames from "classnames";
import { cellProps } from "../types/types";

export const Cell = (props: cellProps) => {
    const { cellValue, rowNo, isLose } = props;
    let color = "cell";
    let value = cellValue === 0 ? "" : cellValue;
    if (value) {
      // Assign the value of the cell into the className color, for example color-2048
      color += ` color-${value}`;
    }

    // Set the className of the cell to change the size of the cell when the rowNo is greater than 4
    const cellClass = rowNo > 4 
            // Nested conditional statement to check for the isLose to not show the cell-lose-animation if isLose is false
            ? (isLose ? classNames("cell",color,"cell-size-small","cell-lose-animation") : classNames("cell",color,"cell-size-small") ) 
            : (isLose ? classNames("cell",color,"cell-size-large","cell-lose-animation") : classNames("cell",color,"cell-size-large"));

    return (
      <td>
        <div className={cellClass}>
          <div>{value}</div>
        </div>
      </td>
    );
  };