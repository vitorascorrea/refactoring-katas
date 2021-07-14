'use strict';

function getScore(m_score1, m_score2) {
    if (m_score1 === m_score2) {
        return getTies(m_score1);
    } else if (m_score1 >= 4 || m_score2 >= 4) {
        return getEndGame(m_score1, m_score2);
    } else {
        return getWordScore(m_score1, m_score2);
    }
}

function getTies(tied_score) {
    if (tied_score >= 3) return "Deuce";
    return numberScoreToWord(tied_score) + "-All";;
}

function getWordScore(m_score1, m_score2) {
    return numberScoreToWord(m_score1) + "-" + numberScoreToWord(m_score2);
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

function getEndGame(m_score1, m_score2) {
    let score = "";

    var minusResult = m_score1 - m_score2;
    if (minusResult === 1) { score = "Advantage player1"; }
    else if (minusResult === -1) { score = "Advantage player2"; }
    else if (minusResult >= 2) { score = "Win for player1"; }
    else { score = "Win for player2"; }

    return score;
}

module.exports = getScore;