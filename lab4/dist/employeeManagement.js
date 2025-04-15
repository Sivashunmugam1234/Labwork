"use strict";
// Base Employee class
class Employee {
    constructor(name, id, salary = 0) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    // Method to display employee details
    displayDetails() {
        console.log(`
        Employee ID: ${this.id}
        Name: ${this.name}
        Salary: $${this.calculateSalary().toFixed(2)}
      `);
    }
}
// Full-Time Employee class
class FullTimeEmployee extends Employee {
    constructor(name, id, monthlySalary) {
        super(name, id);
        this.monthlySalary = monthlySalary;
    }
    calculateSalary() {
        return this.monthlySalary;
    }
}
// Part-Time Employee class
class PartTimeEmployee extends Employee {
    constructor(name, id, hourlyWage, hoursWorked) {
        super(name, id);
        this.hourlyWage = hourlyWage;
        this.hoursWorked = hoursWorked;
    }
    calculateSalary() {
        return this.hourlyWage * this.hoursWorked;
    }
}
// Usage example
const fullTimeEmployee = new FullTimeEmployee("John Doe", "FT001", 5000);
const partTimeEmployee = new PartTimeEmployee("Jane Smith", "PT001", 25, 80);
console.log("Full-Time Employee Details:");
fullTimeEmployee.displayDetails();
console.log("Part-Time Employee Details:");
partTimeEmployee.displayDetails();
