export class Game {

    // Maybe questions should extend a base or interface?
    rockQuestions: any[];
    isGettingOutOfPenaltyBox: boolean;
    currentPlayer: number;
    sportsQuestions: any[];
    scienceQuestions: any[];
    inPenaltyBox: any[];
    popQuestions: any[];
    purses: any[];
    places: any[];
    players: any[];

    constructor() {
        // maybe players should be injected here
        // have a player object to encapsulate shared data
        this.players = new Array();
        this.places = new Array(6); // unclear what this is
        this.purses = new Array(6);
        this.inPenaltyBox = new Array(6);

        // I don't like this
        this.popQuestions = new Array();
        this.scienceQuestions = new Array();
        this.sportsQuestions = new Array();
        this.rockQuestions = new Array();

        // current player could be an object
        this.currentPlayer = 0;
        this.isGettingOutOfPenaltyBox = false; // seems weird

        // maybe question count comes from options
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push(this.createRockQuestion(i));
        }

    }

    add(playerName) {
        // instead of taking a string take object
        this.players.push(playerName);
        this.places[this.howManyPlayers() - 1] = 0;
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(playerName + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    };

    howManyPlayers() {
        return this.players.length;
    };

    didPlayerWin() {
        return !(this.purses[this.currentPlayer] == 6)
    };

    currentCategory() {
        if (this.places[this.currentPlayer] == 0)
            return 'Pop';
        if (this.places[this.currentPlayer] == 4)
            return 'Pop';
        if (this.places[this.currentPlayer] == 8)
            return 'Pop';
        if (this.places[this.currentPlayer] == 1)
            return 'Science';
        if (this.places[this.currentPlayer] == 5)
            return 'Science';
        if (this.places[this.currentPlayer] == 9)
            return 'Science';
        if (this.places[this.currentPlayer] == 2)
            return 'Sports';
        if (this.places[this.currentPlayer] == 6)
            return 'Sports';
        if (this.places[this.currentPlayer] == 10)
            return 'Sports';
        return 'Rock';
    };


    askQuestion() {
        if (this.currentCategory() == 'Pop') {
            console.log(this.popQuestions.shift());
        }
        if (this.currentCategory() == 'Science') {
            console.log(this.scienceQuestions.shift());
        }
        if (this.currentCategory() == 'Sports') {
            console.log(this.sportsQuestions.shift());
        }
        if (this.currentCategory() == 'Rock') {
            console.log(this.rockQuestions.shift());
        }
    };

    createRockQuestion(index) {
        return "Rock Question " + index;
    };


    isPlayable(howManyPlayers) {
        return howManyPlayers >= 2;
    };

    roll(roll) {
        if (this.players.length < 2) {
            throw new Error('Not enough players in game. Make sure there are at least 2.')
        }
        console.log(this.players[this.currentPlayer] + " is the current player");
        console.log("They have rolled a " + roll);

        if (this.inPenaltyBox[this.currentPlayer]) {
            if (roll % 2 != 0) {
                this.isGettingOutOfPenaltyBox = true;

                console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
                this._movePlayerAndAskQuestion(roll);
            } else {
                console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {

            this._movePlayerAndAskQuestion(roll);
        }
    };

    _movePlayerAndAskQuestion(roll) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
    }

    wasCorrectlyAnswered() {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
                console.log('Answer was correct!!!!');
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length)
                    this.currentPlayer = 0;

                this.purses[this.currentPlayer] += 1;
                console.log(this.players[this.currentPlayer] + " now has " +
                    this.purses[this.currentPlayer] + " Gold Coins.");

                var winner = this.didPlayerWin();

                return winner;
            } else {
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length)
                    this.currentPlayer = 0;
                return true;
            }


        } else {
            console.log('Answer was correct!!!!');

            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
            this.purses[this.currentPlayer] += 1;
            console.log(this.players[this.currentPlayer] + " now has " +
                this.purses[this.currentPlayer] + " Gold Coins.");

            var winner = this.didPlayerWin();

            return winner;
        }
    };

    wrongAnswer() {
        console.log('Question was incorrectly answered');
        console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    };

}
