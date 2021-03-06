<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [nwjs-dialog](./nwjs-dialog.md) &gt; [showOpenDialog](./nwjs-dialog.showopendialog_2.md)

## showOpenDialog() function

Shows an open dialog

<b>Signature:</b>

```typescript
export declare function showOpenDialog(win: NWJS_Helpers.win | Window): Promise<String[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  win | NWJS\_Helpers.win \| Window | The <code>win</code> argument allows the dialog to attach itself to a parent window, making it modal. |

<b>Returns:</b>

Promise&lt;String\[\]&gt;

An array of file paths chosen by the user

## Remarks

This method creates a temporary `<input>` and triggers `click` event to shows an open dialog.

## Example


```js
const { showOpenDialog } = require("nwjs-dialog");
nw.Window.open("newWin.html", (win) => {
  showOpenDialog(win).then(([filePath]) => {
    console.log(filePath);
  });
});
```

