import { Input } from "../ui-kit/input/input.tsx";
import { Button } from "../ui-kit/button/button.tsx";

import "./form.css";

export const Form = () => {
  return (
    <form className="form">
      <Input
        name="email"
        id="email"
        label="Your email"
        type="email"
        placeholder="ramazan@ittiev.ru"
        autoComplete="username"
        required
        // error="Are you sure it is your email?"
      />
      <Input
        name="password"
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        // error="Ops! Try another password"
      />
      <Button type="submit">Let me in!</Button>
    </form>
  );
};
