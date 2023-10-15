import { FRUITS } from "./data";

export const getSuggestions = async (keyword) => {
  const result = FRUITS.filter((fruit) => {
    return (
      fruit.substr(0, keyword.length).toLowerCase() === keyword.toLowerCase()
    );
  });

  return new Promise((res) => {
    setTimeout(() => res(result), 1000);
  });
};

export const debounce = (fn, delay = 500) => {
  let timerID;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timerID);
    timerID = setTimeout(() => fn.apply(context, args), delay);
  };
};
