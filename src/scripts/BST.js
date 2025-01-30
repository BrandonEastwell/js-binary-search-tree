import Node from "./Node";

export default class BST {
  constructor(array = []) {
    this.array = array;
  }
  root = []

  buildTree(arr) {
    arr = this.removeDuplicates(arr);
    arr = this.sort(arr);
    return this.arrToBST(arr, 0, arr.length - 1)
  }

  arrToBST(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor(start + end) / 2
    let root = new Node(arr[mid])
    root.left = this.arrToBST(arr, start, mid - 1);
    root.right = this.arrToBST(arr, mid + 1, end);

    return root
  }

  sort(arr) {
    arr.sort((a, b) => {
      return a > b;
    })
    return arr;
  }

  removeDuplicates(arr) {
    return arr.filter((value, index) => arr.indexOf(value) === index)
  }
}
