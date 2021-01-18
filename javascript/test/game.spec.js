const {Game} = require('../src/game');
const {gameRunner} = require('../src/game-runner');

const {expect, assert} = require('chai');
const approvals = require('approvals');
approvals.mocha();
const _ = require('lodash');
const {getRandom} = require('./rands');

describe("The game", function () {
    it("should work ;-)", function () {

        const loggedLines = [];
        const oldLog = console.log;
        console.log = function (arg) {
            loggedLines.push(arg);
        }

        _.range(15).forEach(() => {
            gameRunner(getRandom)
        });

        console.log = oldLog;

        this.verifyAsJSON(loggedLines)

    });

    xit("should enforce at least 2 players are added", () => {
       const game = new Game();
       
       game.add("Ash");

       assert.throws(() => game.roll(1), 'Not enough players in game. Make sure there are at least 2.');
    });

});
