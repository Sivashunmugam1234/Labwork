var listNode = /** @class */ (function () {
    function listNode(order) {
        this.nextNode = null;
        this.order = order;
    }
    return listNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
    }
    LinkedList.prototype.append = function (order) {
        var newNode = new listNode(order);
        if (this.head == null) {
            this.head = newNode;
        }
        else {
            var currentHead = this.head;
            this.head = newNode;
            this.head.nextNode = currentHead;
        }
    };
    LinkedList.prototype.dispatch = function (order) {
        if (!this.head) {
            return null;
        }
        if (this.head.order.customerId == order.customerId && this.head.order.productId == order.productId) {
            var currentHead = this.head;
            this.head = this.head.nextNode;
            return currentHead;
        }
        else {
            var currentHead = this.head;
            while (currentHead.nextNode) {
                if (currentHead.nextNode.order.customerId == order.customerId && currentHead.order.productId == order.productId) {
                    var match = currentHead.nextNode;
                    currentHead.nextNode = currentHead.nextNode.nextNode ? currentHead.nextNode.nextNode : null;
                    return match;
                }
                currentHead = currentHead.nextNode;
            }
        }
        return null;
    };
    return LinkedList;
}());
// Test Function
function runTests() {
    var linkedList = new LinkedList();
    var order1 = { customerId: "cust1", productId: "prod1" };
    var order2 = { customerId: "cust2", productId: "prod2" };
    var order3 = { customerId: "cust3", productId: "prod3" };
    // Append orders
    linkedList.append(order1);
    linkedList.append(order2);
    linkedList.append(order3);
    // Check order of insertion (linked list: order3 -> order2 -> order1)
    console.log("Before dispatch:");
    var current = linkedList.head;
    while (current) {
        console.log(current.order);
        current = current.nextNode;
    }
    // Dispatch order2
    var dispatched = linkedList.dispatch({ customerId: "cust2", productId: "prod2" });
    console.log("\nDispatched Order:");
    console.log(dispatched === null || dispatched === void 0 ? void 0 : dispatched.order);
    // Remaining list
    console.log("\nAfter dispatch:");
    current = linkedList.head;
    while (current) {
        console.log(current.order);
        current = current.nextNode;
    }
}
runTests();
