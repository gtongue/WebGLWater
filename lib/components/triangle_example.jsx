import React from 'react';
// import WebGL from '../webgl/webgl';
import Water from '../water';
import vertexShader from '../shaders/simple_vs';
import fragmentShader from '../shaders/simple_fs';
import othervertex from '../shaders/timed_vs';

export default class TriangleExample extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let canvas = this.refs.canvas;
    let gl = canvas.getContext("webgl");
    canvas.width = 1280;
    canvas.height = 720;

    gl = canvas.getContext('webgl');
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);

    this.Water = new Water(vertexShader, fragmentShader, othervertex, gl);
  }

  render(){
    return (
      <div>
        <canvas ref = "canvas" style = {{width: "1280px", height: "720px"}}>

        </canvas>
      </div>
    );
  }
}