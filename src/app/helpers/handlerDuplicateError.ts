import { TGenericErrorResponse } from "../interface/error.typs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
  const matchedArray = err.message?.match(/"([^"]*)"/);
  const duplicateValue = matchedArray?.[1] || "Field";

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
