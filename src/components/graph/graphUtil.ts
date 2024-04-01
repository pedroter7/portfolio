export interface Vertex {
  id: number;
  name?: string;
}

export interface Edge {
  fromVertex: number;
  toVertex: number;
}

export interface GraphDefinition {
  vertices: Vertex[];
  edges: Edge[];
}

export function buildTree(
  height: number,
  verticesPerLevel: (level: number) => number
): GraphDefinition {
  const vertices: Vertex[] = [];
  const edges: Edge[] = [];
  let nextId = 0;
  const getNextId = () => nextId++;
  let lastlevelVertices = buildManyVertices(1, getNextId);
  vertices.push(...lastlevelVertices);
  for (let h = 1; h <= height; ++h) {
    const nextLevelVertices: Vertex[] = [];
    let verticesToCreate = verticesPerLevel(h);
    let i = 0;
    while (verticesToCreate > 0) {
      const vs = buildManyVertices(randomInt(1, verticesToCreate), getNextId);
      vs.forEach((v) =>
        edges.push({ fromVertex: lastlevelVertices[i].id, toVertex: v.id })
      );
      i = (i + 1) % lastlevelVertices.length;
      verticesToCreate -= vs.length;
      nextLevelVertices.push(...vs);
    }
    vertices.push(...nextLevelVertices);
    lastlevelVertices = nextLevelVertices;
  }
  return { vertices, edges };
}

function buildManyVertices(n: number, getNextId: () => number): Vertex[] {
  const vertices: Vertex[] = [];
  for (let i = 0; i < n; ++i) vertices.push({ id: getNextId() });
  return vertices;
}

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;
