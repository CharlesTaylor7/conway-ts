import { open } from "node:fs/promises";

import { renderView, nextState, parse, padGame } from "./conway";

async function main() {
  const file = await open("./conway.txt", "r");
  const input = [];

  for await (const line of file.readLines()) {
    input.push(line);
  }

  let state = parse(input);
  padGame(state, 20);
  setInterval(() => {
    console.clear();
    console.log(renderView(state));
    state = nextState(state);
  }, 400);
}

main();
