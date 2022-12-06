import { useState } from "react";
import "./style.css";
import LoginForm from "./LoginForm";
import CriarContaForm from "./CriarContaForm";
import EsqueceuSenhaForm from "./EsqueceuSenhaForm";

type TLoginParams = {
  setLoginDisplay: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Login({ setLoginDisplay }: TLoginParams) {
  const [componenteAtivo, setComponenteAtivo] = useState("login");

  function retornaFormulario() {
    if (componenteAtivo === "login") {
      return <LoginForm setComponenteAtivo={setComponenteAtivo} setLoginDisplay={setLoginDisplay} />
    } else if (componenteAtivo === "criar-conta") {
      return <CriarContaForm setComponenteAtivo={setComponenteAtivo} setLoginDisplay={setLoginDisplay} />;
    } else if (componenteAtivo === "esqueceu-senha") {
      return <EsqueceuSenhaForm setComponenteAtivo={setComponenteAtivo} setLoginDisplay={setLoginDisplay} />;
    }
  }

  return (
    <section className="login__container" data-login-container
      onClick={(event: any) => {
        if (event.target === document.querySelector('[data-login-container]')) {
          setLoginDisplay(false);
        }
      }}
    >
      {retornaFormulario()}
    </section>
  );
}


