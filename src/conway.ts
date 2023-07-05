type Cell = "Live" | "Dead";
type Row = Array<Cell>;
export type Game = Array<Row>;
type Coordinate = { x: number; y: number };

export function parse(lines: Array<string>): Game {
  return lines.map((row) => row.split("").map(parseCell));
}

function parseCell(cell: string): Cell {
  if (cell === "*") {
    return "Live";
  } else if (cell === ".") {
    return "Dead";
  } else {
    throw Error(`Invalid cell of: ${cell}`);
  }
}

export function nextState(game: Game): Game {
  const copy = game.map((row) => [...row]);

  for (let y = 0; y < game.length; y++) {
    const row = game[y];
    for (let x = 0; x < row.length; x++) {
      const liveCount = liveNeighborCount(game, { x, y });
      if (liveCount < 2 || liveCount > 3) {
        copy[y][x] = "Dead";
      }
      if (liveCount === 3) {
        copy[y][x] = "Live";
      }
    }
  }

  return copy;
}

function liveNeighborCount(game: Game, coordinate: Coordinate): number {
  const offsets = [-1, 0, 1];
  let count = 0;
  for (let dx of offsets) {
    for (let dy of offsets) {
      if (dx === 0 && dy === 0) continue;
      const row = game[coordinate.y + dy];
      if (row !== undefined && row[coordinate.x + dx] === "Live") {
        count++;
      }
    }
  }
  return count;
}

export function renderView(game: Game): string {
  return game.map((row) => row.map(renderCell).join(" ")).join("\n");
}

export function renderCell(cell: Cell): string {
  if (cell === "Live") {
    return "*";
  } else if (cell === "Dead") {
    return ".";
  } else {
    throw Error(`Invalid cell of: ${cell}`);
  }
}

export function padGame(game: Game, n: number) {
  while (game.length < n) {
    game.push([]);
  }
  for (let row of game) {
    while (row.length < n) {
      row.push("Dead");
    }
  }
}
