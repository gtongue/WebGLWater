import React from 'react';
// import WebGL from '../webgl/webgl';
import Main from '../main';

export default class Water extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let canvas = this.refs.canvas;
    let GL = canvas.getContext("webgl");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    GL = canvas.getContext('webgl');
    GL.viewport(0,0,GL.canvas.width, GL.canvas.height);

    // this.Water = new Water(vertexShader, fragmentShader, othervertex, GL);
    new Main(GL);
  }

  render(){
    return (
      <div>
        <canvas ref = "canvas" style = {{width: "100vw", height: "100vh"}}>

        </canvas>
      </div>
    );
  }
}