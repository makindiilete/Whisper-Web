function capitalizeWords(sentence = "") {
  // ds function capitalized the first character of every word in a given sentence
  /*
  1-  Split the sentence by space into an array
  2-  Loop over the array picking each word
  3-  set the character at index 0 of each word to upper case, so d array now contain all capitalized word
  4-  join all d array element using ','
  5-  Replace ',' in d string with space " "
  */
  if (sentence) {
    let strArray = sentence.split(" ");
    for (let i = 0; i < strArray.length; i++) {
      strArray[i] =
        strArray[i].substring(0, 1).toUpperCase() +
        strArray[i].substring(1).toLowerCase(); // treeS arE beautiful ==> Trees Are Beautiful
      /*   strArray[i] = strArray[i].replace(
        strArray[i][0],
        strArray[i][0].toUpperCase()
      );  // treeS arE beautiful ==> TreeS ArE Beautiful*/
    }
    strArray = strArray.join(",");
    // replace the comma joining the sentence with a space and trim d space before and behind each word
    strArray = strArray.replace(/,/g, " ").trim();
    // replace all excess white spaces dt might be between words with a single white space
    strArray = strArray.replace(/ +/g, " ");
    console.log(strArray);
  } else {
    console.log("No string detected");
  }
}

function capital(data) {
  let splitted = data.split(" ");
  let res = [];
}

// capitaliseEach(null);
// capitaliseEach("")
// capitaliseEach("treeS arE beautiful")
// capitaliseEach("today is a great day")
// capitaliseEach()
// capitaliseEach("are genius    born   or   are   they     made");
// capitaliseEach("       are genius born or made       ");
