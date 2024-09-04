import React from 'react';
import { Stage, Layer, Arrow, Rect, Text, Line } from 'react-konva';

const ForceDiagram = ({ F, P, mu }) => {
  // Scale the arrow lengths based on the input forces
  const arrowLengthF = F * 0.2;
  const arrowLengthP = P * -0.8;
  const arrowLengthMu = mu * 0.5;

  return (
    <Stage width={300} height={200}>
      <Layer>
        {/* Horizontal Force F */}
        <Arrow 
          points={[70 - arrowLengthF, 80, 70, 80]} 
          stroke="red" 
          fill="red" 
          strokeWidth={5} 
          pointerLength={10} 
          pointerWidth={10} 
        />
        <Text x={45} y={55} text="F" fill="red" />

        {/* Vertical Force P */}
        <Arrow 
          points={[130, 130, 130, 130 - arrowLengthP]} 
          stroke="red" 
          fill="red" 
          strokeWidth={5} 
          pointerLength={10} 
          pointerWidth={10} 
        />
        <Text x={145} y={130 - arrowLengthP - 20} text="P" fill="red" />

        <Line points={[275, 130, 0, 130]} stroke="Green" strokeWidth={5} />

        {/* Frictional Force μ */}
        <Arrow 
          points={[180, 130, 210 + arrowLengthMu * 50, 110 - arrowLengthMu * 50]} 
          stroke="blue" 
          fill="blue" 
          strokeWidth={3} 
          pointerLength={10} 
          pointerWidth={10} 
        />
        <Text x={180 + arrowLengthMu * 50 + 10} y={105 - arrowLengthMu * 50 - 10} text="μ" fill="blue" />

        {/* Object */}
        <Rect x={80} y={30} width={100} height={100} stroke="black" strokeWidth={3} />
      </Layer>
    </Stage>
  );
};

export default ForceDiagram;
