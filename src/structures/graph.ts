/**
 * Simple graph class
 */
import { Queue } from "./queue";
import { Stack } from "./stack";

export enum Visited {
  WHITE = 0,  // not yet visited
  GREY = 1,   // visited but not fully explored
  BLACK = 2   // fully explored (all edges have been travelled)
}

export type EdgeType<T> = Map<T, T[]>;
export type KeyValType<T> = [T, T[]][]

export class Graph<T> {
  private vertices: T[];
  private edges: EdgeType<T>;
  private directed: boolean;

  constructor(directed: boolean = false, init?: Map<T, T[]> | KeyValType<T> ) {
    this.vertices = [];
    this.edges = new Map();
    this.directed = directed;

    if (init instanceof Map) {
      this.edges = init;
      this.vertices = Array.from(init.keys()).sort();
    } else {
      if (init) {
        this.initEdges(init);
      }
    }
  }

  initEdges = (obj: KeyValType<T>) => {
    obj.forEach(([k, v]) => {
      v.forEach((i) => this.addEdge(k, i));
      if (!this.vertices.includes(k)) this.vertices.push(k)
    })
  }

  static new = <T>(directed: boolean = false, init?: Map<T, T[]> | KeyValType<T>) => {
    return new Graph(directed, init);
  }

  addVertex = (v: T) => {
    // If we don't have this vertex in our list, then add it, and also add an initial empty Map
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.edges.set(v, [])
    }
  }

  addEdge = (v1: T, v2: T) => {
    // To add an edge, we need to vertices.  First, we check if the first vertex is in our edges
    // map.  If it isn't, we add it to our vertices array.  Otherwise, we check if we need to add to
    // our edge map.  We 
    const setVertices = (a: T, b: T, directed: boolean) => {
      let vert1 = this.edges.get(a);
      if (!vert1) {
        this.addVertex(a);
        vert1 = this.edges.get(a);
        if (!vert1) throw new Error("Vertex was not added to edges")
      } 

      if (!directed) vert1.push(b)
    }

    setVertices(v1, v2, false);  // always go from v1 to v2
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
}

export const initializeVisited = <T>(verts: T[]) => {
  const color: Map<T, Visited> = new Map();
  for (let item of verts) {
    color.set(item, Visited.WHITE);
  }

  return color;
}

export const bfs = <T, R>(graph: Graph<T>, startVert: T, cb?: (arg: T) => R) => {
  // 1. Get the data we need to work with:
  // - A queue to store the vertices we traverse through
  // - The vertices of the graph
  // - The edges of the graph
  // - A map of vertices to coloring state
  // - A map of vertices to distances
  // - A map of vertices to their immediate predecessor
  const queue = new Queue<T>();  // Create the queue that will hold vertices we discover
  const vertices = graph.getVertices();
  const edges = graph.getEdges();
  const colors = initializeVisited(vertices);  // Map that holds the visited state per vertex
  const distances = new Map<T, number>();      // Map of how far each vertex is from startVert
  const predecessors = new Map<T, T[]>(); // Map of vertex, to the prior vertex
  const results = new Map<T, R>();

  // 2. Set the initial distance and predecessor
  for (let v of vertices) {
    distances.set(v, 0);
    predecessors.set(v, []);
  }

  // 3. begin the traversal
  // queue up our starting vertex.  While the queue isn't empty, dequeue an element from the
  // queue.  Then do the following:
  // - Color the vertex grey
  // - Get the edges for the vertex
  //   - If neighbors is empty, continue
  queue.enqueue(startVert);
  while(!queue.isEmpty()) {
    const start = queue.dequeue();
    if (!start) break

    let color = colors.get(start);
    if (color !== undefined && color === Visited.WHITE && cb) {
      results.set(start, cb(start));
    }
    colors.set(start, Visited.GREY);  // Mark the vertex we are on as visited

    const neighbors = edges.get(start);  // look for all the neighbors
    if (!neighbors) continue
    
    // 4. For each of the neighbors, look at the color.If it's white:
    //    - Set color to grey
    //    - Add 1 to distance
    //    - Set this exploring vertex's predecessor to start
    //    - enqueue the exploring vertex
    for (let exploring of neighbors) {
      let visitStatus = colors.get(exploring);  // Have we visited this vert before?
      if (visitStatus !== undefined && visitStatus === Visited.WHITE) {
        colors.set(exploring, Visited.GREY);  // We haven't visited, so mark as exploring
        let dist = distances.get(start);
        if (dist === undefined) {
          dist = 0;
        }
        distances.set(exploring, dist + 1);
        let preds = predecessors.get(exploring);
        if (preds === undefined) {  // Shouldn't happen, but making compiler happy
          predecessors.set(exploring, [start])
        } else {
          preds.push(start)
        }

        queue.enqueue(exploring);
      }
    }

    // 5.  At this point, we have visited all the edges of start, so color it black
    colors.set(start, Visited.BLACK);
  }

  // 6. At this point, we have walked through all vertices in the graph
  return { distances, predecessors }
}

const dfsVisit = <T>(
  vert: T,
  colors: Map<T, Visited>,
  edges: EdgeType<T>,
  stack: Stack<T>,
  cb?: (t: T) => void
) => {
  // 1. Mark vert as discovered (set to Grey)
  let exploring = colors.get(vert);
  if (exploring === undefined) throw new Error(`${vert} not in colors map`);
  if (exploring === Visited.WHITE) colors.set(vert, Visited.GREY);
  if (exploring === Visited.BLACK) return

  if (cb) cb(vert);

  // 2. For all unvisited (ie, White) neighbors of vert, explore neighbor
  let neighbors = edges.get(vert);
  if (neighbors !== undefined) {
    for (let v of neighbors) {
      let isVisited = colors.get(v);
      if (isVisited !== undefined && isVisited === Visited.WHITE) {
        dfsVisit(v, colors, edges, stack);
      }
    }
  }

  stack.push(vert);
  colors.set(vert, Visited.BLACK);
}

export const dfs = <T>(graph: Graph<T>, cb?: (t: T) => void) => {
  const stack = new Stack<T>();
  let verts = graph.getVertices();
  let colors = initializeVisited(verts);
  let edges = graph.getEdges();

  for (let v of verts) {
    dfsVisit(v, colors, edges, stack, cb);
  }
  return stack;
}

/**
 * Non recursive depth first search
 * 
 * @param graph 
 * @param cb 
 */
export const depthFirst = <T>(graph: Graph<T>, cb?: (t: T) => void) => {
  const verts = graph.getVertices();
  const edges = graph.getEdges();

  const stack = new Stack<T>();

  for (const vert of verts) {
    stack.push(vert);

    while(!stack.isEmpty()) {

    }
  }
}

