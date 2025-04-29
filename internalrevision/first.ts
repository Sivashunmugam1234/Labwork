    interface customer{
        name:string;
        id:string;
    }

    interface product{
        productName:string;
        productId:string;    
    }

    interface orders{
        customerId:string;
        productId:string;
    }


    class listNode{
        order:orders;
        nextNode:listNode|null=null;
        constructor(order:orders){
            this.order=order;
        }
    }

    class LinkedList{
        head:listNode|null=null;
        append(order:orders):void{
            const newNode=new listNode(order);

            if(this.head==null){
                this.head=newNode;
            }
            else{
                let currentHead=this.head;
                this.head=newNode;
                this.head.nextNode=currentHead;
            }
        }

        dispatch(order:orders):listNode|null{

            if (!this.head){
                return null;
            }

            if(this.head.order.customerId==order.customerId&&this.head.order.productId==order.productId){
                let currentHead=this.head;
                this.head=this.head.nextNode;
                return currentHead;
            }
            else{
                let currentHead=this.head;
                while(currentHead.nextNode){
                    if(currentHead.nextNode.order.customerId==order.customerId&& currentHead.nextNode.order.productId==order.productId){
                        let match=currentHead.nextNode;
                        currentHead.nextNode=currentHead.nextNode.nextNode?currentHead.nextNode.nextNode:null
                        return match;
                    }
                    currentHead=currentHead.nextNode
                }
            }
            return null;
        }

        printList(): void {
            let current = this.head;
            while (current) {
                console.log(current.order);
                current = current.nextNode;
            }
        }
        

        
    }

    // Test Function
function runTests() {
    const linkedList = new LinkedList();

    const order1: orders = { customerId: "cust1", productId: "prod1" };
    const order2: orders = { customerId: "cust2", productId: "prod2" };
    const order3: orders = { customerId: "cust3", productId: "prod3" };

    // Append orders
    linkedList.append(order1);
    linkedList.append(order2);
    linkedList.append(order3);

    // Check order of insertion (linked list: order3 -> order2 -> order1)
    console.log("Before dispatch:");
    let current = linkedList.head;
    while (current) {
        console.log(current.order);
        current = current.nextNode;
    }

    // Dispatch order2
    const dispatched = linkedList.dispatch({ customerId: "cust2", productId: "prod2" });

    console.log("\nDispatched Order:");
    console.log(dispatched?.order);

    // Remaining list
    console.log("\nAfter dispatch:");
    current = linkedList.head;
    while (current) {
        console.log(current.order);
        current = current.nextNode;
    }
}

runTests();