import { Form } from "./components/form/form.tsx";

import IconEvilMartians from "../assets/icons/icon-evil-martians.svg";

import "./app.css";

const baseClass = "app";

function App() {
  return (
    <div className={baseClass}>
      <Form className={`${baseClass}__form`} />
      <div className={`${baseClass}__side`}>
        <div className={`${baseClass}__image`}>
          <IconEvilMartians />
        </div>
        <h1 className={`${baseClass}__title`}>
          Welcome to <br /> Evil Martians!
        </h1>
      </div>
    </div>
  );
}

export default App;
