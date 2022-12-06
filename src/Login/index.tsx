import { useState } from "react";
import LoginForm from "./LoginForm";
import CriarContaForm from "./CriarContaForm";
import EsqueceuSenhaForm from "./EsqueceuSenhaForm";
import { TLoginParams } from "../interfaces";
import "./style.css";

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


