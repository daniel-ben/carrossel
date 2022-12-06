import { useState, useEffect } from "react";
import { Input } from "../../components";
import { handleCriarConta } from "../handlers";
import { iLoginFormParams } from "../interfaces";
import './style.css'

export default function CriarContaForm({ setComponenteAtivo, setLoginDisplay }: iLoginFormParams) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);

  useEffect(() => {
    validaSenhas()
  }, [password, password2]);

  function validaSenhas(): void {
    password !== password2 ? setPasswordDontMatch(true) : setPasswordDontMatch(false);
    password.length < 6 ? setPasswordTooShort(true) : setPasswordTooShort(false);
  }

  return (
    <form className="form criar-conta-form" onSubmit={(event: any) => {
      if (!passwordDontMatch) handleCriarConta(event, setLoginDisplay)
    }}>
      <h2 className="form__titulo">Crie sua conta</h2>

      <Input
        placeholder="Nome de usuário"
        id='username'
        required={true}
        value={username}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Email"
        icon="email-icon.svg"
        type="email"
        id='email'
        pattern='.+@.+\.com'
        required={true}
        value={email}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Senha"
        icon="cadeado-icon.svg"
        type="password"
        id='password'
        required={true}
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        style={{
          border: password && passwordTooShort ? "2px solid red" : "",
        }}
      />

      <p className="err-message"
        style={{ display: password && passwordTooShort ? "block" : "none" }}
      >Senha deve ter pelo menos 6 caracteres</p>

      <Input
        placeholder="Confirmar senha"
        icon="cadeado-icon.svg"
        type="password"
        id='password2'
        required={true}
        value={password2}
        onChange={(e: any) => setPassword2(e.target.value)}
        style={{
          border: passwordDontMatch ? "2px solid red" : "",
        }}
      />

      <p className="err-message"
        style={{ display: password2 && passwordDontMatch ? "block" : "none" }}
      >Senhas devem ser iguais</p>

      <button type='submit' className="botao">Criar conta</button>
      <p className="form__link" onClick={() => setComponenteAtivo("login")}>
        Voltar à página de login
      </p>
    </form>
  );
}
