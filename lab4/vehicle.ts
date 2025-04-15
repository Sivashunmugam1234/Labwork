abstract class Vehicle {
    protected brand: string;
    protected model: string;
    protected baseRentalPrice: number;
  
    constructor(brand: string, model: string, baseRentalPrice: number) {
      this.brand = brand;
      this.model = model;
      this.baseRentalPrice = baseRentalPrice;
    }
  
    abstract calculateTotalRentalCost(days: number): number;
    displayDetails(): void {
      console.log(`
        Brand: ${this.brand}
        Model: ${this.model}
        Base Rental Price: $${this.baseRentalPrice.toFixed(2)} per day
      `);
    }
  }
  
  class Car extends Vehicle {
    private numberOfSeats: number;
  
    constructor(brand: string, model: string, baseRentalPrice: number, numberOfSeats: number) {
      super(brand, model, baseRentalPrice);
      this.numberOfSeats = numberOfSeats;
    }
  
    calculateTotalRentalCost(days: number): number {
      const seatPremium = this.numberOfSeats > 5 ? 10 : 0; 
      return (this.baseRentalPrice + seatPremium) * days;
    }
  
    displayDetails(): void {
      super.displayDetails();
      console.log(`Number of Seats: ${this.numberOfSeats}`);
    }
  }
  
  class Bike extends Vehicle {
    private engineCC: number;
  
    constructor(brand: string, model: string, baseRentalPrice: number, engineCC: number) {
      super(brand, model, baseRentalPrice);
      this.engineCC = engineCC;
    }
  
    calculateTotalRentalCost(days: number): number {
      const enginePremium = this.engineCC > 500 ? 15 : 0; 
      return (this.baseRentalPrice + enginePremium) * days;
    }
  
    displayDetails(): void {
      super.displayDetails();
      console.log(`Engine Capacity: ${this.engineCC}cc`);
    }
  }
  
  const sedan = new Car("Toyota", "Camry", 50, 5);
  const suv = new Car("Honda", "CR-V", 65, 7);
  const sportBike = new Bike("R15", "Panigale", 80, 800);
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