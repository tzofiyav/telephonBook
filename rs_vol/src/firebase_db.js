import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  getDoc,
  where,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  collection
} from "firebase/firestore";
 
const firebaseConfig = {
  // apiKey: "AIzaSyBagLyeXOLZH0FT8GaynbLOAhQcXhnLQhI",
  // authDomain: "rs-vol.firebaseapp.com",
  // projectId: "rs-vol",
  // storageBucket: "rs-vol.appspot.com",
  // messagingSenderId: "65098016721",
  // appId: "1:65098016721:web:a30fc82593f66f8ddd22f0",
  // measurementId: "G-8FZMKYNJ2L"

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// const logInWithEmailAndPassword = async (email, password,setRole) => {
  const logInWithEmailAndPassword = async (email, password,setUserDetail)=> {

  try {
    await signInWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "users", email)
    const doc1 = await getDoc(docRef)
    const data = doc1.data()
    // await userDoc
    setUserDetail(data.role,doc1.id, data)
    // setRole(data.role) ;
    // setEmail(doc1.id)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password, setEmail) => { 
  try {
  
    const res = await createUserWithEmailAndPassword(auth, email, password);
    setEmail(email) ; // sets the user email & not true false - Ayala
    const user = res.user;

    alert("Signup Successful for user "+res.user+ " and name "+name)
    //await addDoc(collection(db, "users"), {

      //await setDoc(collection(db,"users/"+email), {
      const collectionRef = collection(db, "users") ;
      const docRef = doc(collectionRef, email);
      await setDoc(docRef,{
      email: email,
      username: name}
      );
   
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = (setAuth) => {
  signOut(auth);
  setAuth("noLogin", "")
};

const getMessages =  () => {
  try {
    const messages= getDocs(collection(db,'Messages/')) ;
    //alert("returned products =", products)
    return messages ;
  }
  catch (err) {
    console.error("getMessages:"+err);
    alert(err.message);
  } 
}
const getUsers =  () => {
  try {
    const users= getDocs(collection(db,'Users/')) ;
    //alert("returned products =", products)
    return users ;
  }
  catch (err) {
    console.error("getUsers:"+err);
    alert(err.message);
  } 
}

const getProducts =  () => {
  try {
    const products= getDocs(collection(db,'Products/')) ;
    //alert("returned products =", products)
    return products ;
  }
  catch (err) {
    console.error("getProducts:"+err);
    alert(err.message);
  } 
}
const auth = getAuth(app);

export {
  db,
  sendPasswordResetEmail,
  getAuth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithEmailAndPassword,
  logout,
  getProducts
};
