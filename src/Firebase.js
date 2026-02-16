
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc,  collection,getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTpmV9D6p6xqsTKYIe2TkFzuyb4nbA9WY",
  authDomain: "netflix-clone-ae2ce.firebaseapp.com",
  projectId: "netflix-clone-ae2ce",
  storageBucket: "netflix-clone-ae2ce.firebasestorage.app",
  messagingSenderId: "1000121348947",
  appId: "1:1000121348947:web:73ed9d22b87b95c6a567a6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db=getFirestore(app)
const signup= async (name,email,password)=>{
    try {
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user=res.user;
       await addDoc(collection(db,"users"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
       })
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}
const login= async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
    }
    catch (error) {
        console.log(error);
        alert(error.message);
    }
}
const logout=()=>{
    auth.signOut();
}
export {auth,db,signup,login,logout}