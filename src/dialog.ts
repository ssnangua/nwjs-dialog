/**
 * NW.js dialog
 *
 * @remarks
 * File dialog and message box for NW.js.
 *
 * @packageDocumentation
 */
const path = nw.require("path");
const fs = nw.require("fs");

// @ts-ignore: import platformsPreset
__IMPORT_PLATFORMS__;

/**
 * To make sure the document is available
 * @param document
 * @returns
 */
function domReady(document: Document): Promise<void> {
  return new Promise((resolve) => {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", () => resolve());
    }
  });
}

/**
 * Get win and options from varargs
 * @typeParam TOptions - The type of the options
 * @param winOrOptions
 * @param maybeOptions
 * @returns
 */
function getWinAndOptions<TOptions>(
  winOrOptions?: NWJS_Helpers.win | Window | TOptions,
  maybeOptions?: TOptions
): [win: NWJS_Helpers.win | Window, options: TOptions] {
  const win =
    winOrOptions &&
    "window" in winOrOptions &&
    winOrOptions.window === winOrOptions.window.window
      ? winOrOptions
      : nw.Window.get();
  const options = (win === winOrOptions ? maybeOptions : winOrOptions) || {};
  return [win, options as TOptions];
}

/**
 * Dialog return format
 *
 * @remarks
 * - `"string"` - Return an array of file paths chosen by the user
 *
 * - `"file"` - Return an array of files chosen by the user
 *
 * @public
 */
export type DialogReturnFormat = "string" | "file";

/**
 * showOpenDialog options
 * @param nwdirectorydesc - Dialog title
 * @param nwworkingdir - Default path
 * @param nwdirectory - Select directory
 * @param multiple - Allow multiple files to be selected
 * @param accept - Defines the file types should accept
 * @param returnFormat - Return format, `"string"` or `"file"`, `"string"` by default
 * @param title - Alias of `nwdirectorydesc`
 * @param defaultPath - Alias of `nwworkingdir`
 * @param openDirectory - Alias of `nwdirectory`
 *
 * @remarks
 * `multiple` and `accept` have no effect when `nwdirectory` is `true`.
 *
 * @public
 */
export interface OpenDialogOptions {
  nwdirectorydesc?: string;
  nwworkingdir?: string;
  nwdirectory?: boolean;
  multiple?: boolean;
  accept?: string;
  returnFormat?: DialogReturnFormat;
  title?: string;
  defaultPath?: string;
  openDirectory?: boolean;
}

/**
 * showSaveDialog options
 * @param nwworkingdir - Default path
 * @param nwsaveas - Default filename for saving
 * @param accept - Defines the file types should accept
 * @param returnFormat - Return format, `"string"` or `"file"`, `"string"` by default
 * @param defaultPath - Alias of `nwworkingdir`
 * @param filename - Alias of `nwsaveas`
 *
 * @remarks
 * When `nwsaveas` is omitted, the filename defaults to empty.
 *
 * @public
 */
export interface SaveDialogOptions {
  nwworkingdir?: string;
  nwsaveas?: string;
  accept?: string;
  returnFormat?: DialogReturnFormat;
  defaultPath?: string;
  filename?: string;
}

async function showFileDialog(
  win: NWJS_Helpers.win | Window,
  options: OpenDialogOptions | SaveDialogOptions
): Promise<String[] | File[]> {
  await domReady(win.window.document);
  if ("nwdirectory" in options && !options.nwdirectory)
    delete options.nwdirectory;
  if ("multiple" in options && !options.multiple) delete options.multiple;
  const input = win.window.document.createElement("input");
  Object.entries({ type: "file", ...options }).forEach(([key, value]) => {
    if (value !== undefined) input.setAttribute(key, String(value));
  });
  input.click();
  return new Promise((resolve) => {
    input.addEventListener("change", () => {
      if (options.returnFormat === "file") {
        resolve(Array.from(input.files || []));
      } else {
        resolve(input.value.split(";"));
      }
    });
  });
}

/**
 * Shows an open dialog
 * @returns An array of file paths chosen by the user
 *
 * @remarks
 * This method creates a temporary `<input>` and triggers `click` event to shows an open dialog.
 *
 * @example
 * ```js
 * const { showOpenDialog } = require("nwjs-dialog");
 * showOpenDialog().then(([filePath]) => {
 *   console.log(filePath);
 * });
 * ```
 *
 * @public
 */
export function showOpenDialog(): Promise<String[]>;

/**
 * Shows an open dialog
 * @param options - Open dialog options
 * @returns An array of files or file paths chosen by the user
 *
 * @remarks
 * This method creates a temporary `<input>` and triggers `click` event to shows an open dialog.
 *
 * @example
 * ```js
 * const { showOpenDialog } = require("nwjs-dialog");
 * showOpenDialog({
 *   nwdirectorydesc: "Dialog title",
 *   nwworkingdir: process.cwd(),
 *   nwdirectory: false,
 *   multiple: true,
 *   accept: "audio/*,video/*,image/*,.txt"
 * }).then((filePaths) => {
 *   console.log(filePaths);
 * });
 * ```
 *
 * @public
 */
export function showOpenDialog(
  options: OpenDialogOptions
): Promise<String[] | File[]>;

/**
 * Shows an open dialog
 * @param win - The `win` argument allows the dialog to attach itself to a parent window, making it modal.
 * @returns An array of file paths chosen by the user
 *
 * @remarks
 * This method creates a temporary `<input>` and triggers `click` event to shows an open dialog.
 *
 * @example
 * ```js
 * const { showOpenDialog } = require("nwjs-dialog");
 * nw.Window.open("newWin.html", (win) => {
 *   showOpenDialog(win).then(([filePath]) => {
 *     console.log(filePath);
 *   });
 * });
 * ```
 *
 * @public
 */
export function showOpenDialog(
  win: NWJS_Helpers.win | Window
): Promise<String[]>;

/**
 * Shows an open dialog
 * @param win - The `win` argument allows the dialog to attach itself to a parent window, making it modal.
 * @param options - Open dialog options
 * @returns An array of files or file paths chosen by the user
 *
 * @remarks
 * This method creates a temporary `<input>` and triggers `click` event to shows an open dialog.
 * If the `win` argument is omitted, it will be the current window.
 *
 * @example
 * ```js
 * const { showOpenDialog } = require("nwjs-dialog");
 * showOpenDialog(nw.Window.get(), {}).then((filePaths) => {
 *   console.log(filePaths);
 * });
 * ```
 *
 * @public
 */
export function showOpenDialog(
  win: NWJS_Helpers.win | Window,
  options: OpenDialogOptions
): Promise<String[] | File[]>;

export function showOpenDialog(
  winOrOptions?: NWJS_Helpers.win | Window | OpenDialogOptions,
  maybeOptions?: OpenDialogOptions
): Promise<String[] | File[]> {
  const [win, options] = getWinAndOptions(winOrOptions, maybeOptions);
  if ("nwsaveas" in options) delete (options as SaveDialogOptions).nwsaveas;
  if ("title" in options) {
    options.nwdirectorydesc = options.nwdirectorydesc || options.title;
    delete options.title;
  }
  if ("defaultPath" in options) {
    options.nwworkingdir = options.nwworkingdir || options.defaultPath;
    delete options.defaultPath;
  }
  if ("openDirectory" in options) {
    options.nwdirectory = options.nwdirectory || options.openDirectory;
    delete options.openDirectory;
  }
  return showFileDialog.apply(null, [win, options]);
}

/**
 * Shows a save dialog
 * @returns An array of file paths chosen by the user.
 *
 * @remarks
 * This method creates a temporary `<input>` and triggers `click` event to shows a save dialog.
 *
 * @example
 * ```js
 * const fs = require("fs");
 * const { showSaveDialog } = require("nwjs-dialog");
 * showSaveDialog().then(([filePath]) => {
 *   fs.writeFileSync(filePath, "Hello");
 * });
 * ```
 *
 * @public
 */
export function showSaveDialog(): Promise<String[]>;

/**
 * Shows a save dialog
 * @param options - Save dialog options
 * @returns An array of files or file paths chosen by the user.
 *
 * @remarks
 * This method creates a temporary `<input>` and triggers `click` event to shows a save dialog.
 *
 * @example
 * ```js
 * const fs = require("fs");
 * const { showSaveDialog } = require("nwjs-dialog");
 * showSaveDialog({
 *   nwworkingdir: process.cwd(),
 *   nwsaveas: "1.txt",
 *   accept: "audio/*,video/*,image/*,.txt"
 * }).then(([filePath]) => {
 *   fs.writeFileSync(filePath, "Hello");
 * });
 * ```
 *
 * @public
 */
export function showSaveDialog(
  options: SaveDialogOptions
): Promise<String[] | File[]>;

/**
 * Shows a save dialog
 * @param win - The `win` argument allows the dialog to attach itself to a parent window, making it modal.
 * @returns An array of file paths chosen by the user.
 *
 * @remarks
 * This method creates a temporary `<input>` and triggers `click` event to shows a save dialog.
 *
 * @example
 * ```js
 * const fs = require("fs");
 * const { showSaveDialog } = require("nwjs-dialog");
 * nw.Window.open("newWin.html", (win) => {
 *   showSaveDialog(win).then(([filePath]) => {
 *     fs.writeFileSync(filePath, "Hello");
 *   });
 * });
 * ```
 *
 * @public
 */
export function showSaveDialog(
  win: NWJS_Helpers.win | Window
): Promise<String[]>;

/**
 * Shows a save dialog
 * @param win - The `win` argument allows the dialog to attach itself to a parent window, making it modal.
 * @param options - Save dialog options
 * @returns An array of files or file paths chosen by the user.
 *
 * @remarks
 * This method creates a temporary `<input>` and triggers `click` event to shows a save dialog.
 * If the `win` argument is omitted, it will be the current window.
 *
 * @example
 * ```js
 * const fs = require("fs");
 * const { showSaveDialog } = require("nwjs-dialog");
 * showSaveDialog(nw.Window.get(), {}).then(([filePath]) => {
 *   fs.writeFileSync(filePath, "Hello");
 * });
 * ```
 *
 * @public
 */
export function showSaveDialog(
  win: NWJS_Helpers.win | Window,
  options: SaveDialogOptions
): Promise<String[] | File[]>;

export function showSaveDialog(
  winOrOptions?: NWJS_Helpers.win | Window | SaveDialogOptions,
  maybeOptions?: SaveDialogOptions
): Promise<String[] | File[]> {
  const [win, options] = getWinAndOptions(winOrOptions, maybeOptions);
  if ("defaultPath" in options) {
    options.nwworkingdir = options.nwworkingdir || options.defaultPath;
    delete options.defaultPath;
  }
  if ("filename" in options) {
    options.nwsaveas = options.nwsaveas || options.filename;
    delete options.filename;
  }
  return showFileDialog(win, { nwsaveas: "", ...options });
}

/**
 * Alias of `string`, used to identify the base64 data of the image.
 * @public
 */
export type ImageBase64 = string;
/**
 * Alias of `string`, used to identify the url.
 * @public
 */
export type URLString = string;

/**
 * Platform preset
 * @param dirPath - Message box temporary directory path.
 * @param htmlTemplate - Message box template, used to create `MessageBox.html`.
 * @param htmlPath - `MessageBox.html`'s relative path.
 * @param icons - Preset icons map.
 * @param iconsURL - Preset icons's url map.
 *
 * @remarks
 * `htmlPath` and `iconsURL` are automatically obtained after the html or image file is created.
 *
 * @public
 */
export interface Platform {
  dirPath: string;
  htmlTemplate: string;
  htmlPath: string;
  icons: { [type: string]: ImageBase64 };
  iconsURL: { [type: string]: URLString };
}

/**
 * Platforms preset map
 *
 * @remarks
 * Currently platforms have `win32` and `darwin`.
 *
 * @public
 */
export interface Platforms {
  [platformName: string]: Platform;
}

/**
 * Message box input option
 * @param label - Text for the item's label.
 * @param value - Default value for the item. Radio and checkbox are boolean, input is string.
 * @param description - Description for the item.
 * @param placeholder - Placeholder for input.
 * @param password - Set to password input.
 * @param required - Whether the input is required.
 * @param rule - Validation rule for the input. Can be RegExp or function.
 * @public
 */
export interface MessageBoxInputOption {
  label?: string;
  value?: boolean | string;
  description?: string;
  placeholder?: string;
  password?: boolean;
  required?: boolean;
  rule?: RegExp | ((value: string) => boolean);
}

/**
 * Message box input options
 * @param radios - Array of input option for radios
 * @param checkboxes - Array of input option for checkboxes
 * @param inputs - Array of input option for inputs
 * @public
 */
export interface MessageBoxInputOptions {
  radios?: MessageBoxInputOption[];
  checkboxes?: MessageBoxInputOption[];
  inputs?: MessageBoxInputOption[];
}

/**
 * Validate error info
 * @param key - Error option key
 * @param index - Error item index
 * @param error - Error message
 * @public
 */
export interface ValidateError {
  key: string;
  index: number;
  error: string;
}

/**
 * showMessageBox options
 * @param message - Content of the message box
 * @param type - Can be "none", "info", "error", "question", "warning" or "success"
 * @param buttons - Array of texts for buttons
 * @param title - Title of the message box
 * @param detail - Extra information of the message
 * @param checkboxLabel - If provided, the message box will include a checkbox with the given label
 * @param checkboxChecked - Initial checked state of the checkbox. `false` by default
 * @param icon - Custom icon
 * @param id - Message box window id
 * @param platform - Message box style, "default", "win32" or "darwin". Follow the os by default
 * @param customStyle - Custom style for message box elements
 * @param inputOptions - User input options
 * @param widthOffset - Message box window width offset
 * @param heightOffset - Message box window height offset
 * @param onLoad - Called when the message box was loaded.
 * @param onClose - Called before the message box closes, return `false` will prevents the window close.
 * @param onValidate - Called after input option validate, contains all input options errors, if everything is correct, it will be an empty array.
 *
 * @remarks
 * If `title` is omitted, it will be the current window's title.
 * If `buttons` is omitted or an empty array, will result in one button labeled "OK".
 *
 * @public
 */
export interface MessageBoxOptions {
  message: string;
  title?: string;
  type?: string;
  icon?: string;
  buttons?: string[];
  detail?: string;
  checkboxLabel?: string;
  checkboxChecked?: boolean;
  id?: string;
  platform?: string;
  customStyle?: string;
  inputOptions?: MessageBoxInputOptions;
  widthOffset?: number;
  heightOffset?: number;
  onLoad?: (win: NWJS_Helpers.win) => void;
  onClose?: (
    response: MessageBoxReturnValue,
    win: NWJS_Helpers.win
  ) => boolean | void;
  onValidate?: (errors: ValidateError[], win: NWJS_Helpers.win) => void;
}

/**
 * Data of the `inputOptions`
 * @param radios - The index of the checked radio of the `inputOptions.radios`
 * @param checkboxes - The checked states of the `inputOptions.checkboxes`
 * @param inputs - The values of the `inputOptions.inputs`
 * @public
 */
export interface MessageBoxInputData {
  radios?: number;
  checkboxes?: boolean[];
  inputs?: string[];
}

/**
 * showMessageBox response
 * @param button - The index of the clicked button. `-1` if close button clicked.
 * @param checkboxChecked - The checked state of the checkbox if `checkboxLabel` was set.
 * @param inputData - Data of the `inputOptions`
 *
 * @remarks
 * Message box resolves with a promise.
 *
 * @public
 */
export interface MessageBoxReturnValue {
  button?: number;
  checkboxChecked?: boolean;
  inputData?: MessageBoxInputData;
}

declare global {
  interface Window {
    __setOptions__: (options: any) => void;
    __messageBoxCallback__: (response: MessageBoxReturnValue) => void;
    __onValidate__: (errors: ValidateError[]) => void;
  }
}

// @ts-ignore: import by replace plugin
let platforms: Platforms = platformsPreset;

// @ts-ignore: import by replace plugin
const version = __VERSION__;

// @ts-ignore: import by replace plugin
const evalTemplate = __EVAL_TEMPLATE__;

// Cache directory for temporary files
let cachePath = process.cwd();

// If there is no matching window icon, show the app's icon
let appIcon = nw.App.manifest?.icon || nw.App.manifest?.window?.icon || "";

let defaultButtons = [navigator.language === "zh-CN" ? "确定" : "OK"];

let messageBoxTypes = [
  "none",
  "info",
  "warning",
  "error",
  "question",
  "success",
];

function checkPlatformInitialized(platform: string): void {
  const preset = platforms[platform];
  if (preset.htmlPath) return;
  const dir = path.resolve(cachePath, "MessageBox", platform);
  const verFile = path.join(dir, version);
  const htmlPath = path.join(dir, "MessageBox.html");
  if (!fs.existsSync(verFile)) {
    // @ts-ignore: force remove cache directory
    if (fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    // Create MessageBox.html
    fs.writeFileSync(htmlPath, preset.htmlTemplate);
    // Create icon files
    Object.entries(preset.icons).forEach(([type, imageBase64]) => {
      const iconPath = path.join(dir, `${type}.png`);
      const data = imageBase64.replace(/^data:image\/png;base64,/, "");
      fs.writeFileSync(iconPath, data, "base64");
    });
    // Create ver file
    fs.writeFileSync(verFile, "");
  }
  preset.dirPath = path.relative(process.cwd(), dir);
  preset.htmlPath = path.relative(process.cwd(), htmlPath);
  Object.keys(preset.icons).forEach((type) => {
    preset.iconsURL[type] = `./${type}.png`;
  });
}

const instances: { [id: string]: boolean | NWJS_Helpers.win } = {};

function messageBox(
  win: NWJS_Helpers.win | Window,
  options: MessageBoxOptions
): Promise<MessageBoxReturnValue> {
  return new Promise(async (resolve) => {
    const document = win.window?.document;
    if (document) await domReady(document);

    let {
      title = document?.title ||
        ("title" in win && win.title) ||
        nw.App.manifest.name,
      type = "none",
      icon = "",
      buttons = [],
      message = "",
      detail = "",
      checkboxLabel = "",
      checkboxChecked,
      id = "",
      platform = "default",
      customStyle = "",
      inputOptions,
      onLoad,
      onClose,
      onValidate,
    } = options;

    // Singleton
    if (id) {
      const instance = instances[id];
      if (instance) {
        if (typeof instance !== "boolean") instance.focus();
        return;
      }
      instances[id] = true;
    }

    if (messageBoxTypes.indexOf(type) === -1)
      throw new TypeError("Invalid message box type");
    if (!Array.isArray(buttons))
      throw new TypeError("`buttons` must be an array");
    if (typeof title !== "string")
      throw new TypeError("`title` must be a string");
    if (typeof message !== "string")
      throw new TypeError("`message` must be a string");
    if (typeof detail !== "string")
      throw new TypeError("`detail` must be a string");
    if (typeof checkboxLabel !== "string")
      throw new TypeError("`checkboxLabel` must be a string");
    if (inputOptions) {
      if (typeof inputOptions !== "object")
        throw new TypeError("`inputOptions` must be an object");
      if (inputOptions.radios && !Array.isArray(inputOptions.radios))
        throw new TypeError("`inputOptions.radios` must be an array");
      if (inputOptions.checkboxes && !Array.isArray(inputOptions.checkboxes))
        throw new TypeError("`inputOptions.checkboxes` must be an array");
      if (inputOptions.inputs) {
        if (!Array.isArray(inputOptions.inputs))
          throw new TypeError("`inputOptions.inputs` must be an array");
        inputOptions.inputs.forEach((item) => {
          if (
            item.rule &&
            Object.prototype.toString.call(item.rule) !== "[object RegExp]" &&
            typeof item.rule !== "function"
          )
            throw new TypeError(
              "`inputOptions.inputs.rule` must be a RegExp or funciton"
            );
        });
      }
    }
    if (onLoad && typeof onLoad !== "function")
      throw new TypeError("`onLoad` must be a function");
    if (onClose && typeof onClose !== "function")
      throw new TypeError("`onClose` must be a function");
    if (onValidate && typeof onValidate !== "function")
      throw new TypeError("`onValidate` must be a function");

    checkboxChecked = !!checkboxChecked;
    if (checkboxChecked && !checkboxLabel) {
      throw new Error(
        "checkboxChecked requires that checkboxLabel also be passed"
      );
    }

    if (platform === "default") platform = process.platform;
    if (!platforms[platform]) platform = "win32";
    checkPlatformInitialized(platform);
    const preset = platforms[platform];

    let winIcon;
    let base64: string | undefined;
    if (icon) {
      winIcon = icon;
      icon = path.relative(preset.htmlPath, winIcon).replace(/\\/g, "/");
      // base64 = `data:image/png;base64,${fs.readFileSync(icon, 'base64')}`;
    } else {
      icon = preset.iconsURL[type] || preset.iconsURL.none;
      base64 = preset.icons[type] || preset.icons.none;
      winIcon = path.join(path.relative(process.cwd(), preset.dirPath), icon);
      if (platform === "darwin" && !preset.iconsURL[type] && appIcon) {
        icon = path.relative(preset.htmlPath, appIcon).replace(/\\/g, "/");
        // base64 = `data:image/png;base64,${fs.readFileSync(appIcon, 'base64')}`;
        winIcon = appIcon;
      }
    }

    if (buttons.length === 0) buttons = defaultButtons;

    nw.Window.open(
      preset.htmlPath + `?t=${Date.now()}`,
      {
        id,
        frame: false,
        show: false,
        position: "center",
        icon: winIcon,
        ...{
          transparent: platform === "darwin",
        },
      },
      (win: NWJS_Helpers.win | undefined) => {
        if (!win) return;
        if (id) {
          instances[id] = win;
          win.on("closed", () => delete instances[id]);
        }
        win.on("loaded", () => {
          // onLoad handler
          onLoad && onLoad(win);
          // Resolver
          win.window.__messageBoxCallback__ = async (
            response: MessageBoxReturnValue
          ): Promise<boolean | void> => {
            // onClose handler
            if (onClose && (await onClose(response, win)) === false)
              return false;
            resolve(response);
          };
          // onValidate handler
          win.window.__onValidate__ = (errors: ValidateError[]) => {
            onValidate && onValidate(errors, win);
          };
          // @ts-ignore: frame can be null
          win.eval(null, evalTemplate);
          // Init message box data
          win.window.__setOptions__({
            title,
            type,
            icon,
            base64,
            buttons,
            message,
            detail,
            checkboxLabel,
            checkboxChecked,
            platform,
            customStyle,
            inputOptions,
          });
          win.setResizable(false);
          win.show();
        });
      }
    );
  });
}

/**
 * Shows a message box
 * @param options - Message box options
 * @returns Resolves with a promise.
 *
 * @example
 * ```js
 * const { showMessageBox } = require("nwjs-dialog");
 * showMessageBox({
 *   message: "Message",
 *   type: "info",
 *   buttons: ["OK", "Cancel"],
 *   title: "Title",
 *   detail: "Detail",
 *   checkboxLabel: "Checkbox",
 *   checkboxChecked: true,
 *   id: "",
 *   icon: "",
 *   platform: "default",
 *   customStyle: "",
 *   inputOptions: {
 *     radios: [{ label: "Radio", value: true, description: "Description" }],
 *     checkboxes: [{ label: "Checkbox", value: true, description: "Description", required: true }],
 *     inputs: [{ label: "Input", value: "Value", description: "Description", required: true, placeholder: "Placeholder", rule: /^[0-9]$/ }],
 *   },
 *   onLoad(win) {},
 *   onClose(returnValue, win) {},
 *   onValidate(errors, win) {},
 * }).then(({ button, checkboxChecked }) => {
 *   console.log(button);
 *   console.log(checkboxChecked);
 * });
 * ```
 *
 * @public
 */
export function showMessageBox(
  options: MessageBoxOptions
): Promise<MessageBoxReturnValue>;

/**
 * Shows a message box
 * @param win - If `title` option is omitted, it will be the win's title.
 * @param options - Message box options
 * @returns Resolves with a promise.
 *
 * @remarks
 * If the `win` argument is omitted, it will be the current window.
 *
 * @example
 * ```js
 * const { showMessageBox } = require("nwjs-dialog");
 * showMessageBox(nw.Window.get(), {
 *   message: "Message",
 * }).then(({ button }) => {
 *   console.log(button);
 * });
 * ```
 *
 * @public
 */
export function showMessageBox(
  win: NWJS_Helpers.win | Window,
  options: MessageBoxOptions
): Promise<MessageBoxReturnValue>;

export function showMessageBox(
  winOrOptions: NWJS_Helpers.win | Window | MessageBoxOptions,
  maybeOptions?: MessageBoxOptions
): Promise<MessageBoxReturnValue> {
  return messageBox.apply(null, getWinAndOptions(winOrOptions, maybeOptions));
}
