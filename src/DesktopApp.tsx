import { Graph } from "./components/graph";
import * as graphUtil from "./components/graph/graphUtil";

const DesktopApp = () => {
  const graphDef = graphUtil.buildTree(3, () => 4);
  return <Graph graph={graphDef} />;
};

export default DesktopApp;
