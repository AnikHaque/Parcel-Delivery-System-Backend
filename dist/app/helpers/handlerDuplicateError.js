"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDuplicateError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const handlerDuplicateError = (err) => {
    var _a;
    const matchedArray = (_a = err.message) === null || _a === void 0 ? void 0 : _a.match(/"([^"]*)"/);
    const duplicateValue = (matchedArray === null || matchedArray === void 0 ? void 0 : matchedArray[1]) || "Field";
    return {
        statusCode: 400,
        message: `${duplicateValue} already exists!!`,
        errorSources: [
            {
                path: "",
                message: `${duplicateValue} already exists!!`,
            },
        ],
    };
};
exports.handlerDuplicateError = handlerDuplicateError;
