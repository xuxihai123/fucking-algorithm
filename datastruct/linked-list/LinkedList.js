/**
 * 一个链表节点包含
 * 1. 数据域
 * 2. 下一个节点的指针
 * @param {*} val
 */

import LinkedListNode from './LinkedListNode';

class LinkedList {
  constructor() {
    this.head = null; // 头指针
    this.tail = null; // 尾指针
    this.size = 0;
  }
  append(value) {
    var linknode = new LinkedListNode(value);
    if (this.head === null) {
      this.head = linknode;
      this.tail = linknode;
    } else {
      const lastnode = this.tail;
      lastnode.next = linknode;
      this.tail = linknode;
    }
    this.size++;
  }
  prepend(val) {
    var linknode = new LinkedListNode(val);
    if (this.head === null) {
      this.head = linknode;
      this.tail = linknode;
    } else {
      const headnode = this.head;
      linknode.next = headnode;
      this.head = linknode;
    }
    this.size++;
  }
  insert()
  contains(val) {
    var current = this.head;
    while (current !== null) {
      if (current.value === val) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  clear() {
    this.head = null;
    this.next = null;
    this.size = 0;
  }
  remove(val) {
    var previous = null;
    var current = this.head;
    while (current !== null) {
      if (current.value === val) {
        // find
        if (previous) {
          previous.next = current.next;
        } else {
          this.head = current.next;
        }
        this.size--;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }
  removeAt(index) {
    if (index > -1 && index < this.size) {
      var start = 0;
      var previous = null;
      var current = this.head;
      while (start != index) {
        previous = current;
        current = current.next;
        start++;
      }
      if (previous) {
        previous.next = current.next;
      } else {
        this.head = current.next;
      }
      this.size--;
      return index;
    } else {
      return -1;
    }
  }
  toString() {
    var current = this.head;
    var data = [];
    var index = 0;
    while (current !== null) {
      data.push(current.value);
      current = current.next;
      index++;
    }
    return data.join(',');
  }
  getSize() {
    return this.size;
  }
}

export default LinkedList;
