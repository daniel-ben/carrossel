import { app } from '../firebaseInit'
import { getDatabase, ref as dbRef, push, get } from "firebase/database";

// export async function writeCarousel() {
//     const ref = dbRef(getDatabase(app), 'carrosseis/');
//     const id = await push(ref, test);
// }