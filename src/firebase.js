import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
// const {REACT_APP_API_KEY} = process.env
const firebaseApp = firebase.initializeApp(config);
const storage = firebaseApp.storage()
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export { auth, googleProvider, facebookProvider, githubProvider, twitterProvider ,storage};