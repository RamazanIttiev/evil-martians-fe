import React, { useCallback, useEffect, useState } from "react";

import { Input } from "../ui-kit/input/input.tsx";
import { Button } from "../ui-kit/button/button.tsx";
import { SnackBar } from "../ui-kit/snack-bar/snack-bar.tsx";

import { validateCredentials } from "./form.utils.ts";
import { submitCredentials } from "../../utils/mockFetch.ts";

import "./form.css";

export interface Credentials {
  email: string;
  password: string;
}

export type CredentialsErrors = Partial<Credentials>;

export const Form = () => {
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const [credentialsErrors, setCredentialsErrors] = useState<
    CredentialsErrors | undefined
  >({
    email: undefined,
    password: undefined,
  });

  const [serverError, setServerError] = useState<string | undefined>();

  useEffect(() => {
    setTimeout(() => setServerError(undefined), 2000);
  }, [serverError]);

  const resetErrors = (field: string, value: string | undefined) => {
    setCredentialsErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    resetErrors(e.target.name, undefined);
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const errors = validateCredentials(credentials);
      const isValid = Object.values(errors).every((error) => !error);

      setCredentialsErrors(errors);

      if (!isValid) return;

      setLoading(true);

      try {
        const response = await submitCredentials(credentials);

        setLoading(false);

        switch (response.status) {
          case "Success":
            break;
          case "InvalidCredentials": {
            const { field } = response;

            if (field) {
              resetErrors(field, response.message);
            }
            break;
          }
        }
      } catch (error) {
        console.log(error);
        setServerError(
          "Some error occurred on the server. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    },
    [credentials],
  );

  return (
    <>
      <form className="form" noValidate>
        <Input
          name="email"
          id="email"
          label="Your email"
          type="email"
          placeholder="ramazan@ittiev.ru"
          autoComplete="username"
          required
          value={credentials.email}
          onChange={handleChange}
          error={credentialsErrors?.email}
        />
        <Input
          name="password"
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={credentials.password}
          onChange={handleChange}
          error={credentialsErrors?.password}
        />
        <Button type="submit" loading={loading} onClick={handleSubmit}>
          Let me in!
        </Button>
      </form>
      {serverError && <SnackBar>{serverError}</SnackBar>}
    </>
  );
};
