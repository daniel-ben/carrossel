import React, { useState } from "react";
import { Input } from "../../../components";
import { handleLogin } from "../handlers";
import { iLoginFormParams } from "../interfaces";
import "./style.css";

export default function LoginForm({ setComponenteAtivo, setLoginDisplay }: iLoginFormParams) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="form" onSubmit={(e: any) => handleLogin(e, setLoginDisplay)}>
      <h2 className="form__titulo">Entre na sua Conta</h2>

      <Input
        placeholder="Email"
        icon="email-icon.svg"
        id='email'
        value={email}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Senha"
        icon="cadeado-icon.svg"
        type="password"
        id='password'
        value={password}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
      />

      <button type="submit" className="botao">Login</button>

      <p
        className="form__link form__esqueceu-senha"
        onClick={() => setComponenteAtivo("esqueceu-senha")}
      >
        Esqueceu a sua senha?
      </p>

      <div className="form__mini-container">
        <p
          className="form__link form__criar-conta"
          onClick={() => setComponenteAtivo("criar-conta")}
        >
          Criar Conta
        </p>
        <div className="form__linha-vertical"></div>
        <p className="form__link form__visitante"
          onClick={() => setLoginDisplay(false)}
        >
          Entrar como Visitante
        </p>
      </div>
    </form>
  );
}
