import { getRandomColour } from "./Colours";

export class Cell {
  constructor(x, y, isEmpty = false) {
    this.x = x;
    this.y = y;
    this.colour = getRandomColour(isEmpty);
    this.isEmpty = isEmpty;
    this.visited = false;
    this.highlight = false;
  }
}
