import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCuC_ZuZjqxxY7OvI7d_aR0DcW6pv4ndWE",
    authDomain: "teste-canopus.firebaseapp.com",
    databaseURL: "https://teste-canopus-default-rtdb.firebaseio.com",
    projectId: "teste-canopus",
    storageBucket: "teste-canopus.appspot.com",
    messagingSenderId: "241641351864",
    appId: "1:241641351864:web:bf66ba4ca12956ce72a24d"
};

export const app = initializeApp(firebaseConfig);