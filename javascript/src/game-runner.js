"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./game");
function gameRunner(getRandomInt) {
    // a simulator of a game
    var notAWinner = false;
    var game = new game_1.Game();
    game.add('Chet');
    game.add('Pat');
    game.add('Sue');
    do {
        game.roll(getRandomInt(6));
        if (getRandomInt(10) == 7) {
            notAWinner = game.wrongAnswer();
        }
        else {
            notAWinner = game.wasCorrectlyAnswered();
        }
    } while (notAWinner);
}
exports.gameRunner = gameRunner;
;
