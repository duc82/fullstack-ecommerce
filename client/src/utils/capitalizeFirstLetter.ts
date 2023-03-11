export default (str: string) => {
  const arr = str.split(" ");
  const newArr = arr.map((a) => a.charAt(0).toUpperCase() + a.slice(1));
  return newArr.join(" ");
};
