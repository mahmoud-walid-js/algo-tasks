// Edge class representing an edge in the graph
class Edge {
    constructor(source, destination, weight) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }
}

// Union-Find class to manage connected components
class UnionFind {
    constructor(size) {
        this.parent = Array(size).fill(0).map((_, index) => index); // Initialize parent array
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent[rootX] = rootY; // Merge the two sets
        }
    }
}


function kruskal(numberOfVertices, edges) {

    edges.sort((edge1, edge2) => edge1.weight - edge2.weight);

    const uf = new UnionFind(numberOfVertices);
    const mst = [];


    for (const edge of edges) {
        const rootSource = uf.find(edge.source);
        const rootDestination = uf.find(edge.destination);

        if (rootSource !== rootDestination) {
            mst.push(edge);
            uf.union(rootSource, rootDestination);
        }
    }


    console.log("Edges in the MST:");
    for (const edge of mst) {
        console.log(`(${edge.source}, ${edge.destination}) - Weight: ${edge.weight}`);
    }
}


const vertices = 4;
const edges = [
    new Edge(0, 1, 10),
    new Edge(0, 2, 6),
    new Edge(0, 3, 5),
    new Edge(1, 3, 15),
    new Edge(2, 3, 4)
];


kruskal(vertices, edges);
