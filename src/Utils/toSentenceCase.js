export const toSentenceCase = (string) => {
  let stringArr = string.split(" ");
  let joinedArr = [];
  for (let i = 0; i < stringArr.length; i++) {
    let firstLetter = stringArr[i][0];
    let converted = stringArr[i].replace(
      firstLetter,
      firstLetter.toUpperCase()
    );
    joinedArr = [...joinedArr, converted];
  }
  let joinedString = joinedArr.join(",");
  return joinedString.replace(",", " ");
};
