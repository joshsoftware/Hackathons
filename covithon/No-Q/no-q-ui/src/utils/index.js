export const createOptions = (list) =>
  list.map((category) => ({
    value: category.id,
    label: category.code,
  }));
