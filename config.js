import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
apiKey: "AIzaSyB98gl1gJ6h4mqs_qsY6vbBpgLgAcoxd2E",
authDomain: "barterapp-351b9.firebaseapp.com",
projectId: "barterapp-351b9",
storageBucket: "barterapp-351b9.appspot.com",
messagingSenderId: "812434133197",
appId: "1:812434133197:web:8107b9b61d023731a9d984"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore()