import { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";

export default memo(({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative px-4 py-2 shadow-md rounded-md bg-white border-2 border-indigo-500 min-w-37.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-indigo-500!"
      />

      <div className="font-bold text-sm text-center">{data.label}</div>

      {/* Custom Hover Effect / Quick Info */}
      {isHovered && data.summary && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50 pointer-events-none">
          <p className="font-semibold border-b border-gray-600 mb-1">
            Quick Summary
          </p>
          {data.summary}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800"></div>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-indigo-500!"
      />
    </div>
  );
});
