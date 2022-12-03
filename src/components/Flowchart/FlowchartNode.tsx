import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Handle, Position } from 'reactflow';

export default function FlowchartNode(props: any) {
  return (
    <>
      <div className="h-fit w-36 rounded-md border border-alta-orange bg-white p-4 shadow-md">
        <p className="text-center font-bold text-alta-orange">
          {props.data.label}
        </p>
        <Handle
          type="source"
          id={`${props.id}-handle-a`}
          position={Position.Top}
        />
        <Handle
          type="source"
          id={`${props.id}-handle-b`}
          position={Position.Bottom}
        />
        <Handle
          type="source"
          id={`${props.id}-handle-c`}
          position={Position.Left}
        />
        <Handle
          type="source"
          id={`${props.id}-handle-d`}
          position={Position.Right}
        />
      </div>
      <div className="absolute -right-5 top-0 z-30 flex flex-col gap-1 opacity-40 transition-opacity delay-75 ease-in hover:opacity-100">
        <PencilIcon
          className="h-4 w-4"
          color="#666"
          onClick={() => props.data.onClickEdit(props)}
        />
        <TrashIcon
          className="h-4 w-4"
          color="#666"
          onClick={() => props.data.onClickDelete(props)}
        />
      </div>
    </>
  );
}
