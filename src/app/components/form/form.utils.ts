import { Credentials, CredentialsErrors } from "../../types/form.types.ts";

export const validateInput = (credentials: Credentials): CredentialsErrors => {
  const errors: CredentialsErrors = {};

  if (!credentials.email) {
    errors.email = "Email is required to login";
  }

  if (!credentials.password) {
    errors.password = "Password is required to login";
  }

  return errors;
};
