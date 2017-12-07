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
      <div className = "water">
        <div className = "sliders">
          <div className = "slider-container">
            <input id = "amplitude" type="range" min = "0" max = "20" defaultValue = "2"/>
            <p id = "amplitudeVal"></p>
          </div>
          <div className = "slider-container">
            <input id = "wavelength" type="range" min = "0" max = "200" defaultValue = "35"/>
            <p id = "wavelengthVal"></p>
          </div>
          <div className = "slider-container">
            <input id = "frequency" type="range" min = "0" max = "200" defaultValue = "15"/>
            <p id = "frequencyVal"></p>
          </div>
        </div>
        <canvas ref = "canvas" style = {{width: "100vw", height: "100vh"}}>

        </canvas>
      </div>
    );
  }
}