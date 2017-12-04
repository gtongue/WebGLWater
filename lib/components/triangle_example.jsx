import React from 'react';
import WebGL from '../utils/webgl';
import vertexShader from '../shaders/simple_vs';
import fragmentShader from '../shaders/simple_fs';

export default class TriangleExample extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.WebGL = new WebGL(this.refs.canvas);
    this.WebGL.loadVertexShader(vertexShader);
    this.WebGL.loadFragmentShader(fragmentShader);
    this.WebGL.createProgram();
    this.WebGL.drawShape();
  }

  render(){
    return (
      <div>
        <canvas ref = "canvas" style = {{width: "1000px", height: "1000px"}}>

        </canvas>
      </div>
    );
  }
}