// a helper function to truncate text to a specified length
export const truncate = (text = "", length = 100) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};