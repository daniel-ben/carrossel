import { useState } from "react";
import { Input } from "../../../components";
import { handleRedefinicaoDeSenha } from "../handlers";
import { iLoginFormParams } from "../interfaces";

export default function EsqueceuSenhaForm({ setComponenteAtivo, setLoginDisplay }: iLoginFormParams) {
  const [email, setEmail] = useState('')
  
  return (
    <form
      className="form"
      onSubmit={(e:any) => handleRedefinicaoDeSenha(e, setComponenteAtivo)}
    >
      <h2 className="form__titulo">
        Enviar email de redefinição de senha para:
      </h2>

      <Input
        placeholder="Email"
        icon="email-icon.svg"
        id='email'
        value={email}
        onChange={(e: any) => {setEmail(e.target.value)}}
      />

      <button type="submit" className="botao">
        Enviar
      </button>

      <p className="form__link" onClick={() => setComponenteAtivo("login")}>
        Voltar à página de login
      </p>
    </form>
  );
}
