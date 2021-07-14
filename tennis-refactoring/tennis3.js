'use strict';

function getScore(p1, p2) {
    let p1N = "player1";
    let p2N = "player2";

    if (isInEarlyGame(p1, p2)) {
        let p1ScoreWord = numberScoreToWord(p1);
        let p2ScoreWord = numberScoreToWord(p2);

        if (p1 === p2) {
            return p1ScoreWord + "-All";
        }

        return p1ScoreWord + "-" + p2ScoreWord;
    }

    if (p1 === p2) {
        return "Deuce";
    }

    var highestScoringPlayer = p1 > p2 ? p1N : p2N;

    if (isInEndGame(p1, p2)) {
        return "Advantage " + highestScoringPlayer;
    }

    return "Win for " + highestScoringPlayer;
}

function isInEarlyGame(p1, p2) {
    return (p1 < 4 && p2 < 4) && (p1 + p2 < 6);
}

function isInEndGame(p1, p2) {
    return (p1 - p2) * (p1 - p2) === 1;
}

function numberScoreToWord(score) {
    var scores = ["Love", "Fifteen", "Thirty", "Forty"];
    return scores[score];
}


module.exports = getScore;

