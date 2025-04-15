"use strict";
// Stack implementation for waitlist management (LIFO)
class WaitlistStack {
    constructor() {
        this.waitlist = [];
    }
    // Add a passenger to the waitlist
    addPassenger(passenger) {
        this.waitlist.push(passenger);
        console.log(`${passenger.name} added to the waitlist at position ${this.waitlist.length}`);
    }
    // Check if the waitlist is empty
    isEmpty() {
        return this.waitlist.length === 0;
    }
    // Get the size of the waitlist
    size() {
        return this.waitlist.length;
    }
    // Assign an available seat to the last passenger added to the waitlist
    assignSeat() {
        if (this.isEmpty()) {
            console.log("No passengers on the waitlist");
            return null;
        }
        const passenger = this.waitlist.pop();
        console.log(`Seat assigned to ${passenger.name}`);
        return passenger;
    }
    // View all passengers on the waitlist
    viewWaitlist() {
        console.log("Current waitlist:");
        if (this.isEmpty()) {
            console.log("Waitlist is empty");
            return;
        }
        // Display in reverse order to show the most recently added first
        for (let i = this.waitlist.length - 1; i >= 0; i--) {
            console.log(`Position ${i + 1}: ${this.waitlist[i].name} (ID: ${this.waitlist[i].id})`);
        }
    }
}
// Demo usage of the WaitlistStack
function demonstrateRailwayReservation() {
    const waitlist = new WaitlistStack();
    // Add passengers to the waitlist
    waitlist.addPassenger({ id: 1, name: "Alice Smith" });
    waitlist.addPassenger({ id: 2, name: "Bob Johnson" });
    waitlist.addPassenger({ id: 3, name: "Charlie Brown" });
    // View the current waitlist
    waitlist.viewWaitlist();
    // Assign seats (seats become available)
    console.log("\nAssigning available seats...");
    waitlist.assignSeat(); // Charlie gets a seat (last-in, first-out)
    waitlist.assignSeat(); // Bob gets a seat
    // Add another passenger
    waitlist.addPassenger({ id: 4, name: "Diana Miller" });
    // View updated waitlist
    waitlist.viewWaitlist();
    // Assign more seats
    console.log("\nAssigning more available seats...");
    waitlist.assignSeat(); // Diana gets a seat
    waitlist.assignSeat(); // Alice gets a seat
    // Check if waitlist is empty
    console.log(`\nWaitlist is empty: ${waitlist.isEmpty()}`);
}
// Run the demonstration
demonstrateRailwayReservation();
