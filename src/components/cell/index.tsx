import classNames from "classnames";
import { cellProps } from "../types/types";

export const Cell = (props: cellProps) => {
    const { cellValue, rowNo, isLose } = props;
    let color = "cell";
    let value = cellValue === 0 ? "" : cellValue;
    if (value) {
      color += ` color-${value}`;
    }

    const cellClass = rowNo > 4 
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