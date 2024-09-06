import React from "react";
import { DataFlowProps } from "./models/dataFlowProps";

const DataFlow: React.FC<DataFlowProps> = ({ startX, startY, endX, endY }) => (
    <circle r="4" fill="#f59e0b">
        <animateMotion
            path={`M${startX},${startY} L${endX},${endY}`}
            dur="2s"
            begin={`${Math.random() * 2}s`}
            fill="freeze"
            restart="always"
        />
    </circle>
);

export default DataFlow;