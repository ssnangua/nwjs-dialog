/// <reference types="nw.js" />

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
export declare type DialogReturnFormat = "string" | "file";

/**
 * Alias of `string`, used to identify the base64 data of the image.
 * @public
 */
export declare type ImageBase64 = string;

/**
 * Data of the `inputOptions`
 * @param radios - The index of the checked radio of the `inputOptions.radios`
 * @param checkboxes - The checked states of the `inputOptions.checkboxes`
 * @param inputs - The values of the `inputOptions.inputs`
 * @public
 */
export declare interface MessageBoxInputData {
    radios?: number;
    checkboxes?: boolean[];
    inputs?: string[];
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
export declare interface MessageBoxInputOption {
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
export declare interface MessageBoxInputOptions {
    radios?: MessageBoxInputOption[];
    checkboxes?: MessageBoxInputOption[];
    inputs?: MessageBoxInputOption[];
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
export declare interface MessageBoxOptions {
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
    onClose?: (response: MessageBoxReturnValue, win: NWJS_Helpers.win) => boolean | void;
    onValidate?: (errors: ValidateError[], win: NWJS_Helpers.win) => void;
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
export declare interface MessageBoxReturnValue {
    button?: number;
    checkboxChecked?: boolean;
    inputData?: MessageBoxInputData;
}

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
export declare interface OpenDialogOptions {
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
export declare interface Platform {
    dirPath: string;
    htmlTemplate: string;
    htmlPath: string;
    icons: {
        [type: string]: ImageBase64;
    };
    iconsURL: {
        [type: string]: URLString;
    };
}

/**
 * Platforms preset map
 *
 * @remarks
 * Currently platforms have `win32` and `darwin`.
 *
 * @public
 */
export declare interface Platforms {
    [platformName: string]: Platform;
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
export declare interface SaveDialogOptions {
    nwworkingdir?: string;
    nwsaveas?: string;
    accept?: string;
    returnFormat?: DialogReturnFormat;
    defaultPath?: string;
    filename?: string;
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
export declare function showMessageBox(options: MessageBoxOptions): Promise<MessageBoxReturnValue>;

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
export declare function showMessageBox(win: NWJS_Helpers.win | Window, options: MessageBoxOptions): Promise<MessageBoxReturnValue>;

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
export declare function showOpenDialog(): Promise<String[]>;

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
export declare function showOpenDialog(options: OpenDialogOptions): Promise<String[] | File[]>;

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
export declare function showOpenDialog(win: NWJS_Helpers.win | Window): Promise<String[]>;

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
export declare function showOpenDialog(win: NWJS_Helpers.win | Window, options: OpenDialogOptions): Promise<String[] | File[]>;

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
export declare function showSaveDialog(): Promise<String[]>;

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
export declare function showSaveDialog(options: SaveDialogOptions): Promise<String[] | File[]>;

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
export declare function showSaveDialog(win: NWJS_Helpers.win | Window): Promise<String[]>;

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
export declare function showSaveDialog(win: NWJS_Helpers.win | Window, options: SaveDialogOptions): Promise<String[] | File[]>;

/**
 * Alias of `string`, used to identify the url.
 * @public
 */
export declare type URLString = string;

/**
 * Validate error info
 * @param key - Error option key
 * @param index - Error item index
 * @param error - Error message
 * @public
 */
export declare interface ValidateError {
    key: string;
    index: number;
    error: string;
}

export { }
