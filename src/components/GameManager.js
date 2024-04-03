import { Cell } from "../models/Cells";

export const generateBoard = (x = 20, y = 20) => {
  let board = [];
  for (let i = 0; i < y; i++) {
    board[i] = [];
    for (let j = 0; j < x; j++) {
      board[i][j] = new Cell(j, i);
    }
  }
  return board;
};

export const checkAnyMoveAvailable = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].isEmpty) continue;
      let shape = getShape(board, j, i, []);
      if (shape.length > 2) return true;
    }
  }
  return false;
};

export const resetVisited = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].isEmpty) continue;
      board[i][j].visited = false;
    }
  }
  return board;
};

export const getShape = (board, x, y, cellList) => {
  const checkTop = Math.max(0, y - 1);
  const checkRight = Math.min(board[0].length - 1, x + 1);
  const checkBottom = Math.min(board.length - 1, y + 1);
  const checkLeft = Math.max(0, x - 1);
  const colour = board[y][x].colour;
  //   board[y][x].highlight = true;
  board[y][x].visited = true;
  cellList.push(board[y][x]);
  if (!board[checkTop][x].visited && board[checkTop][x].colour === colour)
    getShape(board, x, checkTop, cellList);
  if (!board[y][checkRight].visited && board[y][checkRight].colour === colour)
    getShape(board, checkRight, y, cellList);
  if (!board[checkBottom][x].visited && board[checkBottom][x].colour === colour)
    getShape(board, x, checkBottom, cellList);
  if (!board[y][checkLeft].visited && board[y][checkLeft].colour === colour)
    getShape(board, checkLeft, y, cellList);

  return cellList;
};

export const removeShape = (board, shape) => {
  shape.forEach((cell) => {
    board[cell.y][cell.x] = new Cell(cell.x, cell.y, true);
  });
  return reorderBoard(board, shape);
};

const reorderBoard = (board, shape) => {
  let columns = {};
  let colList = [];
  shape.forEach((cell) => {
    if (!columns[cell.x]) {
      columns[cell.x] = [];
      colList.push(cell.x);
    }
    if (columns[cell.x].indexOf(cell.y) === -1) {
      columns[cell.x].push(cell.y);
    }
  });

  colList.sort((a, b) => a - b);

  colList.forEach((x) => {
    let value = columns[x];
    value.sort((a, b) => b - a);
    let bottom = value[0];
    board = shiftBlocksDown(board, bottom, x);
  });

  colList.forEach((x) => {
    if (!checkColEmpty(board, x)) return;
    for (let i = x; i < board[0].length; i++) {
      let colDif = 1;
      if (i + colDif > board[0].length - 1) break;
      colDif += countEmptyCols(board, i + colDif, 0);
      if (i + colDif > board.length - 1) continue;
      if (!board[board.length - 1][i + colDif].isEmpty) {
        console.log("in if");
        for (let j = board.length - 1; j > -1; j--) {
          if (board[j][i + colDif].isEmpty) break;
          board[j][i] = board[j][i + colDif];
          board[j][i].x = i;
          board[j][i + colDif] = new Cell(i + colDif, j, true);
        }
      }
      colDif = 1;
    }
  });
  return board;
};

const shiftBlocksDown = (board, bottom, x) => {
  for (let i = bottom; i >= 0; i--) {
    if (board[i][x].isEmpty) continue;
    board[bottom][x] = board[i][x];
    board[bottom][x].y = bottom;
    board[i][x] = new Cell(x, i, true);
    bottom -= 1;
  }
  return board;
};

const countEmptyCols = (board, col, count) => {
  while (checkColEmpty(board, col)) {
    count++;
    col++;
    if (col >= board[0].length) break;
  }
  return count;
};

const checkColEmpty = (board, col) => {
  let colEmpty = true;
  for (let i = 0; i < board.length; i++) {
    if (!board[i][col].isEmpty) colEmpty = false;
  }
  return colEmpty;
};
