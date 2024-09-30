// Node class for the Queue
class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  export class Queue {
    constructor() {
      this.head = null; 
      this.tail = null;
      this.length = 0; 
    }
  
    enqueue(data) {
      const newNode = new Node(data);
      if (this.tail) {
        this.tail.next = newNode;
      } else {
        this.head = newNode; 
      }
      this.tail = newNode;
      this.length++;
    }
  
    dequeue() {
      if (!this.head) {
        return null;
      }
      const dequeuedData = this.head.data;
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null; 
      }
      this.length--;
      return dequeuedData;
    }
  
    peek() {
      return this.head ? this.head.data : null;
    }
  
    size() {
      return this.length;
    }
  
    get(index) {
      if (index < 0 || index >= this.length) {
        return null;
      }
      let currentNode = this.head;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
      return currentNode.data;
    }
  }