const Cell = ({
  cell,
  handleOnClick,
  handleOnMouseOver,
  handleOnMouseLeave,
}) => {
  const highlight = cell.highlight ? "hightlight" : "";
  return (
    <div
      id={`${cell.y}-${cell.x}`}
      key={`cell-${cell.y}-${cell.x}`}
      className={`board-cell ${cell.colour} ${highlight}`}
      onMouseEnter={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnClick}
    ></div>
  );
};

export default Cell;
