export const todayDay = date => {
  return date.toLocaleString(undefined, { weekday: "long" });
};

export const todayDate = date => {
  return date.toLocaleString(undefined, { month: "long", day: "numeric" });
};
