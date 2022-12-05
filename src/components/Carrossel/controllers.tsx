import { app } from '../../firebaseInit'
import { getDatabase, ref as dbRef, push, get } from "firebase/database";

export async function getAllCarousel() {
    const ref = dbRef(getDatabase(app), 'carrosseis/');
    return get(ref);
}

export async function writeCarousel() {
    const ref = dbRef(getDatabase(app), 'carrosseis/');
    const id = await push(ref, test);
}