import { print, printCenter } from "../utils/io.mjs";
import currentLanguage from "../language/currentLanguage.mjs";

function createInBetweenScreen() {
    return {
        isDrawn: false,
        next: null,
        transitionTo: null,
        displayTime: 0,
        text: null,
        transitionFn: null,

        init: function (text, transitionFn, displayTime = 3) {
            this.displayTime = displayTime * 1000;
            this.text = text;
            this.transitionFn = transitionFn;
        },

        update: function (dt) {

            this.displayTime -= dt;
            if (this.displayTime <= 0) {
                this.next = this.transitionFn();
                this.transitionTo = currentLanguage.TRANSITION_TO_INBETWEEN;
            }
        },

        draw: function (dr) {
            if (this.isDrawn == false) {
                this.isDrawn = true;
                printCenter(this.text);
            }
        }
    }
}

export default createInBetweenScreen;