// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBagLyeXOLZH0FT8GaynbLOAhQcXhnLQhI",
//   authDomain: "rs-vol.firebaseapp.com",
//   projectId: "rs-vol",
//   storageBucket: "rs-vol.appspot.com",
//   messagingSenderId: "65098016721",
//   appId: "1:65098016721:web:a30fc82593f66f8ddd22f0",
//   measurementId: "G-8FZMKYNJ2L"
// };

// import {initializeApp, initializeFirestore, getFirestore,} from "firebase/firestore"
// import {getAuth, signOut,signInWithEmailAndPassword} from "firebase/auth"

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app) ;
// const db = getFirestore(app) ;
// //const analytics = getAnalytics(app);

// export const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// export const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };