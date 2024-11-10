import { create2DArrayWithFill } from "../utils/array.mjs"
import creteBattleshipScreen from "../utils/creteBattleshipScreen"

const GAME_BOARD_DIM = 10;

let borderTop = "+".padEnd(GAME_BOARD_DIM + 2, "-") + "+";
let rowDisplay = "|".padEnd(GAME_BOARD_DIM + 2, "・") + "|";

console.log(borderTop);
console.log(rowDisplay);

console.log(borderTop.length, rowDisplay.length);

console.log(creteBattleshipScreen(player1Map))