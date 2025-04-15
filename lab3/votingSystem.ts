interface voters{
    voterId:number,
    voterName:string,
    isVoted:boolean
}
interface candidate{
    name:string,
    candidateSymbol:string
}


class votingSystem {
  private vote = new Map<string, number>();
  private voterList:voters[]=[];
  private candidateList:candidate[]=[];

  addCandidate(name:string,candidateSymbol:string):void{

    const candidate:candidate={
        name,
        candidateSymbol
      }

      this.candidateList.push(candidate);
      this.vote.set(candidate.name,0);

  }

  addVoters(name:string,voterId:number):void{

      const voter:voters={
        voterName:name,
        voterId:voterId,
        isVoted:true
      }
      this.voterList.push(voter);
    }

    checkVoterStatus(voterId: number): boolean {
        const voter = this.voterList.find(v => v.voterId === voterId);
        return voter?voter.isVoted:false; 
    }

    voting(id:number,candidateSymbol:string):void{
            const eligibleForVoting:boolean=this.checkVoterStatus(id)
            const candidateExists = this.candidateList.some(candidate => candidate.candidateSymbol === candidateSymbol);
            if(eligibleForVoting){
                if(candidateExists){

                    const getvote=this.vote.get(candidateSymbol)||0
                    const indexofVoter=this.voterList.findIndex((voter)=>voter.voterId===id);
                    this.vote.set(candidateSymbol,getvote+1)
                    this.voterList[indexofVoter].isVoted=false
                }
                else{
                    console.log("no candicate availale");
                    
                } 
                
            }
            else{
                console.log("invalid vote");
                
            }
    }
    votingResults(): void {
        let highest = 0;
        let winners: string[] = [];

        this.vote.forEach((votes, symbol) => {
            if (votes > highest) {
                highest = votes;
                winners = [symbol];
            } else if (votes === highest) {
                winners.push(symbol);
            }
        });

        if (winners.length > 1) {
            console.log("It's a draw ");
        } else if (winners.length === 1) {
            const winner = this.candidateList.find(c => c.candidateSymbol === winners[0]);
            console.log(`Winner is ${winner?.name} (${winner?.candidateSymbol}) with ${highest} votes.`);
        } else {
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

console.log("Voter 1 status :", voting.checkVoterStatus(1));
console.log("Voter 2 status :", voting.checkVoterStatus(2));

voting.voting(1, "A"); 
voting.voting(2, "B"); 
voting.voting(3, "C"); 
voting.voting(1, "A"); 

console.log("Voter 1 status :", voting.checkVoterStatus(1));
console.log("Voter 3 status :", voting.checkVoterStatus(3));

voting.votingResults(); 

