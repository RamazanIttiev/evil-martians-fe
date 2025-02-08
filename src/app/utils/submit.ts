import {
  mapErrorsToResponse,
  randomIntFromInterval,
  validate,
} from "./validation.ts";

import { Response } from "../types/form.types.ts";

export const submitCredentials = async (credentials: {
  email: string;
  password: string;
}): Promise<Response> => {
  const validationErrors = validate(credentials);

  const credentialsAreValid =
    !validationErrors.email && !validationErrors.password;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomIntFromInterval() < 3) {
        reject(new Error("This is a random ServerError for test purposes"));
        return;
      }

      if (credentialsAreValid) {
        resolve({ status: "Success" });
        return;
      }

      resolve({
        status: "InvalidCredentials",
        errors: mapErrorsToResponse(validationErrors),
      });
    }, 2000);
  });
};
