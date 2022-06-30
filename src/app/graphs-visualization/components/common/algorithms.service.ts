import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {
  coloredNodesOrder: Array<Array<number>> = [[]];
  coloredPath: Array<number> = [];

  constructor() { }

  BFS(adjacencyList: Array<Array<{ label: number, weight: number }>>, startNode: number) {
    let i=0;
    let visited: number[] = [];
    let queue: number[] = [];

    visited.push(startNode);
    queue.push(startNode);

    while(queue.length) {
      var node = queue[0];
      queue.shift();
      this.coloredNodesOrder[i] = [];

      adjacencyList[node].forEach((neighbour: {label: number ,  weight: number}) => {
        if(!visited.find(element => element == neighbour!.label)) {
          visited.push(neighbour!.label);
          queue.push(neighbour!.label);
          this.coloredNodesOrder[i].push(neighbour!.label);
        }
      });

      if(!this.coloredNodesOrder[i].length) {
        this.coloredNodesOrder.pop();
      } else {
        i = i + 1;
      }
    }
    return this.coloredNodesOrder;
  }

  DFS(adjacencyList: Array<Array<{ label: number, weight: number }>>, startNode: number) {
    let visited: number[] = [];
    this.dfsFunction(visited, adjacencyList, startNode);

    let i=0;
    visited.shift();
    visited.forEach(nodeVisited => {
      this.coloredNodesOrder[i] = [];
      this.coloredNodesOrder[i].push(nodeVisited);
      i = i + 1;
    });
    return this.coloredNodesOrder;
  }

  dfsFunction(visited: number[], adjacencyList: Array<Array<{ label: number, weight: number }>>, node: number) {
    if(!visited.find(element => element == node)) {
      visited.push(node);
      adjacencyList[node].forEach((neighbour: {label: number ,  weight: number}) => {
        this.dfsFunction(visited, adjacencyList, neighbour.label);
      });
    }
  }

  // Dijkstra(adjacencyList: Array<Array<{ label: number, weight: number }>>, startNode: number, finishNode: number) {
  //   let distance: number[] = [];
  //   let visitedNode: boolean[] = [];
  //   let father: number[] = [];
  //   let distanceMarkedAsInfinite: boolean[] = [];

  //   let nodeAndDistance: Array<{ node: number, distance: number }> = [];
  //   let numberOfNodes = adjacencyList.length - 1;

  //   for(let i=1; i<adjacencyList.length; i++) {
  //     if(i != startNode) {
  //       nodeAndDistance.push({node: i, distance: Number.MAX_VALUE});
  //       distance[i] = Number.MAX_VALUE;
  //       distanceMarkedAsInfinite[i] = true;
  //       visitedNode[i] = false;
  //     }
  //   }

  //   distance[startNode] = 0;
  //   console.log(distance);

  //   let i = 0;
  //   let node = startNode;
  //   visitedNode[node] = true;

  //   while(numberOfNodes != 0) {
  //     this.coloredNodesOrder[i] = [];

  //     adjacencyList[node].forEach((neighbour: {label: number ,  weight: number}) => {
  //       if(distance[node] + neighbour.weight < distance[neighbour.label]) {
  //         distance[neighbour.label] = distance[node] + neighbour.weight;
  //         distanceMarkedAsInfinite[neighbour.label] = false;
  //         nodeAndDistance.forEach(el => {
  //           if(el.node == neighbour.label) {
  //             el.distance = distance[neighbour.label];
  //           }
  //         });
  //       }
  //     });

  //     let unvisitedNodes: Array<{ node: number, distance: number }> = [];
  //     nodeAndDistance.forEach(el => {
  //       if(visitedNode[el.node] == false) {
  //         unvisitedNodes.push(el);
  //       }
  //     });

  //     // distance_f.sort((a,b) => a.distance - b.distance);
  //     // nodeInPath = distance_f[0].nodeLabel;
  //     // closed_list.push(nodeInPath);
  //     // distance_f.shift();

  //     unvisitedNodes.sort((a,b) => a.distance - b.distance);
  //     let nodeSelectedNext = unvisitedNodes[0].node;
  //     unvisitedNodes.shift();

  //     // let nodeSelectedNext = unvisitedNodes[0];
  //     // unvisitedNodes.shift();
  //     // unvisitedNodes.forEach(el => {
  //     //   if(el.distance < nodeSelectedNext.distance && visitedNode[el.node] == false) {
  //     //     nodeSelectedNext = el;
  //     //   }
  //     // });
  //     if(nodeSelectedNext && distanceMarkedAsInfinite[nodeSelectedNext] == false) {
  //       father[nodeSelectedNext] = node;
  //       visitedNode[nodeSelectedNext] = true;
  //       node = nodeSelectedNext;
  //       this.coloredNodesOrder[i].push(node);
  //       i = i + 1;
  //     }
  //     numberOfNodes--;
  //   }

  //   console.log(father);
  //   this.coloredPath.push(finishNode);
  //   var nodeInFather = finishNode;
  //   var startNodeNotFound = true;

  //   // while(startNodeNotFound) {
  //   //   var fatherChosen = father[nodeInFather];
  //   //   this.coloredPath.push(fatherChosen);
  //   //   if(fatherChosen == startNode) {
  //   //     startNodeNotFound = false;
  //   //   }
  //   // }

  //   // while(nodeInFather != startNode) {
  //   //   var fatherChosen = father[nodeInFather];
  //   //   this.coloredPath.push(fatherChosen);
  //   //   nodeInFather = fatherChosen;
  //   // }

  //   console.log(this.coloredPath);

  //   return [this.coloredNodesOrder, this.coloredPath];
  // }

  Dijkstra(adjacencyList: Array<Array<{ label: number, weight: number }>>, startNode: number, finishNode: number) {
    this.coloredPath = [];
    let adjacencyListCustom: Array<{ label: number, neighbours: Array<{ label: number, weight : number }> }> = [];
    let father:  Array<{ label: number, father : number }> = [];

    for(let i=1; i<adjacencyList.length; i++) {
      var neighbours = adjacencyList[i];
      father.push({label: i, father: -1});
      adjacencyListCustom.push({label: i, neighbours: neighbours})
    }

    let nodesToVisit: Array<{ node: number, dist: number }> = [];
    let distances: Array<{ node: number, distance: number }> = [];
    let visitedNode: any[] = [];

    adjacencyListCustom.forEach(el => {
      if(el.label != startNode) {
        distances.push({node: el.label, distance: Number.MAX_VALUE});
      }
    });

    nodesToVisit.push({node: startNode, dist: 0});
    visitedNode.push(startNode);
    let i = 0;

    while(nodesToVisit.length) {
      let nodeInPath = nodesToVisit[0].node;
      visitedNode.push(nodeInPath);
      this.coloredNodesOrder[i] = [];
      this.coloredNodesOrder[i].push(nodeInPath);

      let dist = nodesToVisit[0].dist;
      nodesToVisit.shift();

      let nodeInList = adjacencyListCustom.find(node => node.label == nodeInPath);
      let nodeExtensions = nodeInList?.neighbours;

      nodeExtensions?.forEach(ext => {
        const elementVisitedIndex = visitedNode.findIndex(el => el == ext.label);
        if(elementVisitedIndex === -1) {
          let distance_var = distances.find(el => el.node == ext.label);
          if(dist + ext.weight < distance_var!.distance) {
            distance_var!.distance = dist + ext.weight;
            var nodeInFather = father.find(el => el.label == ext.label);
            nodeInFather!.father = nodeInPath;
          }
          nodesToVisit.push({node: distance_var!.node, dist: distance_var!.distance});
        }
      });

      nodesToVisit.sort((a,b) => a.dist - b.dist);

      i = i + 1;
    }

    this.coloredPath.push(finishNode);
    var nodeInFather = finishNode;

    while(nodeInFather != startNode) {
    var elementInFather = father.find(el => el.label == nodeInFather);
    var fatherChosen = elementInFather!.father;
    this.coloredPath.push(fatherChosen);
    nodeInFather = fatherChosen;
    }

    this.coloredNodesOrder.shift();
    this.coloredNodesOrder.pop();
    return [this.coloredNodesOrder, this.coloredPath];
  }

  BF(adjacencyList: Array<Array<{ label: number, weight: number }>>, startNode: number, finishNode: number) {
    let nodes: number[] = [];
    let edges: Array<{ source: number, target: number, weight: number }> = [];
    let father: number[] = [];
    let distance: number[] = [];

    for(let i=1; i<adjacencyList.length; i++) {
      nodes.push(i);
      adjacencyList[i].forEach(el => {
        edges.push({source: i, target: el.label, weight: el.weight});
      });
    }

    nodes.forEach(node => {
      distance[node] = Number.MAX_VALUE;
    });
    distance[startNode] = 0;

    for (let i = 1; i < nodes.length; ++i) {
      edges.forEach(edge => {
          if(distance[edge.source] + edge.weight < distance[edge.target]) {
            distance[edge.target] = distance[edge.source] + edge.weight;
            father[edge.target] = edge.source;
          }
      });
    }

    let fathersOrder: number[] = [];
    fathersOrder.push(finishNode);
    while(finishNode != startNode) {
      finishNode = father[finishNode];
      fathersOrder.push(finishNode);
    }

    var array = fathersOrder.reverse();
    for(let i=0; i< array.length; i++) {
      this.coloredNodesOrder[i] = [];
      this.coloredNodesOrder[i].push(array[i]);
    }
    this.coloredNodesOrder.shift();

    return this.coloredNodesOrder;
  }
}






