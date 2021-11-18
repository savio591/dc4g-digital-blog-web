import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PaginationProps {
  current: number;
  total: number;
}

export function Pagination({ current, total }: PaginationProps): JSX.Element {
  const [currentLocal, setCurrentLocal] = useState(current);
  const router = useRouter();

  function handleButtonClick(buttonClickedNumber: number) {
    // setCurrentLocal(buttonClickedNumber);
    router.push(`/?page=${buttonClickedNumber}`);
    setCurrentLocal(buttonClickedNumber);
  }

  return (
    <div role="group">
      {currentLocal !== 1 && (
        <button
          aria-label="página anterior"
          onClick={() => {
            handleButtonClick(currentLocal - 1);
          }}
        >
          {"<"}
        </button>
      )}
      {arraysNumberGenerator(total).map((pageNumber) => {
        return Button(pageNumber, currentLocal, pageNumber, handleButtonClick);
      })}
      {currentLocal !== total && (
        <button
          aria-label="próxima página"
          onClick={() => {
            handleButtonClick(currentLocal + 1);
          }}
        >
          {">"}
        </button>
      )}
    </div>
  );
}

export const arraysNumberGenerator = (quantity: number) => {
  const arraysWithNumbers: number[] = [];

  for (let i = 1; i <= quantity; i++) {
    arraysWithNumbers.push(i);
  }
  return arraysWithNumbers;
};

export const Button = (
  number: number,
  current: number,
  key: string | number,
  onClick: (pageNumber: number) => void
) => {
  return (
    <button
      key={`btn_${key}`}
      aria-current={number === current}
      onClick={() => {
        onClick(number);
      }}
    >
      {number}
    </button>
  );
};
