import { validateCredentials } from "../components/form/form.utils.ts";

type MockResponse = {
  status: "Success" | "InvalidCredentials" | "ServerError";
  field?: string;
  message?: string;
};

export const submitCredentials = async (credentials: {
  email: string;
  password: string;
}): Promise<MockResponse> => {
  const validationErrors = validateCredentials(credentials);

  const credentialsAreValid =
    validationErrors.email === undefined &&
    validationErrors.password === undefined;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error("ServerError"));
      }

      if (credentialsAreValid) {
        resolve({ status: "Success" });
      } else if (validationErrors.email) {
        resolve({
          status: "InvalidCredentials",
          field: "email",
          message: validationErrors.email,
        });
      } else {
        resolve({
          status: "InvalidCredentials",
          field: "password",
          message: validationErrors.password,
        });
      }
    }, 2000);
  });
};
