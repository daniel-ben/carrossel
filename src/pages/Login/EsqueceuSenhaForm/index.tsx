import "./style.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Input } from "../../../components";
import { iLoginFormParams } from "../interfaces";
import { useState } from "react";

export default function EsqueceuSenhaForm({ setComponenteAtivo }: iLoginFormParams) {
  const [email, setEmail] = useState('')

  async function handleRedefinicaoDeSenha(event: any) {
    event.preventDefault();
    const email = event.target["email"].value;
  
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email de redefinição de senha enviado para: " + email + '. Verifique sua caixa de spam');
      setComponenteAtivo("login");
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/user-not-found).") {
        alert("Usuário não encontrado");
      }
    }
  }
  
  return (
    <form
      className="form esqueceu-senha-form"
      onSubmit={handleRedefinicaoDeSenha}
    >
      <h2 className="form__titulo">
        Enviar email de redefinição de senha para:
      </h2>

      <Input
        placeholder="Email"
        icon="email-icon.svg"
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
