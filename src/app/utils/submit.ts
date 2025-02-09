import { mapErrorsToResponse, validate } from "./validation.ts";

import { Response } from "../types/form.types.ts";

const SERVER_ERROR_EMAIL = "error@martian.com";

export const submitCredentials = async (credentials: {
  email: string;
  password: string;
}): Promise<Response> => {
  const validationErrors = validate(credentials);

  const credentialsAreValid =
    !validationErrors.email && !validationErrors.password;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === SERVER_ERROR_EMAIL) {
        reject(new Error("Server error. Please, refresh the page"));
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
