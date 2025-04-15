"use strict";
class votingSystem {
    constructor() {
        this.vote = new Map();
        this.voterList = [];
        this.candidateList = [];
    }
    addCandidate(name, candidateSymbol) {
        const candidate = {
            name,
            candidateSymbol
        };
        this.candidateList.push(candidate);
        this.vote.set(candidate.name, 0);
    }
    addVoters(name, voterId) {
        const voter = {
            voterName: name,
            voterId: voterId,
            isVoted: true
        };
        this.voterList.push(voter);
    }
    checkVoterStatus(voterId) {
        const voter = this.voterList.find(v => v.voterId === voterId);
        return voter ? voter.isVoted : false;
    }
    voting(id, candidateSymbol) {
        const eligibleForVoting = this.checkVoterStatus(id);
        const candidateExists = this.candidateList.some(candidate => candidate.candidateSymbol === candidateSymbol);
        if (eligibleForVoting) {
            if (candidateExists) {
                const getvote = this.vote.get(candidateSymbol) || 0;
                const indexofVoter = this.voterList.findIndex((voter) => voter.voterId === id);
                this.vote.set(candidateSymbol, getvote + 1);
                this.voterList[indexofVoter].isVoted = false;
            }
            else {
                console.log("no candicate availale");
            }
        }
        else {
            console.log("invalid vote");
        }
    }
    votingResults() {
        let highest = 0;
        let winners = [];
        this.vote.forEach((votes, symbol) => {
            if (votes > highest) {
                highest = votes;
                winners = [symbol];
            }
            else if (votes === highest) {
                winners.push(symbol);
            }
        });
        if (winners.length > 1) {
            console.log("It's a draw ");
        }
        else if (winners.length === 1) {
            const winner = this.candidateList.find(c => c.candidateSymbol === winners[0]);
            console.log(`Winner is ${winner === null || winner === void 0 ? void 0 : winner.name} (${winner === null || winner === void 0 ? void 0 : winner.candidateSymbol}) with ${highest} votes.`);
        }
        else {
            console.log("No votes cast.");
        }
    }
}
const voting = new votingSystem();
voting.addCandidate("Alice", "A");
voting.addCandidate("Bob", "B");
voting.addVoters("John", 1);
voting.addVoters("Jane", 2);
voting.addVoters("Mark", 3);
console.log("Voter 1 status (should be true):", voting.checkVoterStatus(1));
console.log("Voter 2 status (should be true):", voting.checkVoterStatus(2));
voting.voting(1, "A");
voting.voting(2, "B");
voting.voting(3, "C");
voting.voting(1, "A");
console.log("Voter 1 status (should be false):", voting.checkVoterStatus(1));
console.log("Voter 3 status (should be true):", voting.checkVoterStatus(3));
voting.votingResults();
