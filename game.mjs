import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen, printCenter } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import {FIRST_PLAYER, SECOND_PLAYER, GAME_FPS, MIN_TERMINAL_HEIGHT, MIN_TERMINAL_WIDTH} from "./consts.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInnBetweenScreen from "./game/inbetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";
import DICTIONARY from "./dictionary.mjs";

let currentLanguage = DICTIONARY.en;

let currentState = null;    // The current active state in our finite-state machine.
let gameLoop = null;        // Variable that keeps a reference to the interval id assigned to our game loop


let mainMenuScene = null;
let languageMenuScene = null;

(function initialize() {
    print(ANSI.HIDE_CURSOR);
    clearScreen();
    updateMenus();
    SplashScreen.next = mainMenuScene;
    currentState = SplashScreen  // This is where we decide what state our finite-state machine will start in. 
    gameLoop = setInterval(update, GAME_FPS); // The game is started.

    if (!checkMinimumResolution()) {
        process.exit(1);
    }
})();

function update() {
    currentState.update(GAME_FPS);
    currentState.draw(GAME_FPS);
    updateMenus();
    if (currentState.transitionTo != null) {
        print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
        
        if (currentState.transitionTo === currentLanguage.MAIN_MENU_MESSAGE) {
            currentState.next = mainMenuScene;
            print(currentLanguage.PLAYER1_PLACEMENT_MESSAGE);
        }
        currentState = currentState.next;
        currentState.transitionTo = null;
    }
}

// Support / Utility functions ---------------------------------------------------------------

function buildMenu() {
    let menuItemCount = 0;
    return [
        {
            text: currentLanguage.START_GAME_MESSAGE, id: menuItemCount++, action: function () {
                clearScreen();
                let inbetween = createInnBetweenScreen();
                inbetween.init(currentLanguage.PLAYER1_PLACEMENT_MESSAGE, () => {

                    let p1map = createMapLayoutScreen();
                    p1map.init(FIRST_PLAYER, (player1ShipMap) => {


                        let inbetween = createInnBetweenScreen();
                        inbetween.init(currentLanguage.PLAYER2_PLACEMENT_MESSAGE, () => {
                            let p2map = createMapLayoutScreen();
                            p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                return createBattleshipScreen(player1ShipMap, player2ShipMap);
                            })
                            return p2map;
                        });
                        return inbetween;
                    });

                    return p1map;

                }, 3);
                currentState.next = inbetween;
                currentState.transitionTo = currentLanguage.MAP_LAYOUT_MESSAGE;
            }
        },
        { text: currentLanguage.LANGUAGE_MENU_MESSAGE, id: menuItemCount++, action: function() {
            currentState.next = languageMenuScene;
            currentState.transitionTo = currentLanguage.LANGUAGE_MENU_MESSAGE;
            
        }
    },
        { text: currentLanguage.EXIT_GAME_MESSAGE, id: menuItemCount++, action: function () { print(ANSI.SHOW_CURSOR); clearScreen(); process.exit(); } },
    ];
}

function buildLanguageMenu() {
    let menuItemCount = 0;
    return [
        {
            text: currentLanguage.ENGLISH_MESSAGE, 
            id: menuItemCount++, action: function () {
                currentLanguage = DICTIONARY.en;
                languageMenuScene.next = mainMenuScene;
                currentState.transitionTo = currentLanguage.MAIN_MENU_MESSAGE;
            }
        },
        {   text: currentLanguage.NORWEGIAN_MESSAGE, id: menuItemCount++, action: function() {
                currentLanguage = DICTIONARY.no;
                languageMenuScene.next = mainMenuScene;
                currentState.transitionTo = currentLanguage.MAIN_MENU_MESSAGE;
        }
    },
        { text: currentLanguage.BACK_MESSAGE, id: menuItemCount++, action: function () {
                languageMenuScene.next = mainMenuScene;
                currentState.transitionTo = currentLanguage.MAIN_MENU_MESSAGE;
        }
    }
    ];
}

function checkMinimumResolution() {
    const width = process.stdout.columns;
    const height = process.stdout.rows;

    if (width < MIN_TERMINAL_WIDTH || height < MIN_TERMINAL_HEIGHT) {
        console.error(currentLanguage.RESOLUTION_ERROR_MSG);
        return false;
    }

    return true;
}

function updateMenus() {
    mainMenuScene = createMenu(buildMenu());
    languageMenuScene = createMenu(buildLanguageMenu());
}

