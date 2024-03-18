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

export const clickBoardCell = (board, x, y) => {};

export const getHoverShape = (board, x, y, cellList) => {
  const checkTop = Math.max(0, y - 1);
  const checkRight = Math.min(board[0].length - 1, x + 1);
  const checkBottom = Math.min(board.length - 1, y + 1);
  const checkLeft = Math.max(0, x - 1);
  const colour = board[y][x].colour;
  //   board[y][x].highlight = true;
  board[y][x].visited = true;
  cellList.push(board[y][x]);
  if (!board[checkTop][x].visited && board[checkTop][x].colour === colour)
    getHoverShape(board, x, checkTop, cellList);
  if (!board[y][checkRight].visited && board[y][checkRight].colour === colour)
    getHoverShape(board, checkRight, y, cellList);
  if (!board[checkBottom][x].visited && board[checkBottom][x].colour === colour)
    getHoverShape(board, x, checkBottom, cellList);
  if (!board[y][checkLeft].visited && board[y][checkLeft].colour === colour)
    getHoverShape(board, checkLeft, y, cellList);

  return cellList;
};

export const removeShape = (board, shape) => {
  shape.forEach((cell) => {
    board[cell.y][cell.x] = new Cell(cell.x, cell.y, true);
  });
};

const reorderBoard = (board) => {};
