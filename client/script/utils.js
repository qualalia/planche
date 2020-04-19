export const todayDay = date => {
  return new Date(date).toLocaleString(undefined, { weekday: "long" });
};

export const todayDate = date => {
  return new Date(date).toLocaleString(undefined, {
    month: "long",
    day: "numeric",
  });
};

export const defaultDay = () => {
  return new Date().toLocaleString(undefined, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};
