abstract class Employee {
    protected name: string;
    protected id: string;
    protected salary: number;
  
    constructor(name: string, id: string, salary: number = 0) {
      this.name = name;
      this.id = id;
      this.salary = salary;
    }
  
    abstract calculateSalary(): number;
  
    displayDetails(): void {
      console.log(`
        Employee ID: ${this.id}
        Name: ${this.name}
        Salary: $${this.calculateSalary().toFixed(2)}
      `);
    }
  }
  
  class FullTimeEmployee extends Employee {
    private monthlySalary: number;
  
    constructor(name: string, id: string, monthlySalary: number) {
      super(name, id);
      this.monthlySalary = monthlySalary;
    }
  
    calculateSalary(): number {
      return this.monthlySalary;
    }
  }
  
  class PartTimeEmployee extends Employee {
    private hourlyWage: number;
    private hoursWorked: number;
  
    constructor(name: string, id: string, hourlyWage: number, hoursWorked: number) {
      super(name, id);
      this.hourlyWage = hourlyWage;
      this.hoursWorked = hoursWorked;
    }
  
    calculateSalary(): number {
      return this.hourlyWage * this.hoursWorked;
    }
  }
  
  const fullTimeEmployee = new FullTimeEmployee("John", "FT001", 5000);
  const partTimeEmployee = new PartTimeEmployee("Mathew", "PT001", 25, 80);
  
  console.log("Full-Time Employee Details:");
  fullTimeEmployee.displayDetails();
  
  console.log("Part-Time Employee Details:");
  partTimeEmployee.displayDetails();