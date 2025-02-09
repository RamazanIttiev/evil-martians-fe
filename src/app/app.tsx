import { useState } from "react";

import { Form } from "./components/form/form.tsx";
import { Button } from "./components/ui-kit/button/button.tsx";

import IconEvilMartians from "../assets/icons/icon-evil-martians.svg";

import "./app.css";

const baseClass = "app";

const LoggedInContent = (props: { handleLogin: (value: boolean) => void }) => {
  return (
    <div className={`${baseClass}__logged`}>
      <span className={`${baseClass}__logged-title`}>
        You are in the team now!
      </span>
      <Button onClick={() => props.handleLogin(false)}>Go for a break</Button>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (value: boolean) => {
    setIsLoggedIn(value);
  };

  return (
    <div className={baseClass}>
      {isLoggedIn ? (
        <LoggedInContent handleLogin={handleLogin} />
      ) : (
        <>
          <Form handleLogin={handleLogin} />
          <div className={`${baseClass}__side`}>
            <div className={`${baseClass}__image`}>
              <IconEvilMartians />
            </div>
            <h1 className={`${baseClass}__title`}>
              Welcome to <br /> Evil Martians!
            </h1>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
