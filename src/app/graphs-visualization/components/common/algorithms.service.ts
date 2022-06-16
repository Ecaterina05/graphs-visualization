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

  Dijkstra(adjacencyList: Array<Array<{ label: number, weight: number }>>, startNode: number, finishNode: number) {
    let distance: number[] = [];
    let visitedNode: boolean[] = [];
    let father: number[] = [];
    let distanceMarkedAsInfinite: boolean[] = [];

    let nodeAndDistance: Array<{ node: number, distance: number }> = [];
    let numberOfNodes = adjacencyList.length - 1;

    for(let i=1; i<adjacencyList.length; i++) {
      if(i != startNode) {
        nodeAndDistance.push({node: i, distance: Number.MAX_VALUE});
        distance[i] = Number.MAX_VALUE;
        distanceMarkedAsInfinite[i] = true;
        visitedNode[i] = false;
      }
    }

    distance[startNode] = 0;

    let i = 0;
    let node = startNode;
    visitedNode[node] = true;

    while(numberOfNodes != 0) {
      this.coloredNodesOrder[i] = [];

      adjacencyList[node].forEach((neighbour: {label: number ,  weight: number}) => {
        if(distance[node] + neighbour.weight < distance[neighbour.label]) {
          distance[neighbour.label] = distance[node] + neighbour.weight;
          distanceMarkedAsInfinite[neighbour.label] = false;
          nodeAndDistance.forEach(el => {
            if(el.node == neighbour.label) {
              el.distance = distance[neighbour.label];
            }
          });
        }
      });

      let unvisitedNodes: Array<{ node: number, distance: number }> = [];
      nodeAndDistance.forEach(el => {
        if(visitedNode[el.node] == false) {
          unvisitedNodes.push(el);
        }
      });
      let nodeSelectedNext = unvisitedNodes[0];
      unvisitedNodes.shift();
      unvisitedNodes.forEach(el => {
        if(el.distance < nodeSelectedNext.distance && visitedNode[el.node] == false) {
          nodeSelectedNext = el;
        }
      });
      if(nodeSelectedNext && distanceMarkedAsInfinite[nodeSelectedNext.node] == false) {
        father[nodeSelectedNext.node] = node;
        visitedNode[nodeSelectedNext.node] = true;
        node = nodeSelectedNext.node;
        this.coloredNodesOrder[i].push(node);
        i = i + 1;
      }
      numberOfNodes--;
    }

    this.coloredPath.push(finishNode);
    while(finishNode != startNode) {
      finishNode = father[finishNode];
      this.coloredPath.push(finishNode);
    }

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






