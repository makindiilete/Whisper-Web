//Use d params (num1, num2) to perform an operation, when U r done, pass d result to d callback function
function add(num1, num2, callback) {
  //Operation performed
  const solution = num1 + num2;
  // callback with d result
  callback(solution);
}

const logToConsole = (num1, num2) => {
  add(num1, num2, (result) => console.log(result));
};

logToConsole(7, 99);
