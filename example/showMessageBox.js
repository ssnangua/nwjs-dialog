const { showMessageBox } = require("../dist/nwjs-dialog");

document
  .querySelectorAll('[data-command="showMessageBox"]')
  .forEach((button) => {
    const type = button.getAttribute("data-type");
    button.addEventListener("click", () => {
      showMessageBox({
        message: type,
        type,
        // platform: "darwin",
      });
    });
  });

document
  .querySelector('[data-command="showMessageBox-1"]')
  .addEventListener("click", () => {
    showMessageBox({
      message: "Message",
      type: "info",
      buttons: ["OK", "Cancel"],
      title: "Title",
      detail: "Detail",
      checkboxLabel: "Checkbox",
      checkboxChecked: true,
      icon: "",
      platform: "default",
      customStyle: ".win32 .button:first-child { border-color: #0078d7; }",
    }).then(({ button, checkboxChecked }) => {
      console.log(button);
      console.log(checkboxChecked);
    });
  });

document
  .querySelector('[data-command="showMessageBox-2"]')
  .addEventListener("click", () => {
    showMessageBox({
      title: "Input Options",
      // platform: "darwin",
      inputOptions: {
        radios: [
          { label: "Radio 1" },
          { label: "Radio 2", value: true, description: "Description" },
        ],
        checkboxes: [
          { label: "Checkbox 1", description: "Description" },
          { label: "Checkbox 2", value: true },
        ],
        inputs: [
          {
            label: "Input 1",
            placeholder: "Placeholder",
            description: "Description",
          },
          {
            label: "Input 2",
            value: "123456",
            password: true,
            description: "Password Input",
          },
        ],
      },
    }).then(({ button, inputData }) => {
      if (button === 0) {
        const { radios, checkboxes, inputs } = inputData;
        console.log({ radios, checkboxes, inputs });
      }
    });
  });

document
  .querySelector('[data-command="showMessageBox-3"]')
  .addEventListener("click", () => {
    showMessageBox({
      title: "Simple Inputs Validators",
      // platform: "darwin",
      inputOptions: {
        checkboxes: [
          { label: "Checkbox", required: true, description: "Required" },
        ],
        inputs: [
          {
            label: "Input 1",
            value: "",
            required: true,
            description: "Required",
          },
          {
            label: "Input 2",
            value: "abc",
            rule: /^[0-9]+$/,
            description: "A RegExp rule. This input can only have numbers.",
          },
          {
            label: "Input 2",
            value: "Value",
            rule: (value) => value === "ssnangua",
            description: "A function rule. This input must be `ssnangua`.",
          },
        ],
      },
      // Called after input option validate, contains all input options errors, if everything is correct, it will be an empty array.
      onValidate(errors, win) {
        win.window.document
          .querySelector(".button:first-child")
          .classList[errors.length > 0 ? "add" : "remove"]("disabled");
      },
    });
  });
