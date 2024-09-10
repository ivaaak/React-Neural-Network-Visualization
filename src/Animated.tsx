import React, { useEffect, useState } from "react";
import Node from "./Node";
import Edge from "./Edge";
import DataFlow from "./DataFlow";

const AnimatedNeuralNetwork: React.FC = () => {
    const [animationKey, setAnimationKey] = useState<number>(0);
    const [hiddenLayers, setHiddenLayers] = useState<number>(3);
    const [layerSizes, setLayerSizes] = useState<number[]>([9, 6, 6, 6, 7]);

    useEffect(() => { // restart animation every 5 seconds
        const interval = setInterval(() => {
            setAnimationKey(prevKey => prevKey + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const layerSpacing = 250;
    const width = layerSpacing * (layerSizes.length - 1) + 100;
    const height = 600;

    const handleHiddenLayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHiddenLayers = parseInt(e.target.value);
        setHiddenLayers(newHiddenLayers);
        setLayerSizes(prev => {
            const newSizes = [...prev];
            if (newHiddenLayers > hiddenLayers) { // add layers
                for (let i = 0; i < newHiddenLayers - hiddenLayers; i++) {
                    newSizes.splice(newSizes.length - 1, 0, 6);
                }
            } else { // remove layers
                newSizes.splice(1, hiddenLayers - newHiddenLayers);
            }
            return newSizes;
        });
    };

    const handleLayerSizeChange = (index: number, size: number) => {
        setLayerSizes(prev => {
            const newSizes = [...prev];
            newSizes[index] = size;
            return newSizes;
        });
    };

    return (
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg flex">
            <div className="mr-4">
                <svg width={width} height={height} key={animationKey}>
                    {layerSizes.map((nodeCount, layerIndex) => {
                        const layerX = layerIndex * layerSpacing + 50;
                        return Array.from({ length: nodeCount }).map((_, nodeIndex) => {
                            const nodeY = (height / (nodeCount + 1)) * (nodeIndex + 1);
                            return (
                                <React.Fragment key={`node-${layerIndex}-${nodeIndex}`}>
                                    <Node
                                        cx={layerX}
                                        cy={nodeY}
                                        isInput={layerIndex === 0}
                                        isOutput={layerIndex === layerSizes.length - 1}
                                    />
                                    {layerIndex < layerSizes.length - 1 &&
                                        Array.from({ length: layerSizes[layerIndex + 1] }).map((_, nextNodeIndex) => {
                                            const nextNodeY = (height / (layerSizes[layerIndex + 1] + 1)) * (nextNodeIndex + 1);
                                            return (
                                                <React.Fragment key={`edge-${layerIndex}-${nodeIndex}-${nextNodeIndex}`}>
                                                    <Edge
                                                        startX={layerX}
                                                        startY={nodeY}
                                                        endX={layerX + layerSpacing}
                                                        endY={nextNodeY}
                                                        animationKey={animationKey}
                                                    />
                                                    <DataFlow
                                                        startX={layerX}
                                                        startY={nodeY}
                                                        endX={layerX + layerSpacing}
                                                        endY={nextNodeY}
                                                    />
                                                </React.Fragment>
                                            );
                                        })}
                                </React.Fragment>
                            );
                        });
                    })}
                    <text x="10" y="30" fill="#ffffff" fontSize="14">Input Layer</text>
                    <text x={width - 120} y="30" fill="#ffffff" fontSize="14">Output Layer</text>
                    {Array.from({ length: hiddenLayers }).map((_, i) => (
                        <text key={`hidden-${i}`} x={layerSpacing * (i + 1) + 20} y="30" fill="#ffffff" fontSize="14">
                            Hidden Layer {i + 1}
                        </text>
                    ))}
                </svg>
            </div>
            <div className="flex flex-col">
                <div className="mb-4">
                    <label className="text-white mr-2">Hidden Layers:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={hiddenLayers}
                        onChange={handleHiddenLayersChange}
                        className="bg-gray-700 text-white p-1 rounded"
                    />
                </div>
                {layerSizes.map((size, index) => (
                    <div key={index} className="mb-2">
                        <label className="text-white mr-2">
                            {index === 0 ? "Input" : index === layerSizes.length - 1 ? "Output" : `Hidden ${index}`} Layer:
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={size}
                            onChange={(e) => handleLayerSizeChange(index, parseInt(e.target.value))}
                            className="bg-gray-700 text-white p-1 rounded w-16"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedNeuralNetwork;