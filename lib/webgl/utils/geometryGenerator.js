export const generatePlane = (width = 200, height = 200, offset = .1) => {
  let vertices = [];
  let indices = [];
  let texCoords = [];

  for(let i = 0; i <= width; i++){
    for(let j = 0; j <= height; j++){
      vertices.push(i * offset, 0, j * offset);
      texCoords.push(i/width * 20, j/height * 20);
    }
  }

  for(let i = 0; i < height; i++){
    for(let j = (width)*i + i; j < (width)*i + (width + i); j++){
      indices.push(j);
      indices.push(j+1);
      indices.push(j+width+1);
      indices.push(j+1);
      indices.push(j+2+width);
      indices.push(j+1+width);
    }
  }


  let currentIndexLength = vertices.length / 3;
  for(let i = 0; i <= width; i++){
      indices.push(currentIndexLength);
      indices.push(currentIndexLength + 1);
      indices.push(currentIndexLength + 3);
      indices.push(currentIndexLength + 1);
      indices.push(currentIndexLength + 2);
      indices.push(currentIndexLength + 3);
      currentIndexLength += 4;

      indices.push(currentIndexLength);
      indices.push(currentIndexLength + 1);
      indices.push(currentIndexLength + 3);
      indices.push(currentIndexLength + 1);
      indices.push(currentIndexLength + 2);
      indices.push(currentIndexLength + 3);
      currentIndexLength += 4;

      vertices.push(0,0,(i-1)*offset);
      vertices.push(0,0,i*offset);
      vertices.push(0,-4,i*offset);
      vertices.push(0,-4,(i-1)*offset);
      
      vertices.push((i)*offset,0,20);
      vertices.push((i+1)*offset,0,20);
      vertices.push((i+1)*offset,-4,20);
      vertices.push((i)*offset,-4,20);

      
      texCoords.push((i)/width * 20, 0);
      texCoords.push((i+1)/width * 20, 0);
      texCoords.push((i)/width * 20, 4);
      texCoords.push((i+1)/width * 20,4);

      texCoords.push((i)/width * 20, 0);
      texCoords.push((i+1)/width * 20, 0);
      texCoords.push((i)/width * 20, 4);
      texCoords.push((i+1)/width * 20,4);
  }

  let verticesBuffer = new Float32Array(vertices);
  let indicesBuffer = new Uint16Array(indices);
  let textureBuffer = new Float32Array(texCoords);
  
  return {
    vertices: verticesBuffer,
    texCoords: textureBuffer,
    indices: indicesBuffer
  };
};

export const generateBox = () => {
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
    // 4,5,6,
    // 4,6,7,
    // 8,9,10,
    // 8,10,11,
    12,13,14,
    12,14,15,
    // 16,17,18,
    // 16,18,19,
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