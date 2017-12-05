import React from 'react';
// import WebGL from '../webgl/webgl';
import Water from '../water';
import vertexShader from '../shaders/simple_vs';
import fragmentShader from '../shaders/simple_fs';

export default class TriangleExample extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let canvas = this.refs.canvas;
    let gl = canvas.getContext("webgl");
    canvas.width = 1920;
    canvas.height = 1080;

    gl = canvas.getContext('webgl');
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);

    this.Water = new Water(vertexShader, fragmentShader, gl);
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