/*
 * This was build for this page in mind: https://www.amazon.com/Childrens-Books/b/?ie=UTF8&node=4&ref_=sv_b_6
 * If link is broken by the time you read this, refer to book.html and book_wheel.png
 * It has a wheel component that houses book card components for their frontend
 * We stripped some of the script and style tags, the last div is the one that houses the content we are targetting
 */

// three known arrays: starting points, target points, and too general to be useful points
const knownSubTreeLeafs = [];
const knownSubTreeRoots = [];
// need to double check that some of these names didnt get used at the lower levels
const topLevelContainers = [
  "a-section octopus-pc-card octopus-best-seller-card",
];

// utility function to check if an element matches any type in a given array.
const matchesAnyType = (attributeValue, types) => {
  const values = attributeValue.split(" ");
  return values.some((value) => types.includes(value));
};

// find the book card element from given coordinates.
// this is the main functions others will use
const findBookCardElement = (x, y) => {
  const element = document.elementFromPoint(x, y);
  if (isTopLevelContainer(element) || !element) return null;

  if (isTargetSubtreeRoot(element)) return element;

  return findParentNodeMatch(element);
};

// find the matching parent node.
const findParentNodeMatch = (element) => {
  if (isKnownLeaf(element)) {
    let parentNode = element.parentNode;
    while (
      parentNode &&
      !isTargetSubtreeRoot(parentNode) &&
      !isRootOrFailed(parentNode)
    ) {
      parentNode = parentNode.parentNode;
    }
    return parentNode;
  }
  return null;
};

// check if the element is a known leaf node.
const isKnownLeaf = (element) => {
  return (
    matchesAnyType(element.id?.trim(), knownSubTreeLeafs) ||
    matchesAnyType(element.className?.trim(), knownSubTreeLeafs)
  );
};

// check if the element is a top level container.
const isTopLevelContainer = (node) => {
  return (
    matchesAnyType(node.className?.trim(), topLevelContainers) ||
    matchesAnyType(node.id?.trim(), topLevelContainers)
  );
};

// check if the node matches the target subtree root.
const isTargetSubtreeRoot = (node) => {
  return (
    matchesAnyType(node.className?.trim(), knownSubTreeRoots) ||
    matchesAnyType(node.id?.trim(), knownSubTreeRoots)
  );
};

// check if the traversal has reached the root or failed to find a match.
const isRootOrFailed = (node) => {
  if (!node || node === document) {
    // log for debugging but dont log for the output text file
    // console.log("Could not find the parent node with the desired name.");
    return true;
  }
  return false;
};

// Logging function for elements.
const logElement = (element) => {
  console.log(element.id, ",", element.className, ",", element.tagName);
};

// ------------------ OLD STUFF FROM WHEN WE ADAPTED TO GOOGLE RESULTS --------------------------
// peopleAlsoAskedLeafMatch = function(element) {
//   const matchesAnyType = (attributeValue) => {
//     if (attributeValue) {
//       const values = attributeValue.split(' ');
//       return values.some(value => knownQAClassOrIDLeafs.includes(value) || knownJSNameLeafs.includes(value));
//     }
//   };

//   return matchesAnyType(element.id?.trim()) || matchesAnyType(element.className?.trim()) || matchesAnyType(element.jsname?.trim());
// }
