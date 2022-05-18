<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [nwjs-dialog](./nwjs-dialog.md) &gt; [showOpenDialog](./nwjs-dialog.showopendialog.md)

## showOpenDialog() function

Shows an open dialog

<b>Signature:</b>

```typescript
export declare function showOpenDialog(): Promise<String[]>;
```
<b>Returns:</b>

Promise&lt;String\[\]&gt;

An array of file paths chosen by the user

## Remarks

This method creates a temporary `<input>` and triggers `click` event to shows an open dialog.

## Example


```js
const { showOpenDialog } = require("nwjs-dialog");
showOpenDialog().then(([filePath]) => {
  console.log(filePath);
});
```
