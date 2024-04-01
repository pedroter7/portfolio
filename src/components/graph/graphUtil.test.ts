import { describe, expect, expectTypeOf, it } from "vitest";
import { buildTree, GraphDefinition, Vertex } from "./graphUtil";
import { faker } from "@faker-js/faker";

describe("Graph utils", () => {
  describe("Build tree", () => {
    it("Builds a trivial tree when height is 0", () => {
      const res = buildTree(0, () => randomInt(1, 10000));
      expect(res.edges).toStrictEqual([]);
      expect(res.vertices.length).toBe(1);
      expectTypeOf(res.vertices[0]).toMatchTypeOf<Vertex>();
    });
    it("Builds a graph with the correct number of vertices", () => {
      const height = randomInt(1, 10);
      const verticesPerLevel = randomInt(1, 50);
      const expected = height * verticesPerLevel + 1;
      const res = buildTree(height, () => verticesPerLevel);
      expect(res.vertices.length).toBe(expected);
    });
    it("Builds a graph in which all vertices have unique ids", () => {
      const res = buildTree(randomInt(1, 10), () => randomInt(1, 10));
      const ids = res.vertices.map((v) => v.id);
      ids.sort((a, b) => a - b);
      expect(
        ids.every((id, idx, ids) => idx == 0 || ids[idx - 1] < id)
      ).toBeTruthy();
    });
    it("Builds an actual non-trivial tree", () => {
      const res = buildTree(randomInt(1, 100), () => randomInt(1, 100));
      expect(isTree(res)).toBeTruthy();
    });
  });
});

const randomInt = (min: number, max: number) => faker.number.int({ min, max });

type BFSStatus = {
  [k: number]: { visited: boolean; finished: boolean };
};

function isTree(g: GraphDefinition): boolean {
  if (g.vertices.length == 0) return true;
  if (g.edges.length != g.vertices.length - 1) return false;

  const searchStatus = g.vertices.reduce<BFSStatus>((a, c) => {
    a[c.id] = { visited: false, finished: false };
    return a;
  }, {});

  BFS(g.vertices[0].id, g, searchStatus);
  return g.vertices.reduce((a, v) => a && searchStatus[v.id].visited, true);
}

function BFS(vertexId: number, graph: GraphDefinition, status: BFSStatus) {
  if (status[vertexId].finished) return;
  if (status[vertexId].visited) return;
  status[vertexId].visited = true;
  const neighbors = graph.edges
    .filter((e) => e.fromVertex == vertexId)
    .map((e) => e.toVertex);
  neighbors.forEach((n) => BFS(n, graph, status));
  status[vertexId].finished = true;
}
