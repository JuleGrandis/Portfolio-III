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
    /**
     * Updates the screen data and prepares the properties for the next screen.
     */
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