require('../styles/index.scss');
import WaterGL from './waterGL';

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("webgl");
  let GL = canvas.getContext("webgl");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  GL = canvas.getContext('webgl');
  new WaterGL(GL);
});