import React, { useEffect, useState } from "react";
import { EdgeProps } from "./models/edgeProps";

const Edge: React.FC<EdgeProps> = ({ startX, startY, endX, endY, animationKey }) => {
    const [length, setLength] = useState<number>(0);

    useEffect(() => {
        setLength(0);
        const timer = setTimeout(() => setLength(1), 50);
        return () => clearTimeout(timer);
    }, [animationKey]);

    return (
        <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="#9ca3af"
            strokeWidth="1"
            strokeDasharray="5,5"
        >
            <animate
                attributeName="stroke-dashoffset"
                from="10"
                to="0"
                dur="1s"
                begin={`${Math.random()}s`}
                fill="freeze"
            />
        </line>
    );
};

export default Edge;