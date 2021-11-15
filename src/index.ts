const { performance } = require('perf_hooks');

// 36.14ms to solve
var sudoku: Array<number> = [
    0, 0, 0, 0, 0, 2, 1, 0, 0,
    0, 0, 4, 0, 0, 8, 7, 0, 0,
    0, 2, 0, 3, 0, 0, 9, 0, 0,
    6, 0, 2, 0, 0, 3, 0, 4, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 5, 0, 6, 0, 0, 3, 0, 1,
    0, 0, 3, 0, 0, 5, 0, 8, 0,
    0, 0, 8, 2, 0, 0, 5, 0, 0,
    0, 0, 9, 7, 0, 0, 0, 0, 0,
];

// Really hard sudoku: 3113.14ms
// var sudoku: Array<number> = [
//     0, 0, 0, 8, 0, 1, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 4, 3,
//     5, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 7, 0, 8, 0, 0,
//     0, 0, 0, 0, 0, 0, 1, 0, 0,
//     0, 2, 0, 0, 3, 0, 0, 0, 0,
//     6, 0, 0, 0, 0, 0, 0, 7, 5,
//     0, 0, 3, 4, 0, 0, 0, 0, 0,
//     0, 0, 0, 2, 0, 0, 6, 0, 0,
// ]
  
const printSudoku = () => {
    const thickLine = "||=============================||";
    console.log(thickLine);
    for (let r = 0; r < 9; r++) {
        let rowToPrint = "";
        for (let c = 0; c < 9; c++) {
            if (c == 0) {
                rowToPrint += "||";
            }
            let number = sudoku[rowColToIndex(r, c)];
            rowToPrint += ` ${number == 0 ? " " : number} ${c == 8 ? "||" : c % 3 == 2 ? "|" : ""}`;
            }
        console.log(rowToPrint);
        if (r % 3 == 2) {
            console.log(thickLine);
        }
    }
    console.log("\n");
};

const indexToRowCol = (index: number): { row: number; col: number } => {
    return { row: Math.floor(index / 9), col: index % 9 };
};

const rowColToIndex = (row: number, col: number): number => {
    return row * 9 + col;
};

const calculatePossibleValuesForCell = (sudoku: Array<number>, index: number): Array<number> => {
    let possibleValues: Array<number> = [];
    for (let i = 1; i <= 9; i++) {
        if (isAcceptableMove(sudoku, index, i)) {
            possibleValues.push(i);
        }
    }
    return possibleValues;
};

const isAcceptableMove = (sudoku: Array<number>, index: number, i: number): boolean => {
    let { row, col } = indexToRowCol(index);

    // if i already exists in row, not acceptable
    for (let c = 0; c < 9; c++) {
        if (sudoku[rowColToIndex(row, c)] == i) {
            return false;
        }
    }

    // does column contain i
    for (let r = 0; r < 9; r++) {
        if (sudoku[rowColToIndex(r, col)] == i) {
            return false;
        }
    }

    // does 3x3 box contain i
    // calculate top left corner of box
    let r0 = Math.floor(row / 3) * 3;
    let c0 = Math.floor(col / 3) * 3;
    for (let r = r0; r < r0 + 3; r++) {
        for (let c = c0; c < c0 + 3; c++) {
            if (sudoku[rowColToIndex(r, c)] == i) {
                return false;
            }
        }
    }

    return true;
};

// Brute force approach
// function solveSudoku(index: number = 0)
const solveSudoku = (index: number = 0) => {
    while (index < 81 && sudoku[index] != 0) {
        index++;
    }
    if (index == 81) {
        return true;
    }
    let possibleMoves = calculatePossibleValuesForCell(sudoku, index);
    for (let m of possibleMoves) {
        sudoku[index] = m;
        if (solveSudoku(index + 1)) {
            return true;
        }
    }
    sudoku[index] = 0;
    return false;
};

printSudoku();
var start = performance.now();
solveSudoku();
var finish = performance.now();
printSudoku();
console.log(`Took ${(finish-start).toFixed(2)}ms to solve`);