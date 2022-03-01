export const getAge = (dob) => {
  const date = new Date(dob);
  return new Date().getFullYear() - date.getFullYear();
};
