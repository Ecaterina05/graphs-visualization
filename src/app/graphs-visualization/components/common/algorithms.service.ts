import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {
  coloredNodesOrder: Array<Array<number>> = [[]];

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

  Dijkstra(adjacencyList: Array<Array<{ label: number, weight: number }>>, startNode: number) {
    let distance: number[] = [];
    let visitedNode: boolean[] = [];
    let father: number[] = [];
    let numberOfNodes = adjacencyList.length - 1;

    for(let i=1; i<adjacencyList.length; i++) {
      distance[i] = Number.MAX_VALUE;
      visitedNode[i] = false;
    }

    distance[startNode] = 0;
    let minimumDistance: Array<{ distanceCalculated: number, temporaryNode: number }> = [];

    let i = 0;
    let node = startNode;
    while(numberOfNodes != 0) {
      this.coloredNodesOrder[i] = [];
      visitedNode[node] = true;
      adjacencyList[node].forEach((neighbour: {label: number ,  weight: number}) => {
        if(distance[node] + neighbour.weight < distance[neighbour.label]) {
          distance[neighbour.label] = distance[node] + neighbour.weight;
        }
        minimumDistance.push({distanceCalculated: distance[neighbour.label], temporaryNode: neighbour.label});
      })
      let nodeSelectedNext = minimumDistance[0];
      minimumDistance.shift();
      minimumDistance.forEach(el => {
        if(el.distanceCalculated < nodeSelectedNext.distanceCalculated && visitedNode[el.temporaryNode] == false) {
          nodeSelectedNext = el;
        }
      });
      father[nodeSelectedNext.temporaryNode] = node;
      node = nodeSelectedNext.temporaryNode;
      this.coloredNodesOrder[i].push(node);
      console.log(this.coloredNodesOrder);
      i = i + 1;
      numberOfNodes--;
    }

    return this.coloredNodesOrder;
  }
}





