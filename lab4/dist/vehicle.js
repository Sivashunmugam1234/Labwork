"use strict";
// Base Vehicle class
class Vehicle {
    constructor(brand, model, baseRentalPrice) {
        this.brand = brand;
        this.model = model;
        this.baseRentalPrice = baseRentalPrice;
    }
    // Method to display vehicle details
    displayDetails() {
        console.log(`
        Brand: ${this.brand}
        Model: ${this.model}
        Base Rental Price: $${this.baseRentalPrice.toFixed(2)} per day
      `);
    }
}
// Car subclass
class Car extends Vehicle {
    constructor(brand, model, baseRentalPrice, numberOfSeats) {
        super(brand, model, baseRentalPrice);
        this.numberOfSeats = numberOfSeats;
    }
    calculateTotalRentalCost(days) {
        // For cars, we can add a premium for more seats
        const seatPremium = this.numberOfSeats > 5 ? 10 : 0; // $10 premium for cars with more than 5 seats
        return (this.baseRentalPrice + seatPremium) * days;
    }
    // Override displayDetails to include car-specific information
    displayDetails() {
        super.displayDetails();
        console.log(`      Number of Seats: ${this.numberOfSeats}`);
    }
}
// Bike subclass
class Bike extends Vehicle {
    constructor(brand, model, baseRentalPrice, engineCC) {
        super(brand, model, baseRentalPrice);
        this.engineCC = engineCC;
    }
    calculateTotalRentalCost(days) {
        // For bikes, we can add a premium based on engine capacity
        const enginePremium = this.engineCC > 500 ? 15 : 0; // $15 premium for bikes with engine > 500cc
        return (this.baseRentalPrice + enginePremium) * days;
    }
    // Override displayDetails to include bike-specific information
    displayDetails() {
        super.displayDetails();
        console.log(`      Engine Capacity: ${this.engineCC}cc`);
    }
}
// Usage example
const sedan = new Car("Toyota", "Camry", 50, 5);
const suv = new Car("Honda", "CR-V", 65, 7);
const sportBike = new Bike("Ducati", "Panigale", 80, 1000);
const scooter = new Bike("Vespa", "Primavera", 30, 150);
console.log("Car Details:");
sedan.displayDetails();
console.log(`Total cost for 3 days: $${sedan.calculateTotalRentalCost(3).toFixed(2)}`);
console.log("\nSUV Details:");
suv.displayDetails();
console.log(`Total cost for 5 days: $${suv.calculateTotalRentalCost(5).toFixed(2)}`);
console.log("\nSport Bike Details:");
sportBike.displayDetails();
console.log(`Total cost for 2 days: $${sportBike.calculateTotalRentalCost(2).toFixed(2)}`);
console.log("\nScooter Details:");
scooter.displayDetails();
console.log(`Total cost for 7 days: $${scooter.calculateTotalRentalCost(7).toFixed(2)}`);
