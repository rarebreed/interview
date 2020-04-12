import { Option, Maybe } from "../fn";
import { Queue } from "./newqueue";

export type KeyValList<T> = [T, T[]][];

class Graph<T> {
  #vertices: T[];
  #edges: Map<T, T[]>;
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

  addVertex = (vert: T) => {
    if (!this.#vertices.includes(vert)) {
      this.#vertices.push(vert);
      this.#edges.set(vert, []);
    }
  }

  addEdge = (v1: T, v2: T) => {
    if (!this.#vertices.includes(v1)) {
      this.#vertices.push(v1);
    }

    const add = (vert1: T, vert2: T) => {
      Option.Maybe(this.#edges.get(vert1))
        .mapOr([], (d) => {
          d.push(vert2)
          this.#edges.set(vert1, d)
          return d;
        });
    }
  
    add(v1, v2);
    if (!this.#directed) add(v2, v1)
  }

  getVertices = () => this.#vertices;

  getEdges = () => this.#edges;
}

export enum Visited {
  WHITE = 0,
  GREY = 1,
  BLACK = 2
}

export const initVisited = <T>(graph: Graph<T>) => {
  return graph.getVertices().reduce((acc, n) => {
    acc.set(n, Visited.WHITE)
    return acc
  }, new Map<T, Visited>())
}

export const bfs = <T, R>(graph: Graph<T>, start: T, cb?: (t: T) => R) => {
  // 1. Get the data we need to work with:
  const queue = Queue.new<T>();
  const verts = graph.getVertices();
  const edges = graph.getEdges();
  const colors = initVisited(graph);
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
  queue.enqueue(start);
  while(!queue.isEmpty()) {
    queue.dequeue()
      .flatMap(starting => {
        // Call the callback if needed
        Option.Maybe(colors.get(starting))
          .filter(color => cb !== undefined && color === Visited.WHITE)
          .map(_ => maybeCB.map(fn => results.set(starting, fn(starting))))
        colors.set(starting, Visited.GREY);
        let maybeNeighbors = Option.Maybe(edges.get(starting));

        // This is a common trick where you need to "thread" some value down the Functor chain The
        // problem is that sometimes, you have a T and an Option<R>, so you can use this map() trick
        // to pass them.  If maybeNeighbors is None, since we use mapOr(), we can supply a default.
        return maybeNeighbors.mapOr([], (neighbors) => {
          return { neighbors, starting }
        })
      })
      .map(({neighbors, starting}) => {
        // 4. For each of the neighbors, look at the color. If it's white:
        //    - Set color to grey
        //    - Add 1 to distance
        //    - Set this exploring vertex's predecessor to start
        //    - enqueue the exploring vertex
        for (let neighbor of neighbors) {
          Option.Maybe(colors.get(neighbor))
            .filter(color => color === Visited.WHITE)
            .map(_ => {              
              colors.set(neighbor, Visited.GREY);  // set to grey
              Option.Maybe(distances.get(neighbor))
                .mapOr(0, distance => distances.set(neighbor, distance + 1))
              Option.Maybe(predecessors.get(neighbor))
                .map(n => n.push(starting))
              return neighbor;
            })
            .map(neighbor => queue.enqueue(neighbor));
        }
        return starting;
      })
      // 5. At this point, we've explored all the edges of starting, so mark it black
      .map(starting => colors.set(starting, Visited.BLACK))
  }

  // 6. At this point, we've traversed the graph
  return {
    distances, predecessor: predecessors, results
  }
}