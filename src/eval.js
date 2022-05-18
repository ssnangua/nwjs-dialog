function $(selector) {
  return document.querySelector(selector);
}
function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}
function appendInputOptions(data, type) {
  const div = document.createElement("div");
  div.classList.add("input-group");
  let hideLabel = "";
  if (type === "input") {
    div.classList.add("table");
    hideLabel = data.find(({ label }) => label) ? "" : "hide";
  }
  div.innerHTML = data
    .map(
      (
        {
          label,
          value,
          description,
          placeholder,
          password,
          required,
          disabled,
        },
        index
      ) => {
        switch (type) {
          case "radio":
          case "checkbox":
            return `<div class="${type} ${disabled ? "disabled" : ""}">
  <input type="${type}" name="${type}" value="${type}_${index}" id="${type}_${index}"
    ${value ? "checked" : ""} data-index="${index}" class="${type}-input" />
  <label for="${type}_${index}">
    <div class="${type}-label ${required ? "required" : ""}"
    >${label || ""}</div>
    <div class="description ${description ? "" : "hide"}"
    >${description || ""}</div>
  </label>
</div>`;
          case "input":
            return `<div class="table-row ${disabled ? "disabled" : ""}">
  <div class="table-cell input-label ${required ? "required" : ""} ${hideLabel}"
  >${label || ""}</div>
  <div class="table-cell input-box">
    <input class="input-input" type="${password ? "password" : "text"}"
      value="${value || ""}" placeholder="${placeholder || ""}" />
    <div class="description ${description ? "" : "hide"}"
    >${description || ""}</div>
  </div>
</div>`;
        }
        return "";
      }
    )
    .join("");
  $(".input-options").appendChild(div);
  return div;
}
window.__setOptions__ = ({
  title = "",
  type = "none",
  icon = "",
  buttons = [],
  message = "",
  detail = "",
  checkboxLabel = "",
  checkboxChecked = false,
  platform = "",
  customStyle = "",
  inputOptions,
}) => {
  $("body").classList.add(platform, `type-${type}`);
  // Custom style
  $("#custom-style").innerHTML = customStyle;
  // Title
  document.title = title;
  // Icon
  $(".header-icon").src = icon;
  if (type === "none") {
    $(".body-icon").classList.add("hide");
  } else {
    $(".body").classList.add("has-icon");
    $(".body-icon").src = icon;
  }
  // Input options
  if (inputOptions) {
    let inited = false;
    const errors = {};
    function setError(key, error) {
      if (error) errors[key] = error;
      else delete errors[key];
      if (inited) onError();
    }
    function onError() {
      window.__onValidate__(Object.values(errors));
    }
    Object.entries(inputOptions).forEach(([key, data]) => {
      // Radios
      if (key === "radios") appendInputOptions(data, "radio");
      // Checkboxes
      if (key === "checkboxes") {
        const div = appendInputOptions(data, "checkbox");
        div.querySelectorAll("input").forEach((input, index) => {
          input.addEventListener("change", () => {
            const isError = data[index].required && !input.checked;
            input.parentNode.classList[isError ? "add" : "remove"]("error");
            setError(
              `${key}_${index}`,
              isError && { key, index, error: "required" }
            );
          });
          input.dispatchEvent(new Event("change"));
        });
      }
      // Inputs
      if (key === "inputs") {
        const div = appendInputOptions(data, "input");
        console.log(data);
        div.querySelectorAll("input").forEach((input, index) => {
          input.addEventListener("blur", () => {
            const { required, rule } = data[index];
            let isError = false;
            if (required && !input.value.trim()) {
              isError = true;
              setError(`${key}_${index}`, { key, index, error: "required" });
            } else if (
              rule &&
              !(typeof rule === "function"
                ? rule(input.value)
                : rule.test(input.value))
            ) {
              isError = true;
              setError(`${key}_${index}`, { key, index, error: "rule" });
            } else {
              setError(`${key}_${index}`, false);
            }
            const row = input.parentNode.parentNode;
            row.classList[isError ? "add" : "remove"]("error");
          });
          input.dispatchEvent(new Event("blur"));
        });
      }
    });
    inited = true;
    setTimeout(onError, 0);
  } else {
    $(".input-options").classList.add("hide");
  }
  // Text
  $(".title").innerHTML = title;
  $(".message").innerHTML = message;
  $(".detail").innerHTML = detail;
  // Checkbox
  if (checkboxLabel) {
    $(".footer .checkbox-label").innerHTML = checkboxLabel;
    if (checkboxChecked)
      $(".footer .checkbox-input").setAttribute("checked", "checked");
  } else {
    $(".footer .checkbox").classList.add("hide");
  }
  // Buttons
  function getReturnValue(button) {
    const returnValue = { button };
    if (checkboxLabel) {
      returnValue.checkboxChecked = !!$(".footer .checkbox-input:checked");
    }
    if (inputOptions) {
      returnValue.inputData = {};
      if (inputOptions.radios) {
        const checkedRadio = $(".body .radio-input:checked");
        returnValue.inputData.radios = checkedRadio
          ? +checkedRadio.dataset.index
          : -1;
      }
      if (inputOptions.checkboxes) {
        returnValue.inputData.checkboxes = $all(".body .checkbox-input").map(
          (input) => input.checked
        );
      }
      if (inputOptions.inputs) {
        returnValue.inputData.inputs = $all(".body .input-input").map(
          (input) => input.value
        );
      }
    }
    return returnValue;
  }
  $(".buttons").innerHTML = "";
  buttons.forEach((label, index) => {
    const button = document.createElement("button");
    button.innerHTML = label;
    button.classList.add("button");
    $(".buttons").appendChild(button);
    button.addEventListener("click", async () => {
      const result = await window.__messageBoxCallback__(getReturnValue(index));
      if (result !== false) window.close();
    });
  });
  $(".close-button").addEventListener("click", () => {
    window.__messageBoxCallback__(getReturnValue(-1));
    window.close();
  });
  // Auto resize
  const { offsetWidth, offsetHeight } = $(".message-box");
  window.resizeTo(offsetWidth, offsetHeight);
};
