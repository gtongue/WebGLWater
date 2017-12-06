export const generatePlane = (width = 100, height = 100, offset = 1) => {
  let vertices = [];
  let indices = [];
  let normals = [];

  for(let i = 0; i < width; i++){
    for(let j = 0; j < height; j++){
      vertices.push(i * offset, 0, j * offset);
      normals.push(0, 1, 0);
    }
  }

  for(let i = 0; i < height - 1; i++){
    for(let j = width*i; j < width*i + (width -1); j++){
      indices.push(j);
      indices.push(j+1);
      indices.push(j+width);
      indices.push(j+1);
      indices.push(j+1+width);
      indices.push(j+width);
    }
  }

  let verticesBuffer = new Float32Array(vertices);
  let indicesBuffer = new Uint16Array(indices);
  let normalsBuffer = new Float32Array(normals);
  return {
    vertices: verticesBuffer,
    indices: indicesBuffer,
    normals: normalsBuffer
  };

};