import { useRef } from "react";
import { GraphDefinition } from "./graphUtil";
import useGraph, { GraphOptions, GraphStyle } from "./graph";

export interface GraphComponentOptions {
  graph: GraphDefinition;
  graphOptions?: GraphOptions;
  graphStyle?: GraphStyle;
}

export default function Graph({
  graph,
  graphOptions,
  graphStyle,
  ...rest
}: GraphComponentOptions) {
  const graphDomNode = useRef(null);
  useGraph(graphDomNode, graph, graphOptions, graphStyle);
  return <div ref={graphDomNode} {...rest}></div>;
}
