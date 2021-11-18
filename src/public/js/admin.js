const checkAnswer = (btn) => {
  const URL = btn.getAttribute("post-url");
  const formData = parseFormInputsIntoObject(btn);

  console.log(formData);

  (async () => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw {
          statusCode: res.status,
          ...data,
        };
      }

      console.log(data);

    } catch (err) {
      console.log(err.message);
    }
  })();
};

/**
 * Grab all input attributes and parse it into an object
 * @param {Object} btn
 * @returns {Object} list of form data
 */
const parseFormInputsIntoObject = (btn) => {
  const inputs = btn.querySelectorAll("input");
  const formData = {};

  for (var i = 0; i < inputs.length; i++) {
    formData[inputs[i].name] = inputs[i].value;
  }


  return formData;
};
