import "../styles/normalize.css";
import "../styles/styles.css";
import BST from "./BST";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : `   `}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const randArrOfNum = (length) => {
  let arr = [];
  while (length > 0) {
    arr.push(Math.round(Math.random() * 100))
    length--;
  }
  return arr;
}

let tree = new BST(randArrOfNum(Math.random() * 10));
console.log(tree.isBalanced());

tree.levelOrder();
tree.preOrder();
tree.postOrder();
tree.inOrder();

tree.insert(tree.root, Math.round(Math.random() * 1000));
tree.insert(tree.root, Math.round(Math.random() * 1000));
tree.insert(tree.root, Math.round(Math.random() * 1000));
tree.insert(tree.root, Math.round(Math.random() * 1000));
tree.insert(tree.root, Math.round(Math.random() * 1000));
tree.insert(tree.root, Math.round(Math.random() * 1000));

console.log(tree.isBalanced());
tree.reBalanced();
console.log(tree.isBalanced());

tree.levelOrder();
tree.preOrder();
tree.postOrder();
tree.inOrder();

prettyPrint(tree.root);