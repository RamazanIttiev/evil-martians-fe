import { Credentials, CredentialsErrors } from "./form.tsx";

export const validEmailRegexp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateCredentials = (
  credentials: Credentials,
): CredentialsErrors => {
  const errors: CredentialsErrors = {};

  if (!credentials.email) {
    errors.email = "Email is required to login";
  } else if (!validEmailRegexp.test(credentials.email)) {
    errors.email = "Are you sure this email is correct?";
  }

  if (!credentials.password) {
    errors.password = "Password is required to login";
  } else if (credentials.password.length < 6) {
    errors.password = "Ops! Password must be more than 6 characters long";
  }

  return errors;
};
