interface Passenger {
    id: number;
    name: string;
  }
  
  class WaitlistStack {
    private waitlist: Passenger[] = [];
    
    public addPassenger(passenger: Passenger): void {
      this.waitlist.push(passenger);
      console.log(`${passenger.name} added to the waitlist at position ${this.waitlist.length}`);
    }
    
    public isEmpty(): boolean {
      return this.waitlist.length === 0;
    }
    
    public size(): number {
      return this.waitlist.length;
    }
    
    public assignSeat(): Passenger | null {
      if (this.isEmpty()) {
        console.log("No passengers on the waitlist");
        return null;
      }
      
      const passenger = this.waitlist.pop();
      console.log(`Seat assigned to ${passenger!.name}`);
      return passenger!;
    }
    
    public viewWaitlist(): void {
      console.log("Current waitlist:");
      if (this.isEmpty()) {
        console.log("Waitlist is empty");
        return;
      }
      
      for (let i = this.waitlist.length - 1; i >= 0; i--) {
        console.log(`Position ${i + 1}: ${this.waitlist[i].name} (ID: ${this.waitlist[i].id})`);
      }
    }
  }
  
  function demonstrateRailwayReservation(): void {
    const waitlist = new WaitlistStack();
    
    waitlist.addPassenger({ id: 1, name: "Alice Smith" });
    waitlist.addPassenger({ id: 2, name: "Bob Johnson" });
    waitlist.addPassenger({ id: 3, name: "Charlie Brown" });
    
    waitlist.viewWaitlist();
    
    console.log("\nAssigning available seats...");
    waitlist.assignSeat();
    waitlist.assignSeat();
    
    waitlist.addPassenger({ id: 4, name: "Diana Miller" });
    
    waitlist.viewWaitlist();
    
    console.log("\nAssigning more available seats...");
    waitlist.assignSeat();
    waitlist.assignSeat();
    
    console.log(`\nWaitlist is empty: ${waitlist.isEmpty()}`);
  }
  
  demonstrateRailwayReservation();