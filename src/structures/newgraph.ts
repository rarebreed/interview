import { Option, zip, range } from "../fn";
import { Queue } from "./newqueue";

export enum Visited {
  WHITE = 0,
  GREY = 1,
  BLACK = 2
}

export type KeyValList<T> = [T, T[]][];
export type EdgeType<T> = Map<T, T[]>;
export type EdgeWeight<T> = [T, number];
type Explored<T> = Map<T, Visited>;

interface Lookup<T> {
  [key: string]: T
}

interface Matrix<T> {
  [key: string]: Lookup<T>
}

export class Graph<T> {
  #vertices: T[];
  #edges: Map<T, EdgeWeight<T>[]>;
  #directed: boolean;

  constructor(directed = false, init?: KeyValList<T>) {
    this.#vertices = [];
    this.#edges = new Map();
    this.#directed = directed;

    if (init) {
      init.forEach(([k, v]) => {
        v.forEach(vert => {
          this.addEdge(k, vert);
        });

      })
    }
  }

  static new = <T>(directed = false, init?: KeyValList<T>) => {
    return new Graph(directed, init);
  }

  addVertex = (vert: T) => {
    if (!this.#vertices.includes(vert)) {
      this.#vertices.push(vert);
      this.#edges.set(vert, []);
    }
  }

  addEdge = (v1: T, v2: T, weights=[1, 1]) => {
    [v1, v2].filter(v => !this.#vertices.includes(v))
      .forEach(v => this.addVertex(v))

    const add = (vert1: T, vert2: T, weight: number) => {
      Option.Maybe(this.#edges.get(vert1))
        .mapOr([], (d) => {
          d.push([vert2, weight])
          this.#edges.set(vert1, d)
          return d;
        });
    }
  
    let [weightV1toV2, weightV2toV1] = weights;
    add(v1, v2, weightV1toV2);
    if (!this.#directed) add(v2, v1, weightV2toV1)
  }

  getVertices = () => this.#vertices;

  getEdges = () => this.#edges;

  /**
   * converts this data structure into an Adjacency Matrix
   *
   * This is not exactly typesafe, as it implies T extends an "indexable" type, which in javascript
   * would be a string or number.  Unfortunately, there's no way in typescript to put a type
   * constraint (that I know of) for the generic type T
   *
   * Note we are also faking a matrix here by using an object as an associative array
   */
  toMatrix = () => {
    let matrix: Matrix<number> = {};
    
    for(let [r, cols] of this.#edges.entries()) {
      let row = JSON.stringify(r);
      for (let [colInd, weight] of cols) {
        let colVal = JSON.stringify(colInd);
        matrix[row][colVal] = weight
      }
    }

    return matrix;
  }
}

export const initVisited = <T>(verts: T[]) => {
  return verts.reduce((acc, n) => {
    acc.set(n, Visited.WHITE)
    return acc
  }, new Map<T, Visited>())
}

export const bfs = <T, R>(graph: Graph<T>, start: T, cb?: (t: T) => R) => {
  // 1. Get the data we need to work with:
  const queue = Queue.new<T>();
  const verts = graph.getVertices();
  const edges = graph.getEdges();
  const colors = initVisited(verts);

  // 2. Set the initial distance and predecessor
  const distances = verts.reduce((acc, n) => {
    return acc.set(n, 0);
  }, new Map<T, number>());
  const predecessors = verts.reduce((acc, n) => {
    return acc.set(n, []);
  }, new Map<T, T[]>());

  const results = new Map<T, R>();
  const maybeCB = Option.Maybe(cb);

  // 3. begin the traversal
  // - queue up our starting vertex.  
  // - While the queue isn't empty, dequeue an element from the queue Then do the following:
  //   - If there's a callback, and we haven't visited yet, call callback and store result
  //   - Color the vertex grey
  //   - Get the edges for the vertex
  console.log("initial enqueue");
  queue.enqueue(start);
  while(!queue.isEmpty()) {
    queue.dequeue()
      .flatMap(exploring => {
        console.log(`dequeued ${exploring}`)
        // Call the callback if needed
        Option.Maybe(colors.get(exploring))
          .filter(color => cb !== undefined && color === Visited.WHITE)
          .map(_ => maybeCB.map(fn => results.set(exploring, fn(exploring))))

        // Set the color of exploring to grey
        colors.set(exploring, Visited.GREY);
        console.log(`Set ${exploring} to grey`)
        let maybeNeighbors = Option.Maybe(edges.get(exploring));

        // This is a common trick where you need to "thread" some value down the Functor chain The
        // problem is that sometimes, you have a T and an Option<R>, so you can use this map() trick
        // to pass them.  If maybeNeighbors is None, since we use mapOr(), we can supply a default.
        let result = maybeNeighbors.mapOr([], (neighbors) => {
          return { neighbors, exploring }
        })
        return result
      })
      .map(({neighbors, exploring}) => {
        // 4. For each of the neighbors, look at the color. If it's white:
        //    - Set color to grey
        //    - Add 1 to distance
        //    - Set this exploring vertex's predecessor to start
        //    - enqueue the exploring vertex
        for (let [neighbor, weight] of neighbors) {
          Option.Maybe(colors.get(neighbor))
            .filter(color => color === Visited.WHITE)
            .map(_ => {              
              colors.set(neighbor, Visited.GREY);  // set to grey
              Option.Maybe(distances.get(neighbor))
                .mapOr(0, distance => distances.set(neighbor, distance + 1))
              Option.Maybe(predecessors.get(neighbor))
                .map(n => n.push(exploring))
              return neighbor;
            })
            .map(neighbor => queue.enqueue(neighbor));
        }
        return exploring;
      })
      // 5. At this point, we've explored all the edges of starting, so mark it black
      .map(exploring => colors.set(exploring, Visited.BLACK))
  }

  // 6. At this point, we've traversed the graph
  return {
    distances, predecessor: predecessors, results
  }
}

const minDistance = (dists: KeyToDistMap, visited: KeyToVisitedMap) => {
  let min = Infinity;
  let minIndex = "";

  for (let [key, val] of Object.entries(dists)) {
    let visit = visited[key];
    if (visit === false && val <= min) {
      min = val;
      minIndex = key;
    }
  }

  return minIndex;
};

type KeyToDistMap = { [key: string]: number };
type KeyToVisitedMap = { [key: string]: boolean };

export const dijkstra = (graph: Matrix<number>, src: number) => {
  let keys = Object.keys(graph);  // rows in the graph
  const length = keys.length;

  let distances: KeyToDistMap = {};
  for (let key of keys) {
    distances[key] = Infinity
  }

  let visited: KeyToVisitedMap = {};
  for (let key of keys) {
    visited[key] = false;
  }

  distances[src] = 0;

  for (let foo = 0; foo < length - 1; foo++) {
    const minIndex = minDistance(distances, visited);

    visited[minIndex] = true;

    for (let key of keys) {
      if (
        !visited[key] &&  // we haven't visited this row
        graph[minIndex][key] !== 0 && 
        distances[minIndex] !== Infinity &&
        distances[minIndex] + graph[minIndex][key] < distances[key]
      ) {
        distances[key] = distances[minIndex] + graph[minIndex][key];
      }
    }
  }

  return distances;
};

const dfsTraverse = <T>(
  exploring: T,
  colors: Explored<T>,
  discovery: Map<T, number>,
  predecessors: Map<T, T>,
  time: number,
  finished: Map<T, number>,
  edges: Map<T, EdgeWeight<T>[]>
) =>  {
  // Mark the vertex as grey
  colors.set(exploring, Visited.GREY);

  // Increment the discovery time for this vertex
  discovery.set(exploring, ++time);

  // For each neighbor of this vertex, check the color to see if it's undiscovered.  If white, then 
  // set the predecessor, then recurse to go one deeper
  let maybeNeighbors = Option.Maybe(edges.get(exploring));
  if (maybeNeighbors.isSome()) {
    let neighbors = maybeNeighbors.expect("Shouldn't happen");
    for (let [neighbor, weight] of neighbors) {
      const color = Option.Maybe(colors.get(neighbor)).expect(`${neighbor} not in color map`);
      if (color === Visited.WHITE) {
        console.log("going deeper")
        predecessors.set(neighbor, exploring);
        dfsTraverse(neighbor, colors, discovery, predecessors, time, finished, edges)
      }
    }
  }
  
  // If there are no neighbors, or we have iterated through all neighbors, we end up here.
  // Set the color of the exploring vertex to black,and increment our time
  colors.set(exploring, Visited.BLACK);
  finished.set(exploring, ++time)
}

export const dfs = <T>(graph: Graph<T>) => {
  const vertices = graph.getVertices();   // vertices to explore
  const edges = graph.getEdges();         // map of vertex to its neighbors
  const colors = initVisited(vertices);   // maps vertex to visited color
  const discovery = new Map<T, number>(); // maps how soon vertex is discovered
  const finished = new Map<T, number>();  // maps how long to get to vertex
  const predecessors = new Map<T, T>();   // maps vertex to (one of) its predecessors
  const time = 0;

  for (let vert of vertices) {
    finished.set(vert, 0);
    discovery.set(vert, 0);
  }

  // For each vertex in vertices, run through the dfsTraverse
  for (let vert of vertices) {
    Option.Maybe(colors.get(vert))
      .map(color => {
        if (color === Visited.WHITE) {
          dfsTraverse(vert, colors, discovery, predecessors, time, finished, edges)
        }
      });
  }

  return {
      discovery,
      finished,
      predecessors
  };
};


let testGraph: KeyValList<string> = [
  ["A", ["C", "D"]],
  ["B", ["D", "E"]],
  ["C", ["F"]],
  ["F", ["E"]]
]

let graph = Graph.new(true, testGraph);
let results = dfs(graph);
