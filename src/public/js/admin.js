const checkAnswer = (btn) => {
  const URL = btn.getAttribute("post-url");
  const formData = parseFormInputsIntoObject(btn);

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

      document.querySelector(".card-body").before(Toast("ok", data.message));
      document.querySelector(".answer").remove(0);
    } catch (err) {
      document.querySelector(".card-body").before(Toast("err", err.message));
    }
  })();
};

/**
 * Grab all input attributes and parse it into an object
 * @param {Object} btn
 * @returns {Object} formData - list of form data
 */
const parseFormInputsIntoObject = (btn) => {
  const inputs = btn.querySelectorAll("input");
  const formData = {};

  for (var i = 0; i < inputs.length; i++) {
    formData[inputs[i].name] = inputs[i].value;
  }

  return formData;
};

/**
 * Create a new tost component to append into document body
 * @param {String} type
 * @param {String} message
 * @returns {Object} html component
 */
const Toast = (type, message) => {
  // if there is error already remove
  if (document.querySelectorAll(".toast")) {
    document.querySelectorAll(".toast").forEach((el) => {
      el.remove();
    });
  }

  const html = document.createElement("div");
  html.innerHTML = `
  <div class="toast toast-${type}">
    <p class="toast-body">${message}</p>
  </div>
  `;
  return html;
};
