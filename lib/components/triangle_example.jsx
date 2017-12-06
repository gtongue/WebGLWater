import React from 'react';
// import WebGL from '../webgl/webgl';
import Water from '../water';
import Main from '../main';

import vertexShader from '../shaders/simple_vs';
import fragmentShader from '../shaders/simple_fs';
import othervertex from '../shaders/timed_vs';

export default class TriangleExample extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let canvas = this.refs.canvas;
    let GL = canvas.getContext("webgl");
    canvas.width = 1280;
    canvas.height = 720;

    GL = canvas.getContext('webgl');
    GL.viewport(0,0,GL.canvas.width, GL.canvas.height);

    // this.Water = new Water(vertexShader, fragmentShader, othervertex, GL);
    new Main(GL);
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