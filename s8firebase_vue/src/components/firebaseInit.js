import firebase from 'firebase';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.database();