/**
 * A helper function for determining the most optimal foreground
 * color given a background color such that the foreground color
 * remains visible, and most importantly for text, readable.
 * @param hexcolor A hex color (with or without the #)
 * @returns An optimal hex color
 */
export const getContrastYIQ = (hexcolor: string) => {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};
