class Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stockQuantity: number;

  constructor(id: string, name: string, price: number, description: string, stockQuantity: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.stockQuantity = stockQuantity;
  }

  updateStock(quantity: number): void {
    this.stockQuantity = quantity;
  }

  toString(): string {
    return `Product: ${this.name} - $${this.price} (${this.stockQuantity} in stock)`;
  }
}

class Customer {
  id: string;
  name: string;
  email: string;
  address: string;

  constructor(id: string, name: string, email: string, address: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
  }

  updateAddress(newAddress: string): void {
    this.address = newAddress;
  }

  toString(): string {
    return `Customer: ${this.name} (${this.email})`;
  }
}

type CartItem = {
  product: Product;
  quantity: number;
};

class Order {
  id: string;
  customerId: string;
  items: CartItem[];
  orderDate: Date;
  status: string;

  constructor(id: string, customerId: string, items: CartItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.orderDate = new Date();
    this.status = 'pending';
  }

  updateStatus(newStatus: string): void {
    this.status = newStatus;
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.product.price * item.quantity;
    }
    return total;
  }

  toString(): string {
    return `Order ${this.id}: ${this.items.length} items, total: $${this.calculateTotal()}`;
  }
}

class ShoppingCart {
  customer: Customer | null = null;
  items: CartItem[] = [];

  setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  addItem(product: Product, quantity: number = 1): void {
    for (const item of this.items) {
      if (item.product.id === product.id) {
        item.quantity += quantity;
        return;
      }
    }
    this.items.push({ product, quantity });
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === productId) {
        if (quantity <= 0) {
          this.removeItem(productId);
        } else {
          this.items[i].quantity = quantity;
        }
        return;
      }
    }
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.product.price * item.quantity;
    }
    return total;
  }

  checkout(): Order | null {
    if (!this.customer || this.isEmpty()) {
      return null;
    }

    const order = new Order(
      `ORD-${Date.now()}`,
      this.customer.id,
      [...this.items]
    );

    this.clear();
    
    return order;
  }

  toString(): string {
    if (this.isEmpty()) {
      return "Shopping Cart: Empty";
    }
    
    let result = "Shopping Cart:\n";
    for (const item of this.items) {
      const itemTotal = item.product.price * item.quantity;
      result += `  - ${item.product.name}: ${item.quantity} x $${item.product.price} = $${itemTotal}\n`;
    }
    result += `Total: $${this.calculateTotal()}`;
    
    return result;
  }
}

function runShop() {
  const laptop = new Product(
    "p1",
    "Laptop", 
    1200,
    "High-performance laptop", 
    10
  );

  const smartphone = new Product(
    "p2",
    "Smartphone", 
    800,
    "Latest smartphone model", 
    20
  );

  const customer = new Customer(
    "c1",
    "John Doe",
    "john@example.com",
    "123 Main St"
  );

  const cart = new ShoppingCart();
  cart.setCustomer(customer);
  cart.addItem(laptop, 1);
  cart.addItem(smartphone, 2);

  console.log(cart.toString());

  const order = cart.checkout();
  if (order) {
    console.log(`Order created: ${order.toString()}`);
    order.updateStatus("shipped");
    console.log(`Order status updated to: ${order.status}`);
  }
}

runShop();