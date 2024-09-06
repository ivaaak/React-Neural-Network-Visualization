import React from "react";
import { NodeProps } from "./models/nodeProps";

const Node: React.FC<NodeProps> = ({ cx, cy, isInput, isOutput }) => (
    <circle
        cx={cx}
        cy={cy}
        r={10}
        fill={isInput ? "#4ade80" : isOutput ? "#f87171" : "#60a5fa"}
    />
);

export default Node;