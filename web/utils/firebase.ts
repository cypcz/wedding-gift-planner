import firebase from "firebase/app";
import "firebase/auth";

enum Env {
  STAGING = "staging",
  DEMO = "demo",
  PRODUCTION = "production",
}

const configs = {
  [Env.STAGING]: {
    apiKey: "AIzaSyCimfx4-PNwBo6fkX-uY1ECVEI80tBXRAw",
    authDomain: "wedding-planner-edf27.firebaseapp.com",
    databaseURL: "https://wedding-planner-edf27.firebaseio.com",
    projectId: "wedding-planner-edf27",
    storageBucket: "wedding-planner-edf27.appspot.com",
    messagingSenderId: "738815682461",
    appId: "1:738815682461:web:c30ef2ac00dfc582c07174",
  },
  [Env.PRODUCTION]: {},
};

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(configs[process.env.NEXT_PUBLIC_STAGE as Env]);
  if ("measurementId" in configs[process.env.NEXT_PUBLIC_STAGE as Env]) firebase.analytics();

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
}

export default firebase;
