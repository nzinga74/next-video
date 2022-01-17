import type { NextPage } from "next";
import { useState } from "react";
import { Props } from "./types";
const Pagination: NextPage<Props> = ({
  totalItems,
  currentPaginationNumber,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(1);
  const onNextPagination = () => {
    if (currentValue > totalItems - 1) {
      setCurrentValue(1);
    } else {
      setCurrentValue(currentValue + 1);
    }
    currentPaginationNumber(currentValue);
  };
  const onBackPagination = () => {
    if (currentValue > 1) {
      setCurrentValue(currentValue - 1);
    } else {
      setCurrentValue(40);
    }
    currentPaginationNumber(currentValue);
  };

  return (
    <ul className="pagination-list">
      <li onClick={() => onBackPagination()}>
        <p>{"<<"}</p>
      </li>
      <li className="pagination-list-input">
        <p>{currentValue}</p>
      </li>
      <li onClick={() => onNextPagination()}>
        <p>{">>"}</p>
      </li>
    </ul>
  );
};

export default Pagination;
