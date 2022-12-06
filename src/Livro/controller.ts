import { app } from "../firebaseInit";
import {
  getDatabase,
  ref as ref_database,
  child,
  get,
  push,
  update,
  remove,
} from "firebase/database";
import {
  getStorage,
  ref as ref_storage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const database = ref_database(getDatabase(app));
const storage = getStorage(app);

export function writeNewLivro(dadosLivro: any, imageFile: any) {
  const id = push(child(database, "livros/"), dadosLivro).key;
  const storageRef = ref_storage(storage, "livros/" + id);
  uploadBytes(storageRef, imageFile);
}

export async function updateLivro(dadosLivro: any, imageFile: any, id: string) {
  await update(child(database, "livros/" + id), dadosLivro);
  
  if (imageFile !== undefined) {
    const storageRef = ref_storage(storage, "livros/" + id);
    uploadBytes(storageRef, imageFile);
  }
}

export async function getLivroById(currentLivroId: string) {
  const livro = await get(child(database, `livros/${currentLivroId}`));
  if (livro.val()) return livro.val();
}

export async function getAllLivros() {
  const ref = ref_database(getDatabase(), "livros/");
  return get(ref);
}

export async function getLivrosImages(livros: any) {
  const storage = getStorage();

  const urlPromises = Object.keys(livros).map(
    async (id: string): Promise<string[]> => {
      const imgRef = ref_storage(storage, "livros/" + id);
      const url = await getDownloadURL(imgRef);
      return [id, url];
    }
  );

  const urls = await Promise.all(urlPromises);
  return urls;
}

export async function getLivroImageById(id: string): Promise<string> {
  const imgRef = ref_storage(storage, "livros/" + id);
  const url = await getDownloadURL(imgRef);
  return url;
}

export async function deleteLivro(id: string) {
  try {
    remove(child(database, `livros/${id}`));
  } catch (err: any) {
    alert("Não foi possível deletar os dados");
    throw new Error(err);
  }
}

export async function deleteImage(id: string) {
  const imageRef = ref_storage(storage, "livros/" + id);
  try {
    return await deleteObject(imageRef);
  } catch (error: any) {
    throw new Error(error);
  }
}
