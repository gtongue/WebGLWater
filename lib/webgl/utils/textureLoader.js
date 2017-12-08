/**
 * 
 * @param {WebGLRenderingContext} GL 
 * @param {string} url 
 */

//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
export const loadTexture = (GL, url) => {

  const texture = GL.createTexture();
  GL.bindTexture(GL.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = GL.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = GL.RGBA;
  const srcType = GL.UNSIGNED_BYTE;
  const pixel = new Uint8Array([255,0,0,255]);
  GL.texImage2D(GL.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

  const image = new Image();
  image.onload = () => {
    GL.bindTexture(GL.TEXTURE_2D, texture);
    GL.texImage2D(GL.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
    if(isPowerOf2(image.width) && isPowerOf2(image.height)){
      GL.generateMipmap(GL.TEXTURE_2D);
    }else{
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    }
  };

  image.src = url;
  return texture;
};

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}