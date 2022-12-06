import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  updateUsername,
} from "./controllers";

export async function handleLogin(event: any, email: string, password: string) {
  event.preventDefault();

  try {
    const res = await logInWithEmailAndPassword(email, password);
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

export async function handleCriarConta(event: any) {
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
  } catch (err: any) {
    console.error(err.message);
  }
}

