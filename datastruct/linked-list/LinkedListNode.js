function LinkedListNode(val, next) {
  this.value = val;
  this.next = next || null;
}

LinkedListNode.prototype.toString = function (callback) {
  return callback ? callback(this.value) : `${this.value}`;
};

export default LinkedListNode;
