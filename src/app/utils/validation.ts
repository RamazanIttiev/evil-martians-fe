import { ResponseErrors } from "../types/form.types.ts";
import { Credentials, CredentialsErrors } from "../types/form.types.ts";

const VALID_EMAIL = "ramazan@martian.com";
const VALID_PASSWORD = "test123456";

const validEmailRegexp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validate = (credentials: Credentials): CredentialsErrors => {
  const errors: CredentialsErrors = {};

  if (!validEmailRegexp.test(credentials.email)) {
    errors.email = "Afraid this is not a valid email";
  } else if (credentials.email !== VALID_EMAIL) {
    errors.email = "There is no account with this email :(";
  }

  if (credentials.password.length < 6) {
    errors.password = "Password must be more than 6 characters long";
  } else if (credentials.password !== VALID_PASSWORD) {
    errors.password = "This password is incorrect";
  }

  return errors;
};

export const mapErrorsToResponse = (
  errors: CredentialsErrors,
): ResponseErrors[] =>
  Object.entries(errors).map(([field, message]) => ({ field, message }));
