import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", 
  authDomain: "deliveryapppfe.firebaseapp.com",
  projectId: "deliveryapppfe",
  storageBucket: "deliveryapppfe.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID", 
  appId: "YOUR_APP_ID" 
};

  let app;



  if(firebase.apps.length === 0){
      app = firebase.initializeApp(firebaseConfig);
    }else{
      app=firebase.app();
    }

  const db = firebase.firestore();

  const auth = firebase.auth();


  export {db,auth};