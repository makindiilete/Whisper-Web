const arr = ["a", 1, 4, "b", "d", 5, "def", 56];

function reArrangeArr(arr) {
  let integerArr = [];
  let stringArr = [];
  arr.forEach((item) => {
    if (typeof item === "string") {
      stringArr.push(item);
    } else {
      integerArr.push(item);
    }
  });
  let allArrays = [...integerArr, ...stringArr];
  console.log(allArrays);
  return allArrays;
}

reArrangeArr(arr);
