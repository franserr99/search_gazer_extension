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

// find the book card element from given coordinates.
// this is the main functions others will use
const findBookCardElement = (x, y) => {
  const element = document.elementFromPoint(x, y);
  if (isTopLevelContainer(element) || !element) return null;

  if (isTargetSubtreeRoot(element)) return element;

  return findParentNodeMatch(element);
};
// -----------------------------------------------------------------------------------------
// -------------------------------- HELPER FUNCTIONS ---------------------------------------
// -----------------------------------------------------------------------------------------

// takes an arr and some value, checks if that is in the value
const matchesAnyType = (attributeValue, types) => {
  // split by space, in html you can have more than one class name or id
  // each will be delim by some space
  const values = attributeValue.split(" ");
  return values.some((value) => types.includes(value));
};

// main logic to iterate up the dom tree
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
// leaf we can iterate up from
const isKnownLeaf = (element) => {
  return (
    matchesAnyType(element.id?.trim(), knownSubTreeLeafs) ||
    matchesAnyType(element.className?.trim(), knownSubTreeLeafs)
  );
};

// too high in the DOM tree to get meaningful info
const isTopLevelContainer = (node) => {
  return (
    matchesAnyType(node.className?.trim(), topLevelContainers) ||
    matchesAnyType(node.id?.trim(), topLevelContainers)
  );
};

// the subtree root we are looking for
const isTargetSubtreeRoot = (node) => {
  return (
    matchesAnyType(node.className?.trim(), knownSubTreeRoots) ||
    matchesAnyType(node.id?.trim(), knownSubTreeRoots)
  );
};

// check if the traversal has reached the root or failed to find a match.
const isRootOrFailed = (node) => {
  if (!node || node === document) {
    return true;
  }
  return false;
};

// Logging function for elements.
const logElement = (element) => {
  console.log(element.id, ",", element.className, ",", element.tagName);
};
// ------------------------------------------------------------------------------------------------
// -------------------------------- END OF HELPER FUNCTIONS ---------------------------------------
// ------------------------------------------------------------------------------------------------

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
