import { GAME_BOARD_DIM, FIRST_PLAYER, SECOND_PLAYER } from "../consts.mjs";
import { print, clearScreen } from "../utils/io.mjs";
import KeyBoardManager from "../utils/io.mjs";
import { ANSI } from "../utils/ansi.mjs";
import units from "./units.mjs";
import { create2DArrayWithFill } from "../utils/array.mjs";

const creteBattleshipScreen = (player1Map, player2Map) => {
    let currentPlayer = FIRST_PLAYER;
    let firstPlayerBoard = null;
    let secondPlayerBoard = null;

function initializeBoard() {
    return {
        ships: Array.from()
    }
}    


    return {
        isDrawn: false,
        next: null,
        transitionTo: null,


        init: function (firstPBoard, secondPBoard) {
            firstPlayerBoard = firstPBoard;
            secondPlayerBoard = secondPBoard;
        },

        update: function (dt) {
            //this.isDrawn = false;
        },

        draw: function (dr) {
            if (this.isDrawn == false) {
                this.isDrawn = true;


                print("There should be a battleship game here");
                
                print(player1Map.length);

            }
        }

    }
}

export default creteBattleshipScreen;

function swapPlayer() {
        currentPlayer *= -1;
        if (currentPlayer == FIRST_PLAYER) {
            currentBoard = firstPlayerBoard;
            opponentBoard = secondPlayerBoard;
        } else {
            currentBoard = secondPlayerBoard;
            opponentBoard = firstPlayerBoard;
        }
    }
