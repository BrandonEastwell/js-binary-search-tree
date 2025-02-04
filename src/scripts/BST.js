import Node from "./Node";

export default class BST {
  constructor(arr = []) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    arr = this.removeDuplicates(arr);
    arr = this.sort(arr);
    console.log(arr)
    return this.arrToBST(arr, 0, arr.length - 1)
  }

  arrToBST(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2)
    let root = new Node(arr[mid]);
    root.left = this.arrToBST(arr, start, mid - 1);
    root.right = this.arrToBST(arr, mid + 1, end);

    console.log(root)

    return root
  }

  getLeftMost(root) {
    root = root.right;
    while (root.left !== null) {
      root = root.left;
    }
    return root
  }

  insert(root, value) {
    if (root === null) return new Node(value);
    if (root.value === value) return root;

    if (value < root.value) this.insert(root.left, value);
    if (value > root.value) this.insert(root.right, value);

    return root;
  }

  deleteItem(root, value) {
    if (root === null) return root;

    if (root.value > value) root.left = this.deleteItem(root.left, value); // I do not fully understand why I am assigning the result of recursion function to the root.left or root.right
    else if (root.value < value) root.right = this.deleteItem(root.right, value);
    else if (root.value === value) {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
      let leftMost = this.getLeftMost(root);
      root.value = leftMost.value;
      root.right = this.deleteItem(root.right, leftMost.value); // I do not understand this line
    }

    return root;
  }

  find(root, value) {
    if (root === null || root.value === value) return root;
    if (root.value > value) return this.find(root.left, value);
    else return this.find(root.right, value);
  }

  levelOrder(callback = node => console.log(node.value)) {
    let queue = [this.root];

    while(queue.length > 0) {
      const node = queue.shift();

      callback(node);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  inOrder(root = this.root, callback = node => console.log(node.value)) {
    if (root === null) return
    this.inOrder(root.left, callback);
    callback(root);
    this.inOrder(root.right, callback);
  }

  preOrder(root = this.root, callback = node => console.log(node.value)) {
    if (root === null) return
    callback(root);
    this.preOrder(root.left, callback);
    this.preOrder(root.right, callback);
  }

  postOrder(root = this.root, callback = node => console.log(node.value)) {
    if (root === null) return
    this.postOrder(root.left, callback);
    this.postOrder(root.right, callback);
    callback(root);
  }

  height(node = this.root) {
    if (node === null) return -1;
    if (node.left === null && node.right === null) return 0;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
  }

  depth(node) {
    helper(this.root, node, 0);
    function helper(cur = this.root, node, depth) {
      if (node === null) return -1;
      if (node.value === cur.value) return depth;

      let left = depth(cur.left, node, depth + 1);
      if (left !== -1) return left;
      return helper(cur.right, node, depth + 1)
    }
  }

  isBalanced(node = this.root) {
    function checkHeight(node) {
      if (node === null) return 0;

      let leftHeight = checkHeight(node.left);
      let rightHeight = checkHeight(node.right);

      if (leftHeight === -1 || rightHeight === -1) return -1;
      if ((leftHeight - rightHeight) > 1 || (rightHeight - leftHeight) > 1) return -1;
      else return 1
    }

    return !!checkHeight(node);
  }

  reBalanced() {
    let sortedArr = [];
    this.inOrder(this.root, node => {
      sortedArr.push(node.value);
    });
    this.root = this.buildTree(sortedArr);
  }

  sort(arr) {
    arr.sort((a, b) => {
      return a - b;
    })
    return arr;
  }

  removeDuplicates(arr) {
    return arr.filter((value, index) => arr.indexOf(value) === index)
  }
}
