import React, {
  FormHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Input } from "../ui-kit/input/input.tsx";
import { Button } from "../ui-kit/button/button.tsx";
import { SnackBar } from "../ui-kit/snack-bar/snack-bar.tsx";

import { validateInput } from "./form.utils.ts";
import { submitCredentials } from "../../utils/submit.ts";

import { Credentials, CredentialsErrors } from "../../types/form.types.ts";

import cn from "classnames";

import "./form.css";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  handleLogin: (value: boolean) => void;
}

const baseClass = "form";

export const Form = (props: FormProps) => {
  const { handleLogin } = props;

  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const [credentialsErrors, setCredentialsErrors] = useState<CredentialsErrors>(
    {
      email: undefined,
      password: undefined,
    },
  );

  const [serverError, setServerError] = useState<string | undefined>();

  const isSubmitDisabled = useMemo(
    () => Object.values(credentialsErrors).some((error) => !!error),
    [credentialsErrors],
  );

  useEffect(() => {
    if (serverError) {
      setTimeout(() => setServerError(undefined), 4000);
    }
  }, [serverError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));

    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Basic validation on FE side
      const errors = validateInput(credentials);
      const isValid = Object.values(errors).every((error) => !error);

      setCredentialsErrors(errors);

      if (!isValid) return;

      setLoading(true);

      try {
        const response = await submitCredentials(credentials);

        switch (response.status) {
          case "Success":
            handleLogin(true);
            return;
          case "InvalidCredentials": {
            if (response.errors === undefined) return;

            const newErrors: CredentialsErrors = Object.fromEntries(
              response.errors?.map(({ field, message }) => [field, message]),
            );

            setCredentialsErrors((prevErrors) => ({
              ...prevErrors,
              ...newErrors,
            }));

            return;
          }
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "An unknown error occurred.";

        setServerError(message);
      } finally {
        setLoading(false);
      }
    },
    [credentials, handleLogin],
  );

  const classNames = cn(baseClass, props.className);

  return (
    <>
      <form {...props} className={classNames} noValidate>
        <div className={`${baseClass}__inner`}>
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
          <Button
            type="submit"
            loading={loading}
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            className={`${baseClass}__button`}
          >
            Let me in
          </Button>
        </div>
      </form>
      {serverError && <SnackBar>{serverError}</SnackBar>}
    </>
  );
};
