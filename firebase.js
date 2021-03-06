import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FRB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FRB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FRB_PROJ_ID,
    storageBucket: process.env.NEXT_PUBLIC_FRB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FRB_MSG_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FRB_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FRB_MEASUREMENT_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    if (!process.env.NODE_ENV && process.env.NODE_ENV !== "production")
        try {
            firebase
                .firestore()
                .enablePersistence()
                .then(() => console.log("Persistance enabled"));
            firebase.analytics();
        } catch (e) {}
}

export default firebase;
