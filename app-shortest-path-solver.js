let graph = {
  finishNode: {}
};

let createdNodes = [];
let snackbarMsg;

$("body").on("click", "button.node-child-btn", function (e) {
  e.preventDefault();
  let childName = $("#" + $(this).parent().attr('id').split("-", 1)[0] + "-child-name-input").val();
  let childDistance = $("#" + $(this).parent().attr('id').split("-", 1)[0] + "-child-distance-input").val();
  let childParent = $(this).parent().attr('id').split("-", 1)[0];

  if (createdNodes.includes(childName) || childName == "" || childDistance == "") return false;

  if (childName == "finishNode") {
    createdNodes.push(childName);
    snackbarMsg = "Created node " + childName + " with distance " + childDistance + " from " + childParent + ".";
    document.querySelector(".snackbar-1").innerHTML = snackbarMsg;
    $(".snackbar-1").addClass("shown"); setTimeout(function () { $(".snackbar-1").removeClass("shown"); }, 600 + 300);

    if (!graph[childParent]) graph[childParent] = {};

    graph[childParent][childName] = Number(childDistance);
    console.log(graph);
  }

  else {
    let newContainerDiv = document.createElement("DIV");
    newContainerDiv.classList.add("container");
    newContainerDiv.setAttribute("id", childName + "-container");

    let newNodeNameInput = document.createElement("INPUT");
    newNodeNameInput.setAttribute("type", "text");
    newNodeNameInput.setAttribute("value", childName);
    newNodeNameInput.setAttribute("disabled", "");

    let newNodeChildNameInput = document.createElement("INPUT");
    newNodeChildNameInput.setAttribute("type", "text");
    newNodeChildNameInput.setAttribute("id", childName + "-child-name-input");
    newNodeChildNameInput.setAttribute("placeholder", "Name of child");

    let newNodeChildDistanceInput = document.createElement("INPUT");
    newNodeChildDistanceInput.setAttribute("type", "text");
    newNodeChildDistanceInput.setAttribute("id", childName + "-child-distance-input");
    newNodeChildDistanceInput.setAttribute("placeholder", "Distance to child");

    let newNodeChildBtn = document.createElement("BUTTON");
    newNodeChildBtn.classList.add("node-child-btn");
    newNodeChildBtn.setAttribute("id", childName + "-child-btn");
    newNodeChildBtn.innerHTML = "+";
    newContainerDiv.appendChild(newNodeNameInput);
    newContainerDiv.appendChild(document.createElement("HR"));
    newContainerDiv.appendChild(newNodeChildNameInput);
    newContainerDiv.appendChild(document.createElement("HR"));
    newContainerDiv.appendChild(newNodeChildDistanceInput);
    newContainerDiv.appendChild(newNodeChildBtn);
    document.getElementById("shortest-path-solver-middle-container").appendChild(newContainerDiv);

    createdNodes.push(childName);
    snackbarMsg = "Created node " + childName + " with distance " + childDistance + " from " + childParent + ".";
    document.querySelector(".snackbar-1").innerHTML = snackbarMsg;
    $(".snackbar-1").addClass("shown"); setTimeout(function () { $(".snackbar-1").removeClass("shown"); }, 600 + 300);

    if (!graph[childParent]) graph[childParent] = {};

    graph[childParent][childName] = Number(childDistance);
    console.log(graph);
  }
});

document.querySelector("#shortest-path-solver-equals-btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log('dijkstra', dijkstra(graph));
  $(".snackbar-2").addClass("shown"); setTimeout(function () { $(".snackbar-2").removeClass("shown"); }, 2500 + 300);
});

// ------------------------------------------------------------
// Inspired by: https://replit.com/@stella_sighs/dijkstramedium
// ------------------------------------------------------------
// Auxilliary function
let findLowestCostNode = function (costs, processed) {
  // To reduce nodes in costs to lowest cost node (Accumulator: lowest; Iterated dummy: node;)
  return lowestCostNode = Object.keys(costs).reduce(function (lowest, node) {
    // Guard clause: To guard against non-existent lowest
    if (lowest === null && !processed.includes(node)) { lowest = node; }
    // To set lowest to node if node cost is less than existent lowest node
    if (costs[node] < costs[lowest] && !processed.includes(node)) { lowest = node; }
    return lowest;
  }, null);
};

// Main function
let dijkstra = function (graph) {
  // Initialiser: To initialise costs by adding startNode (child costs) and finishNode (child cost of Infinity)
  let costs = Object.assign({ finishNode: Infinity }, graph.startNode);

  // Initialiser: To initialise parents by adding finishNode (pointing to null as no optimalPath has been found yet
  let parents = { finishNode: null };

  // Initialiser: For each child of startNode, point (each child of startNode) to startNode as parent
  for (let startNodeChild in graph.startNode) {
    parents[startNodeChild] = 'startNode';
  }

  // Initialiser: To initialise processed as empty array
  let processed = [];

  // Initialiser: To initialise node as lowest cost node of startNode
  let node = findLowestCostNode(costs, processed);

  // Initialiser: To initialise optimalPath as "finishNode"
  let optimalPath = ['finishNode'];

  // Loop: To use Dijkstra's "formula" to process (consider) existent nodes
  while (node) {
    let currentNodeChildren = graph[node];
    let currentNodeCost = costs[node];
    // Loop: For each currentNodeChild,...
    for (let currentNodeChild in currentNodeChildren) {
      // ...calculate newBridgeCost and...
      let newBridgeCost = currentNodeChildren[currentNodeChild];
      // ...apply Dijkstra's "formula"
      // (if cost(i) + cost(i, j) < cost(j) then cost(j) = cost(i) + cost(i, j),
      // where cost(i) = currentNodeCost; cost(j) = newBridgeCost; cost(i, j) = costs[currentNodeChild];)...
      if (!costs[currentNodeChild] || currentNodeCost + newBridgeCost < costs[currentNodeChild]) {
        // ...to update currentNodeChild cost, as well as...
        costs[currentNodeChild] = currentNodeCost + newBridgeCost;
        // ...to update currentNodeChild parent, if conditions are met
        parents[currentNodeChild] = node;
      }
    }
    // To add node to processed
    processed.push(node);
    // To set node to new lowestCostNode, using updated costs and processed
    node = findLowestCostNode(costs, processed);
  }

  // Initialiser: To initialise parent as finishNode's parent, after Dijkstra's "formula" has finished running
  let parent = parents.finishNode;

  // Loop: For each existent node with parent,...
  while (parent) {
    // ...push parent to optimalPath array and...
    optimalPath.push(parent);
    // ...set new parent to grandparent
    parent = parents[parent];
  }

  // To reverse order from "...child-parent-grandparent..." to "...grandparent-parent-child..."
  optimalPath.reverse();

  return {
    distance: costs.finishNode,
    path: optimalPath
  };
};

/*
let graph = {
  startNode: { A: 5, B: 2 },
  A: { C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finishNode: 3 },
  D: { finishNode: 1 },
  finishNode: {}
};
*/



