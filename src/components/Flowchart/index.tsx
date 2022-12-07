import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Controls,
  NodeChange,
  EdgeChange,
  Connection,
  MarkerType,
  Background,
  FitViewOptions,
  ConnectionMode,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { useCallback, FC, Dispatch } from 'react';
import 'reactflow/dist/style.css';

import FlowchartNode from './FlowchartNode';
import FlowchartEdge from './FlowchartEdge';

interface Props {
  nodes: Node[];
  edges: Edge[];
  setNodes: Dispatch<any>;
  setEdges: Dispatch<any>;
}

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const edgeOptions = {
  // type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#666',
  },
  style: {
    stroke: '#666',
  },
};

const nodeTypes = {
  custom: FlowchartNode,
};

const edgeTypes = {
  floating: FlowchartEdge,
};

const Flowchart: FC<Props> = ({ nodes, edges, setNodes, setEdges }) => {
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds: any) =>
        addEdge({ ...connection, type: 'smoothstep' }, eds)
      ),
    [setEdges]
  );

  return (
    <ReactFlow
      //   onNodesChange={onNodesChange}
      //   onEdgesChange={onEdgesChange}
      //   onConnect={onConnect}
      defaultNodes={nodes}
      defaultEdges={edges}
      snapToGrid
      fitView
      nodeTypes={nodeTypes}
      // edgeTypes={edgeTypes}
      defaultEdgeOptions={edgeOptions}
      fitViewOptions={fitViewOptions}
      proOptions={{ hideAttribution: true }}
      connectionMode={ConnectionMode.Loose}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default Flowchart;
