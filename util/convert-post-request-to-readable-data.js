/**
 * The function will convert post request into readable form
 * @param {Object} req.body
 * @returns An array of objects in readable form
 */
const convertPostRequestToReadableData = (body) => {
  let data = Object.entries(body);

  const arr = [];

  // iterate and cut every four consecutive elements
  for (let i = 0; i < data.length; i++) {
    const entry = data.splice(0, 4);

    // extra individual key and value
    const when = entry[0][1];
    const type = entry[1][1];
    const crOrDr = entry[2][1];
    const amount = Number.parseInt(entry[3][1]);

    // make it readable
    const newEntry = {
      when,
      type,
      [crOrDr]: amount,
    };

    arr.push(newEntry);
  }

  return arr;
};

module.exports = {
  convertPostRequestToReadableData,
};
