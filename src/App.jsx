import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import initialData from "./data/mindmapData.json";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MindMapNode from "./components/MindMapNode";

const nodeTypes = { mindmap: MindMapNode };

// structure for the json data
const parseData = (
  node,
  parentId = null,
  nodes = [],
  edges = [],
  x = 0,
  y = 0
) => {
  nodes.push({
    id: node.id,
    type: "mindmap",
    data: {
      label: node.title,
      description: node.description,
      summary: node.summary,
      parentId,
    },
    position: { x, y },
    hidden: !!parentId,
  });
  if (parentId) {
    edges.push({
      id: `e${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
      hidden: true,
      animated: true,
    });
  }
  node.children?.forEach((child, index) => {
    parseData(
      child,
      node.id,
      nodes,
      edges,
      x + 300,
      y + (index - (node.children.length - 1) / 2) * 150
    );
  });
  return { nodes, edges };
};

export default function App() {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => parseData(initialData),
    []
  );
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // vsible sidebar only if node is selected
  const activeNode = useMemo(() => {
    const node = nodes.find((n) => n.id === selectedId);
    return node && !node.hidden ? node : null;
  }, [nodes, selectedId]);

  // dynamic sidebar data based on selected node
  const onNodesChange = useCallback(
    (chs) => setNodes((nds) => applyNodeChanges(chs, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (chs) => setEdges((eds) => applyEdgeChanges(chs, eds)),
    []
  );

  const updateNode = (id, fields) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id
          ? {
              ...n,
              data: {
                ...n.data,
                label: fields.title,
                summary: fields.summary,
                description: fields.description,
              },
            }
          : n
      )
    );
  };

  // add nodes
  const addNode = (newFields) => {
    if (!selectedId) return;
    const parent = nodes.find((n) => n.id === selectedId);
    const newId = `node-${Date.now()}`;
    const newNode = {
      id: newId,
      type: "mindmap",
      data: {
        label: newFields.title,
        summary: newFields.summary,
        description: newFields.description,
        parentId: selectedId,
      },
      position: { x: parent.position.x + 300, y: parent.position.y + 100 },
      hidden: false,
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `e${selectedId}-${newId}`,
        source: selectedId,
        target: newId,
        hidden: false,
        animated: true,
      },
    ]);
  };

  // toggle nodes:
  // expand
  const toggleNode = (nodeId) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.data.parentId === nodeId ? { ...n, hidden: !n.hidden } : n
      )
    );
    setEdges((eds) =>
      eds.map((e) => (e.source === nodeId ? { ...e, hidden: !e.hidden } : e))
    );
  };

  // collapse
  const handleCollapseAll = () => {
    setNodes((n) =>
      n.map((x) => (x.data.parentId ? { ...x, hidden: true } : x))
    );
    setEdges((e) => e.map((x) => ({ ...x, hidden: true })));
    setSelectedId(null);
  };

  // download funcitonality
  const exportToJson = () => {
    const dataToExport = { nodes, edges };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "mindmap_graph.json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50">
      <Navbar
        expandAll={() => {
          setNodes((n) => n.map((x) => ({ ...x, hidden: false })));
          setEdges((e) => e.map((x) => ({ ...x, hidden: false })));
        }}
        collapseAll={handleCollapseAll}
        fitView={() => rfInstance?.fitView()}
        onExport={exportToJson}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(_, node) => {
              setSelectedId(node.id);
              toggleNode(node.id);
            }}
            onPaneClick={() => setSelectedId(null)}
            onInit={setRfInstance}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {/* sidebar for conditonal rendering */}
        {activeNode && (
          <Sidebar
            node={activeNode}
            addNode={addNode}
            updateNode={updateNode}
          />
        )}
      </div>
    </div>
  );
}
