import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendResetPasswordEmail,
  updateUsername,
} from "./controllers";

export async function handleLogin(event: any, setLoginDisplay: React.Dispatch<React.SetStateAction<boolean>>) {
  event.preventDefault();
  const form = event.target;
  const [email, password] = [
    form['email'].value,
    form['password'].value,
  ]

  try {
    const res = await logInWithEmailAndPassword(email, password);
    setLoginDisplay(false);
  } catch (err: any) {
    if (err.message === "Firebase: Error (auth/user-not-found).") {
      alert("Usuário não encontrado");
    } else if (err.message === "Firebase: Error (auth/wrong-password).") {
      alert("Senha inválida");
    } else {
      alert(err.message);
    }
  }
}

export async function handleCriarConta(event: any, setLoginDisplay: React.Dispatch<React.SetStateAction<boolean>>) {
  event.preventDefault();
  const form = event.target;
  const [username, email, password] = [
    form["username"].value,
    form['email'].value,
    form['password'].value,
  ]

  try {
    await registerWithEmailAndPassword(email, password);
    await logInWithEmailAndPassword(email, password);
    updateUsername(username);
    setLoginDisplay(false);
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function handleRedefinicaoDeSenha(event: any, setComponenteAtivo: React.Dispatch<React.SetStateAction<string>>) {
  event.preventDefault();
  const email = event.target["email"].value;

  try {
    await sendResetPasswordEmail(email);
    alert("Email de redefinição de senha enviado para: " + email + '. Verifique sua caixa de spam');
    setComponenteAtivo("login");
  } catch (err: any) {
    if (err.message === "Firebase: Error (auth/user-not-found).") {
      alert("Usuário não encontrado");
    }
  }
}