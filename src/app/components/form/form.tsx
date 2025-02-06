import { Input } from "../ui-kit/input/input.tsx";

export const Form = () => {
  return (
    <form className="form">
      <Input name="email" id="email" label="Email" type="email" />
      <Input name="password" id="password" label="Password" type="password" />
      <button type="submit">Submit</button>
    </form>
  );
};
