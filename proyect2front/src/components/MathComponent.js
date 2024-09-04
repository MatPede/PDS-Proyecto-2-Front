// src/components/MathComponent.js
import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const MathComponent = ({ formula }) => {
  return (
    <MathJaxContext>
      <MathJax dynamic>{`\\(${formula}\\)`}</MathJax>
    </MathJaxContext>
  );
};

export default MathComponent;
