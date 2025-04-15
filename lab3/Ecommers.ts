interface Order {
    id: number;
    customerName: string;
    items: string[];
    totalAmount: number;
    timestamp: Date;
  }
  
  class OrderNode {
    order: Order;
    next: OrderNode | null;
    
    constructor(order: Order) {
      this.order = order;
      this.next = null;
    }
  }
  
  class OrderLinkedList {
    private head: OrderNode | null = null;
    private tail: OrderNode | null = null;
    private size: number = 0;
    
    public addOrder(order: Order): void {
      const newNode = new OrderNode(order);
      
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        }
      }
      
      this.size++;
      console.log(`Order #${order.id} from ${order.customerName} added to the queue`);
    }
    
    public processOrder(): Order | null {
      if (!this.head) {
        console.log("No orders to process");
        return null;
      }
      
      const processedOrder = this.head.order;
      this.head = this.head.next;
      
      if (!this.head) {
        this.tail = null;
      }
      
      this.size--;
      console.log(`Processed order #${processedOrder.id} from ${processedOrder.customerName}`);
      return processedOrder;
    }
    
    public displayOrders(): void {
      console.log("\n--- Pending Orders ---");
      
      if (!this.head) {
        console.log("No pending orders");
        return;
      }
      
      let current: OrderNode | null = this.head;
      let position = 1;
      
      while (current) {
        const order = current.order;
        console.log(`${position}. Order #${order.id} - ${order.customerName}`);
        console.log(`   Items: ${order.items.join(", ")}`);
        console.log(`   Total: $${order.totalAmount.toFixed(2)}`);
        console.log(`   Time: ${order.timestamp.toLocaleString()}`);
        console.log("   ---------------");
        
        current = current.next;
        position++;
      }
      
      console.log(`Total pending orders: ${this.size}`);
    }
    
    public getSize(): number {
      return this.size;
    }
    
    public isEmpty(): boolean {
      return this.size === 0;
    }
  }
  
  function demonstrateEcommerceOrders(): void {
    const orderQueue = new OrderLinkedList();
    
    orderQueue.addOrder({
      id: 101,
      customerName: "John Doe",
      items: ["Laptop", "Mouse"],
      totalAmount: 1299.99,
      timestamp: new Date()
    });
    
    orderQueue.addOrder({
      id: 102,
      customerName: "Jane Smith",
      items: ["Smartphone", "Protective Case", "Charger"],
      totalAmount: 899.97,
      timestamp: new Date()
    });
    
    orderQueue.addOrder({
      id: 103,
      customerName: "Mike Johnson",
      items: ["Headphones", "Keyboard"],
      totalAmount: 249.98,
      timestamp: new Date()
    });
    
    orderQueue.displayOrders();
    
    console.log("\nProcessing orders...");
    orderQueue.processOrder(); 
    orderQueue.addOrder({
      id: 104,
      customerName: "Sarah Williams",
      items: ["Monitor", "USB Hub", "HDMI Cable"],
      totalAmount: 499.97,
      timestamp: new Date()
    });
    
    orderQueue.displayOrders();
    
    console.log("\nProcessing more orders...");
    orderQueue.processOrder(); 
    orderQueue.processOrder();
    
    orderQueue.displayOrders();
  }
  
  demonstrateEcommerceOrders();