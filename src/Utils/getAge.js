export const getAge = (dob) => {
  const year = dob?.split("-")[2];
  const result = new Date().getFullYear() - year;
  if (result) {
    return result;
  } else {
    return "";
  }
};
