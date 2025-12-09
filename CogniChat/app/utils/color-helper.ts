// A helper function for determining what color text should be
// given a background color such that the text remains as
// visible as possible.
// This function is a little unreliable. You must be careful
// to only pass in hex colors of full length. (6 or 7 characters
// if counting the hash symbol)
export const getContrastYIQ = (hexcolor: string) => {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};
