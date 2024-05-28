import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD1w4eCWfzI6gqC4sjq4A7fuoyLWasrn2w",
    authDomain: "dropbox-587ee.firebaseapp.com",
    projectId: "dropbox-587ee",
    storageBucket: "dropbox-587ee.appspot.com",
    messagingSenderId: "101301400910",
    appId: "1:101301400910:web:d1e04e840ddb2a42dc5a1f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const store = getFirestore(app);
const storage = getStorage(app);

export { auth, store, storage };