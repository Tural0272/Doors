/* eslint-disable */
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/analytics'

const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyBVbuMKdILEACOlG5zAxb64FV96K5EBqQ4",
    authDomain: "qapiaz.firebaseapp.com",
    projectId: "qapiaz",
    storageBucket: "qapiaz.appspot.com",
    messagingSenderId: "671241740664",
    appId: "1:671241740664:web:594a71bcc168f3e0fc288d",
    measurementId: "G-PTRM4YDFHR",
  },
  "main"
);

const firebaseAppChats = firebase.initializeApp(
  {
    apiKey: "AIzaSyBqxL4_PwlLgkMrOpgrP1PtgcMa-JzOWiQ",
    authDomain: "qapiaz-messaging.firebaseapp.com",
    projectId: "qapiaz-messaging",
    storageBucket: "qapiaz-messaging.appspot.com",
    messagingSenderId: "319604624001",
    appId: "1:319604624001:web:88bb22804f1b4918b11b80",
  },
  "secondary"
);

firebaseApp.analytics()

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const dbChat = firebaseAppChats.firestore();
const authChat = firebaseAppChats.auth();

export { db, auth, storage, dbChat, authChat };
