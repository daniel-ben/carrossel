import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

export const auth = getAuth();

export function registerWithEmailAndPassword(email: string, password: string) {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    throw new Error(err);
  }
};

export function logInWithEmailAndPassword (email: string, password: string) {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) { throw new Error(err) }
};

export function updateUsername(username: string) {
  try {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: username
      })
    }
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function logout() {
  try {
    await auth.signOut();
  } catch (err: any) {
    throw new Error(err);
  }
}
