export const generatePlane = (width = 200, height = 200, offset = .1) => {
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

export const generateCube = () => {
  let vertices = [];
  let indices = [];
  let normals = [];

  vertices.push(-1, -1, -1);
  normals.push(0.0, 0.0, -1.0);
  vertices.push(-1, 1, -1);
  normals.push(0.0, 0.0, -1.0);
  vertices.push(1, 1, -1);
  normals.push(0.0, 0.0, -1.0);
  vertices.push(1, -1, -1);
  normals.push(0.0, 0.0, -1.0);

  vertices.push(-1, -1, 1);
  normals.push(0.0, 0.0, 1.0);
  vertices.push(1, -1, 1);
  normals.push(0.0, 0.0, 1.0);
  vertices.push(1, 1, 1);
  normals.push(0.0, 0.0, 1.0);
  vertices.push(-1, 1, 1);
  normals.push(0.0, 0.0, 1.0);

  vertices.push(-1, 1, -1);
  normals.push(0.0, 1.0, 0.0);
  vertices.push(-1, 1, 1);
  normals.push(0.0, 1.0, 0.0);
  vertices.push(1, 1, 1);
  normals.push(0.0, 1.0, 0.0);
  vertices.push(1, 1, -1);
  normals.push(0.0, 1.0, 0.0);

  vertices.push(-1, -1, -1);
  normals.push(0.0, -1.0, 0.0);
  vertices.push(1, -1, -1);
  normals.push(0.0, -1.0, 0.0);
  vertices.push(1, -1, 1);
  normals.push(0.0, -1.0, 0.0);
  vertices.push(-1, -1, 1);
  normals.push(0.0, -1.0, 0.0);

  vertices.push(-1, -1, 1);
  normals.push(-1.0, 0.0, 0.0);
  vertices.push(-1, 1, 1);
  normals.push(-1.0, 0.0, 0.0);
  vertices.push(-1, 1, -1);
  normals.push(-1.0, 0.0, 0.0);
  vertices.push(-1, -1, -1);
  normals.push(-1.0, 0.0, 0.0);

  vertices.push(1, -1, -1);
  normals.push(1.0, 0.0, 0.0);
  vertices.push(1, 1, -1);
  normals.push(1.0, 0.0, 0.0);
  vertices.push(1, 1, 1);
  normals.push(1.0, 0.0, 0.0);
  vertices.push(1, -1, 1);
  normals.push(1.0, 0.0, 0.0);

  indices.push(
    0,1,2,
    0,2,3,
    4,5,6,
    4,6,7,
    // 8,9,10,
    // 8,10,11,
    12,13,14,
    12,14,15,
    16,17,18,
    16,18,19,
    20,21,22,
    20,22,23
  );

  let verticesBuffer = new Float32Array(vertices);
  let normalBuffer = new Float32Array(normals);
  let indicesBuffer = new Uint16Array(indices);
  // let normalsBuffer = new Float32Array(normals);
  return {
    vertices: verticesBuffer,
    normals: normalBuffer,
    indices: indicesBuffer,
  };
};