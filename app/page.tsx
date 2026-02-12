'use client';

import { useState } from 'react';

interface Cell {
  value: number;
  locked: boolean;
}

export default function Home() {
  const [grid, setGrid] = useState<Cell[][]>([
    [{ value: 0, locked: false }, { value: 0, locked: false }, { value: 0, locked: false }],
    [{ value: 0, locked: false }, { value: 0, locked: false }, { value: 0, locked: false }],
    [{ value: 0, locked: false }, { value: 0, locked: false }, { value: 0, locked: false }]
  ]);

  const resetGrid = () => {
    setGrid([
      [{ value: 0, locked: false }, { value: 0, locked: false }, { value: 0, locked: false }],
      [{ value: 0, locked: false }, { value: 0, locked: false }, { value: 0, locked: false }],
      [{ value: 0, locked: false }, { value: 0, locked: false }, { value: 0, locked: false }]
    ]);
  };

  const handleBoxClick = (row: number, col: number) => {
    setGrid(prevGrid => {
      // Creating a deep copy of the grid
      const newGrid = prevGrid.map(r => r.map(cell => ({ ...cell })));
      
      // If the clicked cell is locked, then doing nothing
      if (newGrid[row][col].locked) {
        return prevGrid;
      }

      // Incrementing the clicked cell
      newGrid[row][col].value += 1;

      // Checking if clicked cell should be locked
      if (newGrid[row][col].value >= 15) {
        newGrid[row][col].locked = true;
      }

      // Rule A: If divisible by 3, decrementing right neighbor
      if (newGrid[row][col].value % 3 === 0) {
        // Checking if there's a right neighbor (col < 2)
        if (col < 2) {
          const rightCell = newGrid[row][col + 1];
          // Only modifying if not locked
          if (!rightCell.locked) {
            rightCell.value -= 1;
            // Checking if right neighbor should be locked after update
            if (rightCell.value >= 15) {
              rightCell.locked = true;
            }
          }
        }
      }

      // Rule B: If divisible by 5, incrementing bottom neighbor by 2
      if (newGrid[row][col].value % 5 === 0) {
        // Checking if there's a bottom neighbor (row < 2)
        if (row < 2) {
          const bottomCell = newGrid[row + 1][col];
          // Only modifying if not locked
          if (!bottomCell.locked) {
            bottomCell.value += 2;
            // Checking if bottom neighbor should be locked after update
            if (bottomCell.value >= 15) {
              bottomCell.locked = true;
            }
          }
        }
      }

      return newGrid;
    });
  };

  const getBoxStyle = (cell: Cell) => {
    // Locked cells are red
    if (cell.locked) {
      return {
        backgroundColor: 'red',
        color: 'white'
      };
    }

    // Even/odd styling
    const isEven = cell.value % 2 === 0;
    return {
      backgroundColor: isEven ? '#e0e0e0' : '#1a237e',
      color: isEven ? 'black' : 'white'
    };
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="grid grid-cols-3 gap-4">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex h-24 w-24 items-center justify-center rounded text-2xl font-bold cursor-pointer select-none"
              style={{
                ...getBoxStyle(cell),
                boxShadow: '2px 2px 0px black'
              }}
              onClick={() => handleBoxClick(rowIndex, colIndex)}
            >
              {cell.value}
            </div>
          ))
        )}
      </div>
      <button
        onClick={resetGrid}
        className="rounded bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
        style={{ boxShadow: '2px 2px 0px black' }}
      >
        Reset Grid
      </button>
    </div>
  );
}
