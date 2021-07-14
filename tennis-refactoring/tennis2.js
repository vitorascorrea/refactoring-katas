'use strict';

function getScore(P1point, P2point) {
    var P1res = numberScoreToWord(P1point);
    var P2res = numberScoreToWord(P2point);
    var highestScoringPlayer = P1point > P2point ? "player1" : "player2";

    if (P1point === P2point) {
        return P1point < 3 ? P1res + "-All" : "Deuce";
    }

    if (P1point <= 3 && P2point <= 3) {
        return P1res + "-" + P2res;
    }

    if (isInEndGame(P1point, P2point)) {
        return "Advantage " + highestScoringPlayer;
    }

    return "Win for " + highestScoringPlayer;
}

function isInEndGame(P1point, P2point) {
    return P1point >= 3 && P2point >= 3 && Math.abs(P1point - P2point) < 2;
}

function numberScoreToWord(score) {
    switch (score) {
        case 0:
            return "Love";
        case 1:
            return "Fifteen";
        case 2:
            return "Thirty";
        case 3:
            return "Forty";
        default:
            break;
    }
}


module.exports = getScore;
