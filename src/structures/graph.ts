/**
 * Simple graph class
 */
import { Queue } from "./queue";

enum Visited {
  WHITE = 0,  // not yet visited
  GREY = 1,   // visited but not fully explored
  BLACK = 2   // fully explored (all edges have been travelled)
}

export class Graph<T> {
  private vertices: T[];
  private edges: Map<T, T[]>;
  private directed: boolean;

  constructor(directed: boolean = false, init?: Map<T, T[]>) {
    this.vertices = [];
    this.edges = new Map();
    this.directed = directed;

    if (init) {
      this.edges = init;
      this.vertices = Array.from(init.keys()).sort()
    }
  }

  addVertex = (v: T) => {
    // If we don't have this vertex in our list, then add it, and also add an initial empty Map
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.edges.set(v, [])
    }
  }

  addEdge = (v1: T, v2: T) => {
    // To add an edge, we need to veritices.  First, we check if the first vertex is in our edges
    // map.  If it isn't, we add it to our vertices array.  Otherwise, we check if we need to add to
    // our edge map.  We 
    const setVertices = (a: T, b: T, directed: boolean) => {
      let vert1 = this.edges.get(a);
      if (!vert1) {
        this.addVertex(a);
      } else {
        if (directed) {
          vert1.push(b)
        }
      }
    }

    setVertices(v1, v2, true);
    setVertices(v2, v1, this.directed);
  }

  getVertices = () => {
    return this.vertices
  }

  getEdges = () => {
    return this.edges
  }

  toString = () => {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) { // {15}
      s += `${this.vertices[i]} -> `;
      const neighbors = this.edges.get(this.vertices[i]) || []; // {16}
      for (let j = 0; j < neighbors.length; j++) { // {17}
        s += `${neighbors[j]} `;
      }
      s += '\n'; // {18}
    }
    return s;
  }

  initializeVisited = (verts: T[]) => {
    const color: Map<T, Visited> = new Map();
    for (let item of verts) {
      color.set(item, Visited.WHITE);
    }

    return color;
  }

  bfs = () => {
    const queue = new Queue();
    const colors = this.initializeVisited(this.vertices);

    // Look for our vertices in this.edges
    
    for (let [v, e] of this.edges) {
      let vert = colors.get(v);
      if (vert) {
        vert = Visited.GREY
      }
    }
  }
}