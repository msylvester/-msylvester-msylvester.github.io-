/* eslint-disable */

/**
 * @name hexToRgb 
 * @param {string} hex the hex version of the color 
 * @param {string} eColor if color not specifid rgb(0,0,0) returned
 * Idea for this function came from a stackoverflow credit in link
 * @see {@link https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb} (
 * @returns a string rpresenting the rgb value of hex parameter 
 */

export const hexToRgb = (hex, eColor = 'black') => {
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => (r + r + g + g + b + b))

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result)
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`

  return eColor;
}


/**
 * @constant noCols 
 * @constant noRows 
 */
export const noCols = 15,  noRows = 10; 

/* eslint-enable */