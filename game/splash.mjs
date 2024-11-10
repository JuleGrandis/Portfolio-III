import { print, clearScreen, printCenter } from "../utils/io.mjs";
import { ANSI } from "../utils/ansi.mjs";

const UI = ` ######                                    #####                         
 #     #   ##   ##### ##### #      ###### #     # #    # # #####   ####  
 #     #  #  #    #     #   #      #      #       #    # # #    # #      
 ######  #    #   #     #   #      #####   #####  ###### # #    #  ####  
 #     # ######   #     #   #      #            # #    # # #####       # 
 #     # #    #   #     #   #      #      #     # #    # # #      #    # 
 ######  #    #   #     #   ###### ######  #####  #    # # #       ####  
                                                                         `;
let isDrawn = false;
let countdown = 2500;

const SplashScreen = {

    next: null,
    transitionTo: null,

    update: function (dt) {
        countdown -= dt;
        if (countdown <= 0) {
            this.transitionTo = this.next;
        }
    },

    draw: function (dt) {
        if (isDrawn == false) {
            isDrawn = true;
            clearScreen();
            printCenter(UI);
        }
    }

}

export default SplashScreen;