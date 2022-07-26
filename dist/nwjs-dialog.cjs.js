'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var darwin_html = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\r\n    <title>MessageBox</title>\r\n    <style>\r\n      html,\r\n      body {\r\n        margin: 0;\r\n        overflow: hidden;\r\n      }\r\n      body {\r\n        display: flex;\r\n      }\r\n      img {\r\n        display: inline-block;\r\n      }\r\n      .hide {\r\n        display: none !important;\r\n      }\r\n      .disabled {\r\n        opacity: 0.5;\r\n        pointer-events: none;\r\n      }\r\n      .message-box {\r\n        min-width: 260px;\r\n        max-width: 560px;\r\n        padding: 15px;\r\n        text-align: center;\r\n        -webkit-app-region: drag;\r\n        background-color: rgba(255, 255, 255, 0.95);\r\n        border-radius: 8px;\r\n      }\r\n      .header {\r\n        user-select: none;\r\n        padding: 10px 0;\r\n      }\r\n      .system-icon,\r\n      .header-icon {\r\n        width: 60px;\r\n        height: 60px;\r\n      }\r\n      .system-icon {\r\n        display: none;\r\n      }\r\n      .icon-box {\r\n        display: inline-block;\r\n        position: relative;\r\n      }\r\n      .warning .system-icon,\r\n      .type-error .system-icon {\r\n        display: inline-block;\r\n      }\r\n      .warning .header-icon,\r\n      .type-error .header-icon {\r\n        width: 30px;\r\n        height: 30px;\r\n        position: absolute;\r\n        bottom: 0;\r\n        right: 0;\r\n      }\r\n      .title,\r\n      .close-button,\r\n      .body-icon {\r\n        display: none;\r\n      }\r\n      .message {\r\n        font-weight: bold;\r\n      }\r\n      .detail {\r\n        font-size: 80%;\r\n        overflow: hidden;\r\n      }\r\n      .message,\r\n      .detail,\r\n      .input-options,\r\n      .buttons,\r\n      .footer .checkbox {\r\n        margin-top: 10px;\r\n        -webkit-app-region: no-drag;\r\n      }\r\n      .buttons {\r\n        flex: auto;\r\n        white-space: nowrap;\r\n      }\r\n      .button {\r\n        display: block;\r\n        width: 100%;\r\n        padding: 10px;\r\n        border-radius: 4px;\r\n        border: none;\r\n        background-color: #ccc;\r\n      }\r\n      .button:hover {\r\n        background-color: #ddd;\r\n      }\r\n      .button + .button {\r\n        margin-top: 4px;\r\n      }\r\n      .input-group {\r\n        display: table;\r\n        margin: 0 auto;\r\n      }\r\n      .radio + .radio,\r\n      .checkbox + .checkbox,\r\n      .input-group + .input-group,\r\n      .table-row + .table-row {\r\n        margin-top: 8px;\r\n      }\r\n      .input-box {\r\n        display: flex;\r\n        flex-flow: column;\r\n      }\r\n      .radio,\r\n      .checkbox {\r\n        display: flex;\r\n      }\r\n      .footer .checkbox {\r\n        justify-content: center;\r\n      }\r\n      .checkbox-label,\r\n      .radio-label,\r\n      .input-label,\r\n      .description {\r\n        font-size: 80%;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n        user-select: none;\r\n        text-align: left;\r\n      }\r\n      .input-label {\r\n        text-align: left;\r\n        margin-bottom: 4px;\r\n      }\r\n      .checkbox-label.required::before,\r\n      .input-label.required::before {\r\n        content: \"*\";\r\n        margin-right: 4px;\r\n        color: #f56c6c;\r\n      }\r\n      .description {\r\n        color: #909399;\r\n        margin: 4px 0;\r\n      }\r\n      .input-input {\r\n        outline: none;\r\n        border-radius: 4px;\r\n        border: 1px solid #dcdfe6;\r\n        padding: 4px 8px;\r\n        transition: border 0.3s, background-color 0.3s;\r\n      }\r\n      .input-input:focus {\r\n        border-color: #409eff;\r\n      }\r\n      .error .input-input {\r\n        border-color: #f56c6c;\r\n        background-color: #fde2e2;\r\n      }\r\n      .error .checkbox-label {\r\n        color: #f56c6c;\r\n      }\r\n    </style>\r\n    <style id=\"custom-style\"></style>\r\n  </head>\r\n  <body>\r\n    <div class=\"message-box\">\r\n      <div class=\"header\">\r\n        <div class=\"icon-box\">\r\n          <img src=\"data:image/png;base64,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\" class=\"system-icon\">\r\n          <img src=\"\" class=\"header-icon\">\r\n        </div>\r\n        <span class=\"title\">Title</span>\r\n        <div class=\"close-button\">\r\n          <img src=\"\" class=\"close-icon\">\r\n        </div>\r\n      </div>\r\n      <div class=\"body\">\r\n        <div class=\"content\">\r\n          <img src=\"\" class=\"body-icon\">\r\n          <span class=\"message\">Message</span>\r\n        </div>\r\n        <div class=\"input-options\"></div>\r\n        <div>\r\n          <span class=\"detail\">Detail</span>\r\n        </div>\r\n      </div>\r\n      <div class=\"footer\">\r\n        <div class=\"buttons\">\r\n          <button class=\"button\">OK</button>\r\n        </div>\r\n        <div class=\"checkbox\">\r\n          <input type=\"checkbox\" id=\"checkbox\" class=\"checkbox-input\">\r\n          <label for=\"checkbox\" class=\"checkbox-label\">Checkbox</label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- <script src=\"../../eval.js\"></script> -->\r\n  </body>\r\n</html>\r\n";

var img$6 = "data:image/png;base64,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";

var win32_html = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\r\n    <title>MessageBox</title>\r\n    <style>\r\n      html,\r\n      body {\r\n        margin: 0;\r\n        overflow: hidden;\r\n      }\r\n      body {\r\n        display: flex;\r\n      }\r\n      img {\r\n        display: inline-block;\r\n      }\r\n      .hide {\r\n        display: none !important;\r\n      }\r\n      .disabled {\r\n        opacity: 0.5;\r\n        pointer-events: none;\r\n      }\r\n      .message-box {\r\n        min-width: 362px;\r\n        max-width: 560px;\r\n        border: 1px solid #707070;\r\n      }\r\n      .header {\r\n        -webkit-app-region: drag;\r\n        position: relative;\r\n        user-select: none;\r\n        display: flex;\r\n        padding: 4px;\r\n      }\r\n      .header-icon {\r\n        width: 16px;\r\n        height: 16px;\r\n      }\r\n      .title {\r\n        margin-left: 4px;\r\n        font-size: 12px;\r\n      }\r\n      .close-button {\r\n        -webkit-app-region: no-drag;\r\n        display: flex;\r\n        position: absolute;\r\n        top: 0;\r\n        right: 0;\r\n        padding: 4px 8px;\r\n        transition: background-color 0.3s;\r\n      }\r\n      .close-button:hover {\r\n        background-color: #e81123;\r\n      }\r\n      .close-icon {\r\n        width: 16px;\r\n        height: 16px;\r\n        transition: filter 0.3s;\r\n      }\r\n      .close-button:hover .close-icon {\r\n        filter: invert(100%);\r\n      }\r\n      .title,\r\n      .message,\r\n      .checkbox-label,\r\n      .radio-label,\r\n      .input-label {\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n      }\r\n      .body {\r\n        padding: 12px;\r\n      }\r\n      .content {\r\n        display: flex;\r\n      }\r\n      .body-icon {\r\n        width: 32px;\r\n        height: 32px;\r\n        margin-right: 10px;\r\n      }\r\n      .message {\r\n        color: #003399;\r\n      }\r\n      .detail {\r\n        font-size: 80%;\r\n        overflow: hidden;\r\n      }\r\n      .has-icon .detail {\r\n        padding-left: 42px;\r\n      }\r\n      .footer {\r\n        height: 42px;\r\n        padding: 0 10px;\r\n        background: #f0f0f0;\r\n        border-top: 1px #dfdfdf solid;\r\n        display: flex;\r\n        flex-flow: row;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        user-select: none;\r\n      }\r\n      .input-options {\r\n        margin: 8px 0;\r\n        display: flex;\r\n        flex-flow: column;\r\n        align-items: center;\r\n      }\r\n      .radio + .radio,\r\n      .checkbox + .checkbox,\r\n      .input-group + .input-group {\r\n        margin-top: 8px;\r\n      }\r\n      .checkbox,\r\n      .radio {\r\n        display: flex;\r\n        overflow: hidden;\r\n      }\r\n      .checkbox-label,\r\n      .radio-label,\r\n      .input-label {\r\n        font-size: 80%;\r\n        margin-right: 8px;\r\n      }\r\n      .input-label {\r\n        text-align: right;\r\n      }\r\n      .checkbox-label.required::before,\r\n      .input-label.required::before {\r\n        content: \"*\";\r\n        margin-right: 4px;\r\n        color: #f56c6c;\r\n      }\r\n      .description {\r\n        font-size: 80%;\r\n        color: #909399;\r\n        margin: 4px 0;\r\n        white-space: nowrap;\r\n      }\r\n      .input-input {\r\n        outline: none;\r\n        border: 1px solid #dcdfe6;\r\n        padding: 4px 8px;\r\n        transition: border 0.3s, background-color 0.3s;\r\n      }\r\n      .input-input:focus {\r\n        border-color: #0078d7;\r\n      }\r\n      .error .input-input {\r\n        border-color: #f56c6c;\r\n        background-color: #fde2e2;\r\n      }\r\n      .error .checkbox-label {\r\n        color: #f56c6c;\r\n      }\r\n      .table {\r\n        display: table;\r\n      }\r\n      .table-row {\r\n        display: table-row;\r\n      }\r\n      .table-cell {\r\n        display: table-cell;\r\n        padding: 2px;\r\n      }\r\n      .input-box {\r\n        display: flex;\r\n        flex-flow: column;\r\n      }\r\n      .buttons {\r\n        flex: auto;\r\n        text-align: right;\r\n        white-space: nowrap;\r\n      }\r\n      .button {\r\n        outline: none;\r\n        padding: 2px 12px;\r\n        min-width: 50px;\r\n        background-color: #e1e1e1;\r\n        border: 1px solid #adadad;\r\n        transition: border-color 0.3s, background-color 0.3s;\r\n      }\r\n      .button:hover {\r\n        background-color: #e5f1fb;\r\n        border-color: #0078d7;\r\n      }\r\n      .button + .button {\r\n        margin-left: 8px;\r\n      }\r\n    </style>\r\n    <style id=\"custom-style\"></style>\r\n  </head>\r\n  <body>\r\n    <div class=\"message-box\">\r\n      <div class=\"header\">\r\n        <img src=\"\" class=\"header-icon\">\r\n        <span class=\"title\">Title</span>\r\n        <div class=\"close-button\">\r\n          <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAABGklEQVR4nO2aOw6DMBBERzlROFKocgPKUObS+TSMFBGIQoK9tmeeREG189b8bAMYY4wxxhhjNnKMDvBC9iwjgDuAc+7CC5wA3ABccxUcATymI7oJlGee5E3oZgUf03mfuvAC/UqWLnXhedcjroTwDJEBwuUjgxQjHxGoOHmSI1ix8iRlwOLlSYqg1ciTPQNXJ0/2CF6tPPlHoHp58otIM/Jki1Bz8uQbsWblySfB5uXJ2vS1lOl1FpZGu/mRn7PWhBD5Q+6C6kjfAtIPQenXoPSHkPSnsPRkSHo6LL0gIr0kJr0oKr0sLr0xIr01Jr05Kr09Hh4gMoN/kQEwoJCHEN6vhEuuwgPi5QmbkE2eSP8oaYwxxhhjTOU8AVKPndYdyCEBAAAAAElFTkSuQmCC\" class=\"close-icon\">\r\n        </div>\r\n      </div>\r\n      <div class=\"body\">\r\n        <div class=\"content\">\r\n          <img src=\"\" class=\"body-icon\">\r\n          <span class=\"message\">Message</span>\r\n        </div>\r\n        <div class=\"input-options\"></div>\r\n        <div class=\"detail\">Detail</div>\r\n      </div>\r\n      <div class=\"footer\">\r\n        <div class=\"checkbox\">\r\n          <input type=\"checkbox\" id=\"checkbox\" class=\"checkbox-input\">\r\n          <label for=\"checkbox\" class=\"checkbox-label\">Checkbox</label>\r\n        </div>\r\n        <div class=\"buttons\">\r\n          <button class=\"button\">OK</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- <script src=\"../../eval.js\"></script> -->\r\n  </body>\r\n</html>\r\n";

var img$5 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAtFBMVEUAAACAfX3zOhbxOBX1OxeAdnWAbmyDa2nqNBKbMiOMUEnBKxK8KRGzKxasLBmnMSCkLx6ZMyWcOSuVQTWSQDWOT0aLUkuHX1qvJhGvJhGlLBulLBqMUUmGX1qGX1rwORbvOBX++/v////wOxn+/f3uKQP1hnH1hXDEJQv0ORXvOBTuKwXvNBDfLg7XKgzvMAvOJwvuKgT2ORT1h3L1g231gGnyXUHELBLmMA73m4r3m4nqNRNdRRwxAAAAH3RSTlMAA/v9+wcpHf6vWPzy49zKyKiklIhvTzbu7NTPXjw6rOT7ZwAAAqpJREFUWMOtlwl3ojAQx2sC9b6v3gaKGhCF4tn2+3+vHZK4cceD7s6OPt+Tmd8/kwmEyd0tKxm7+xf7g/trERPvlu/Byq659nM8Z8fDXrvZqO/39Uaz3RuOXeX4Kf7ab8nVIQ7DMMvgJz6sZKv/qp3FvPvSkcsodBifCGUTzpwwWsrOi1uoAP7Rc1phjAsDGxHBGaukzyMIuc2Xq/Lb4TkJrDUlxJ1vWS3fVqg9LgFXADKVDHeWj7Vb/EAKJoQKPjflYEIOrk+gmzKOcSzBWdotXeGrKwfPHVsu76yqpYv161q+SKEL4Wf8ILV8kUI6AADxNckUD9/rRdR+KKWsYYXyg+BHPrm0jNaRV1I8lFEC1SWLtDeKd8nZVBSW7OJjDFtWATrhR9IROvFo+ultpu8Tgfn36cb7nEZ6MsKRo1MF96nCNSHiL9/z5wtQQPxiDo6v2ITxypN7WsHUiTSR7HzP8/zZh1aw/MdMOXaJ/h856UkdSx1IwMQnm0Ap6Bzs+IoPNom5Ail0DA86b/kSCuOaztVQc1sH4H9fPF7Kl/INUC3QhyVAgxkFy+O0YCH6xzm4rQgU8XSNguFxYQCIWq5JYCxDgQpuASuIlkaEcgxwLjBUT5ExO2TgzyAH+DPzA5uQMfVMDY1A78CsBytg3kaxQ88UoR1zcCEFwEBhvVis/cAkg4J43DY1bIbC+mwlFbjdat7Wz84hbLp6I27YGqIcAh8sQOPbKjZgi4bPfT0TFxXWwCp+fZEXWf1eC+wz7DWrufUCMG9r1g9HZHu6wH+YArmI1GUk30jUW5n+MJEfZ+qGQt7SyJsqdVunv1jorzb6y5X+eqc3GPQWh95k0ds8eqNJb3XpzTZu90VBu1944JgUHjjoRx76oYt+7KMfPOlHX/rhu1iliP0FTrZQApb0t4UAAAAASUVORK5CYII=";

var img$4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAArlBMVEUAAAB7fYABetwAd9gAedoAcdAAWadxeH4PVpAYU4VBY39nc31mc34BetwAWKIBUpYHVZUUU4YdWIkpW4QpWYE9YoFBY39Ua34EV5oAbcsKUo4MU44QVI1CZH9Ua35Ua35pdHxpdHsEV5sAd9cAdtYAddYMfdn////q8/sAedwAW6oActUAacUAZL0AY7sAX7T0+Pzw9vzF4PW01vIuj94AbcwAXrEAXbHY6vjG4PXIa2dHAAAAI3RSTlMABPv9+/7+CMqqVSQc/fLt3LCklIhvXDbj/tTPxkw8Oiws43nMr/cAAAJPSURBVFjDvVeHcqMwEAVJlBjca3pBgkjgOOXS/v/HThAuOznJYHlnsvaMPYj3eNoVW7xO8xvzjrIfQGeW9v4oTW5ukjSCawfCa+x6OYvvRqFS4eguni3XUb1wMPxqPlHb1zKTjWXl61ZN5leHUvirC1UJSRjNeGMZZUSKSl2s/EMePzh/C4aMfkF5pr/NX8qGwdv5oFdEMlUBoS0WrGGhJFDTpBs/GFcaDmgwfbGmqMaDLvwiFEzoO1u8SaGXw8V+B5zsCAW4nYKS3Ym/D/9ABKi3Wi2CPOxhMPG8/TEZrPvfmc/npTZuatgtLP4PmYEX+cvz80suDAYWGrFIx4Ia+y/zx6J4zEvDD1SM0/8IphUT33hQcF8U97kwPClYNf15gC8VERA+UPBUFE+gAMIpiLrUMGA4Cyi3Be2Ptsy2QoMzH+De6p3ABrqiAJsg7yuQ4MdagPW+2qzMWkIMEq7VULgSiKG6/t7BvA6BxUT++fHxmdvXWDX/t4doIjgI6I4CSOBiErUS1krCQ/rOASxKtW53sNwSzl0JOCfbpec3BLNTdowCdjprnRCXlLsTcFrGrQ83GXcnqDGbr2qTjrQPHQjAi6O0IUhCeZwCGSaerz+3SvJjFHCpbj0PS4DfAtKJ+DCiDxL6KKNfJvzrDAnFiQASCqQ0NwJIaZBUHQggqUJadyWAtA6FpYfAXligtLkpgNJmFtd+Aiiu+PKObzDwLQ6+ycK3efhGE9/q4ptts93n7u0+fuDAjzz4oQs/9tkHzw0MnrjR9zeHb0D2Qv8CzSRnH1wdyuoAAAAASUVORK5CYII=";

var img$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGKmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNS0xNlQwMzo1OTo0NiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDUtMTZUMDQ6MDE6MjErMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDUtMTZUMDQ6MDE6MjErMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhhYmRmNWJhLTAxYmQtYjg0My1iNDNhLTEwNGY0YjQ0ZGE3OCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmRjMmIxMWM0LTJiMDMtMGY0Ny1iMGZhLTM4N2FiYmNjMjExOSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmRmN2I1MDA5LWYzZWMtODU0MC05OTVmLWQ4MzE5YjM1MjI2YyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGY3YjUwMDktZjNlYy04NTQwLTk5NWYtZDgzMTliMzUyMjZjIiBzdEV2dDp3aGVuPSIyMDIyLTA1LTE2VDAzOjU5OjQ2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjhhYmRmNWJhLTAxYmQtYjg0My1iNDNhLTEwNGY0YjQ0ZGE3OCIgc3RFdnQ6d2hlbj0iMjAyMi0wNS0xNlQwNDowMToyMSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4XK1VeAAAAu0lEQVRIDWP4//8/Ay0xw6gFRFnQ2tnznxaYahYcOnIMK41iwa9fv6iCf/78CcYELajY3kS24T9+/MBtgUq/yX+lfqP/Cv2G/1dcWgcWmzlzJlEYZjheC2A4e3s5WS4H4e/fv1MvDrAZTpQFxMQBLsO/fftGmziAGY7XAmLiAJ/LQfjr16/kxwExhhNlAbY4INbwL1++0CYOYIbjtQBbHJDicqItoMTwz58/E2cBuYZjtYCm9cFonYwPAwBlQVsi3gfPIAAAAABJRU5ErkJggg==";

var img$2 = "data:image/png;base64,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";

var img$1 = "data:image/png;base64,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";

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAgVBMVEUAAAD74QCBgH354gD9wQDXoyeaiWX64gDXpCaYiGb+wgD64gGvlE/+wQDbpyKYiGb6vQP/uQD7tgP84QD84AD/tQD82wD/5ADv1QD/1wAAAAAUEgD53gD/7AD63wD+1gAKCQD/5wD/2ADy2ABGPgAyLQAFBADErwC/qwBWTQAgHABJkfl9AAAAE3RSTlMA/gL69ZYh/Jgf9/xA+aMe7+7S5JD/7QAAAf1JREFUWMOl1utSwkAMBeBtQEq5qq0CBQG5w/s/oGG5nJke6V6aP3UcmvlIsmFNbYgMBiImPsSMRiYiAQDZcJiJNAC8bTZvDQjSaSdJuyPxgO6s1Zp1YwliroArwUg8oChAiAKAENMCBeS5EtCIcEBRgBBTgVwDVQgE9K4AfV8fPRBCASDEAkAIbkGqr98JaWgjxGTtG+BBaGdGIgEgBM8AvgJmIWgIEYHjKLoH0hsAhFT3gvgDVvYU5IUN/UMJKxA8AP0HAIQ+CH4VsIKFhj7CqvCsQDGZ7i+X/XRSPKsQ1oLlZLouy/V0sgxrRKeXJlo5K5iX5dwKtJ5J2usEACoJAgiZrQAnsFXIfAEk8CeMLYASPAhjfwALQHBWgBOgCj4AFngTstsp4AQ4EZk3gBOA4N6EnMC9HQHgBH4EAChBheAH4AQguFYxJ3AtaGxCh+D1dhQBgBNUCSIOACUgAgPQgtcJ0AgRRwsogasRVIHKUuUq/HshqQq2u/1+t60IcGWhGaAP5r8aOf5Ns1ADqPwy1REA4Aw/GvqoJaAF/P7ieDodF8jAjWCAuwtMQAV4Dg4HmgOqAu6ELDiU5YEFuDtWADwH593ujDlgAgHcXWAC7oQ+c0B3R6zioMCCBiAsQLDHsIiK+6HsblpJHhVJa9M1ZvD+3SB0HD++GsXnH+sjkWzmMee9AAAAAElFTkSuQmCC";

var _a, _b, _c;
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
const platformsPreset = {
  darwin: {
    dirPath: "",
    htmlTemplate: darwin_html,
    htmlPath: "",
    icons: {
      none: img$6,
    },
    iconsURL: {},
  },
  win32: {
    dirPath: "",
    htmlTemplate: win32_html,
    htmlPath: "",
    icons: {
      error: img$5,
      info: img$4,
      none: img$3,
      question: img$2,
      success: img$1,
      warning: img,
    },
    iconsURL: {},
  },
};/**
 * To make sure the document is available
 * @param document
 * @returns
 */
function domReady(document) {
    return new Promise((resolve) => {
        if (document.readyState === "complete" ||
            document.readyState === "interactive") {
            resolve();
        }
        else {
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
function getWinAndOptions(winOrOptions, maybeOptions) {
    const win = winOrOptions &&
        "window" in winOrOptions &&
        winOrOptions.window === winOrOptions.window.window
        ? winOrOptions
        : nw.Window.get();
    const options = (win === winOrOptions ? maybeOptions : winOrOptions) || {};
    return [win, options];
}
function showFileDialog(win, options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield domReady(win.window.document);
        if ("nwdirectory" in options && !options.nwdirectory)
            delete options.nwdirectory;
        if ("multiple" in options && !options.multiple)
            delete options.multiple;
        const input = win.window.document.createElement("input");
        Object.entries(Object.assign({ type: "file" }, options)).forEach(([key, value]) => {
            if (value !== undefined)
                input.setAttribute(key, String(value));
        });
        input.click();
        return new Promise((resolve) => {
            input.addEventListener("change", () => resolve(input.value.split(";")));
        });
    });
}
function showOpenDialog(winOrOptions, maybeOptions) {
    const [win, options] = getWinAndOptions(winOrOptions, maybeOptions);
    if ("nwsaveas" in options)
        delete options.nwsaveas;
    return showFileDialog.apply(null, [win, options]);
}
function showSaveDialog(winOrOptions, maybeOptions) {
    const [win, options] = getWinAndOptions(winOrOptions, maybeOptions);
    return showFileDialog(win, Object.assign({ nwsaveas: "" }, options));
}
// @ts-ignore: import by replace plugin
let platforms = platformsPreset;
// @ts-ignore: import by replace plugin
const version = "1.0.5";
// @ts-ignore: import by replace plugin
const evalTemplate = `function $(selector) {
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
            return \`<div class="\${type} \${disabled ? "disabled" : ""}">
  <input type="\${type}" name="\${type}" value="\${type}_\${index}" id="\${type}_\${index}"
    \${value ? "checked" : ""} data-index="\${index}" class="\${type}-input" />
  <label for="\${type}_\${index}">
    <div class="\${type}-label \${required ? "required" : ""}"
    >\${label || ""}</div>
    <div class="description \${description ? "" : "hide"}"
    >\${description || ""}</div>
  </label>
</div>\`;
          case "input":
            return \`<div class="table-row \${disabled ? "disabled" : ""}">
  <div class="table-cell input-label \${required ? "required" : ""} \${hideLabel}"
  >\${label || ""}</div>
  <div class="table-cell input-box">
    <input class="input-input" type="\${password ? "password" : "text"}"
      value="\${value || ""}" placeholder="\${placeholder || ""}" />
    <div class="description \${description ? "" : "hide"}"
    >\${description || ""}</div>
  </div>
</div>\`;
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
  $("body").classList.add(platform, \`type-\${type}\`);
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
              \`\${key}_\${index}\`,
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
              setError(\`\${key}_\${index}\`, { key, index, error: "required" });
            } else if (
              rule &&
              !(typeof rule === "function"
                ? rule(input.value)
                : rule.test(input.value))
            ) {
              isError = true;
              setError(\`\${key}_\${index}\`, { key, index, error: "rule" });
            } else {
              setError(\`\${key}_\${index}\`, false);
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
};`;
// Cache directory for temporary files
let cachePath = process.cwd();
// If there is no matching window icon, show the app's icon
let appIcon = ((_a = nw.App.manifest) === null || _a === void 0 ? void 0 : _a.icon) || ((_c = (_b = nw.App.manifest) === null || _b === void 0 ? void 0 : _b.window) === null || _c === void 0 ? void 0 : _c.icon) || "";
let defaultButtons = [navigator.language === "zh-CN" ? "确定" : "OK"];
let messageBoxTypes = [
    "none",
    "info",
    "warning",
    "error",
    "question",
    "success",
];
function checkPlatformInitialized(platform) {
    const preset = platforms[platform];
    if (preset.htmlPath)
        return;
    const dir = path.resolve(cachePath, "MessageBox", platform);
    const verFile = path.join(dir, version);
    const htmlPath = path.join(dir, "MessageBox.html");
    if (!fs.existsSync(verFile)) {
        // @ts-ignore: force remove cache directory
        if (fs.existsSync(dir))
            fs.rmdirSync(dir, { recursive: true, force: true });
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
const instances = {};
function messageBox(win, options) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const document = (_a = win.window) === null || _a === void 0 ? void 0 : _a.document;
        if (document)
            yield domReady(document);
        let { title = (document === null || document === void 0 ? void 0 : document.title) ||
            ("title" in win && win.title) ||
            nw.App.manifest.name, type = "none", icon = "", buttons = [], message = "", detail = "", checkboxLabel = "", checkboxChecked, id = "", platform = "default", customStyle = "", inputOptions, onLoad, onClose, onValidate, } = options;
        // Singleton
        if (id) {
            const instance = instances[id];
            if (instance) {
                if (typeof instance !== "boolean")
                    instance.focus();
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
                    if (item.rule &&
                        Object.prototype.toString.call(item.rule) !== "[object RegExp]" &&
                        typeof item.rule !== "function")
                        throw new TypeError("`inputOptions.inputs.rule` must be a RegExp or funciton");
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
            throw new Error("checkboxChecked requires that checkboxLabel also be passed");
        }
        if (platform === "default")
            platform = process.platform;
        if (!platforms[platform])
            platform = "win32";
        checkPlatformInitialized(platform);
        const preset = platforms[platform];
        let winIcon;
        if (icon) {
            winIcon = icon;
            icon = path.relative(preset.htmlPath, winIcon).replace(/\\/g, "/");
        }
        else {
            icon = preset.iconsURL[type] || preset.iconsURL.none;
            winIcon = path.join(path.relative(process.cwd(), preset.dirPath), icon);
            if (platform === "darwin" && !preset.iconsURL[type] && appIcon) {
                icon = path.relative(preset.htmlPath, appIcon).replace(/\\/g, "/");
                winIcon = appIcon;
            }
        }
        if (buttons.length === 0)
            buttons = defaultButtons;
        nw.Window.open(preset.htmlPath, Object.assign({ id, frame: false, show: false, position: "center", icon: winIcon }, {
            transparent: platform === "darwin",
        }), (win) => {
            if (!win)
                return;
            if (id) {
                instances[id] = win;
                win.on("closed", () => delete instances[id]);
            }
            win.on("loaded", () => {
                // onLoad handler
                onLoad && onLoad(win);
                // Resolver
                win.window.__messageBoxCallback__ = (response) => __awaiter(this, void 0, void 0, function* () {
                    // onClose handler
                    if (onClose && (yield onClose(response, win)) === false)
                        return false;
                    resolve(response);
                });
                // onValidate handler
                win.window.__onValidate__ = (errors) => {
                    onValidate && onValidate(errors, win);
                };
                // @ts-ignore: frame can be null
                win.eval(null, evalTemplate);
                // Init message box data
                win.window.__setOptions__({
                    title,
                    type,
                    icon,
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
        });
    }));
}
function showMessageBox(winOrOptions, maybeOptions) {
    return messageBox.apply(null, getWinAndOptions(winOrOptions, maybeOptions));
}

exports.showMessageBox = showMessageBox;
exports.showOpenDialog = showOpenDialog;
exports.showSaveDialog = showSaveDialog;
