import { GraphChart, GraphSeriesOption } from "echarts/charts";
import { Edge, GraphDefinition, Vertex } from "./graphUtil";
import * as eCharts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { useEffect } from "react";

eCharts.use([SVGRenderer, GraphChart]);

type GraphLayout = "circular" | "spread";
export interface GraphOptions {
  layout?: GraphLayout;
  animation?: boolean;
  edgeLength?: number | [number, number];
  dimensions: {
    height: string;
    width: string;
  };
}

export interface GraphStyleColorGradient {
  type: "radial";
  center: {
    x: number;
    y: number;
  };
  radius: number;
  colorStops: {
    offset: number;
    color: string;
  }[];
}

export interface GraphStyle {
  vertices?: {
    size?: number;
    color?: string | GraphStyleColorGradient;
  };
  edges?: {
    width?: number;
    color?: string | GraphStyleColorGradient;
  };
}

export default function useGraph(
  domReference: React.RefObject<HTMLElement>,
  graph: GraphDefinition,
  graphOptions?: GraphOptions,
  graphStyle?: GraphStyle
) {
  useEffect(() => {
    if (domReference.current === null) {
      throw new Error(
        "HTMLElement reference to render graph was null during React effect run"
      );
    }
    setDomElementDimensions(domReference.current, graphOptions?.dimensions);
    const eChartsGraph = eCharts.init(domReference.current);
    eChartsGraph.setOption({
      series: convertToEChartsSeries(graph, graphOptions, graphStyle),
    });
    return () => eChartsGraph.dispose();
  }, [domReference, graph, graphOptions, graphStyle]);
}

function setDomElementDimensions(
  e: HTMLElement,
  dimensions?: { width: string; height: string }
) {
  e.style.width = dimensions?.width ?? "100px";
  e.style.height = dimensions?.height ?? "100px";
}

function convertToEChartsEdges(edges: Edge[]): Partial<GraphSeriesOption> {
  return {
    edges: edges.map((e) => ({
      source: `${e.fromVertex}`,
      target: `${e.toVertex}`,
    })),
  };
}

function convertToEChartsNodes(vertices: Vertex[]): Partial<GraphSeriesOption> {
  return {
    nodes: vertices.map((v) => ({
      id: `${v.id}`,
      name: v.name,
    })),
  };
}

function getEChartsLayout(
  graphOptions?: GraphOptions
): Partial<GraphSeriesOption> {
  if (!graphOptions?.layout || graphOptions?.layout === "circular") {
    return {
      layout: "circular",
    };
  }

  return {
    layout: "force",
    force: {
      layoutAnimation: graphOptions.animation ?? false,
      edgeLength: graphOptions.edgeLength ?? 20,
      gravity: 0.001,
      repulsion: [1, 20],
      initLayout: "circular",
    },
  };
}

function convertToEChartsGraphStyle(
  style?: GraphStyle
): Partial<GraphSeriesOption> {
  if (!style) return {};

  let verticesColor: eCharts.Color = {};
  if (style.vertices?.color && typeof style.vertices.color === "string") {
    verticesColor = style.vertices.color;
  } else if (style.vertices?.color) {
    verticesColor = convertToEChartsColor(
      style.vertices.color as GraphStyleColorGradient
    );
  }

  return {
    symbolSize: style.vertices?.size ?? 5,
    itemStyle: {
      color: verticesColor,
    },
    // TODO edge style
  };
}

function convertToEChartsColor(
  gradient: GraphStyleColorGradient
): eCharts.Color {
  if (gradient.type === "radial") {
    return {
      type: "radial",
      x: gradient.center.x,
      y: gradient.center.y,
      r: gradient.radius,
      colorStops: [...gradient.colorStops],
    };
  }

  return {};
}

function convertToEChartsSeries(
  graph: GraphDefinition,
  options?: GraphOptions,
  style?: GraphStyle
): GraphSeriesOption {
  return {
    type: "graph",
    center: ["50%", "50%"],
    animation: options?.animation ?? false,
    label: {
      show: true,
    },
    ...convertToEChartsNodes(graph.vertices),
    ...convertToEChartsEdges(graph.edges),
    ...getEChartsLayout(options),
    ...convertToEChartsGraphStyle(style),
  };
}
