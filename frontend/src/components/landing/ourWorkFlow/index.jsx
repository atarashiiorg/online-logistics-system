import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Transportation' },
    position: { x: 660, y: 80 },
  },
  {
    id: '2',
    data: { label: 'Manufacturing' },
    position: { x: 200, y: 300 },
  },
  {
    id: '3',
    data: { label: 'Packaging' },
    position: { x: 1100, y: 300 },
  },
  {
    id: '4',
    data: { label: 'Capturing' },
    position: { x: 660, y: 550 },
  },
  {
    id: '5',
    data: { label: 'Our Workflow' },
    position: { x: 660, y: 300 },
    draggable: false,
  },
];
const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '3',
    animated: true,
    style: { strokeDasharray: '5,5' },
  },
  {
    id: 'e1-3',
    source: '3',
    target: '4',
    animated: true,
    style: { strokeDasharray: '5,5' },
  },
  {
    id: 'e1-4',
    source: '4',
    target: '2',
    animated: true,
    style: { strokeDasharray: '5,5' },
  },
];

const OurWorkFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [zoom, setZoom] = useState(1.2);

  useEffect(() => {
    const handleResize = () => {
      setZoom(Math.min(window.innerWidth / 1000, window.innerHeight / 1000));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const defaultViewport = {
    x: -110,
    y: -60,
    // zoom: zoom,
  };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <div
      style={{
        marginTop: '2em',
        width: '100%',
        height: '100vh',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultViewport={defaultViewport}
        zoomOnScroll={false}
        preventScrolling={false}
      >
        <Controls />
        <Background variant="dots" gap={24} size={1.5} />
      </ReactFlow>
    </div>
  );
};

export default OurWorkFlow;
