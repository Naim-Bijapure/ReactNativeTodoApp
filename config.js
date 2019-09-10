import Firebase from 'firebase';

import '@firebase/firestore'


let config = {
    apiKey: "AIzaSyBAc1itztO8cr0gmEJiciQDe3Oynhy6hus",
    authDomain: "n-jivvxs.firebaseapp.com",
    databaseURL: "https://n-jivvxs.firebaseio.com",
    projectId: "n-jivvxs",
    storageBucket: "n-jivvxs.appspot.com",
    messagingSenderId: "304286651204",
    appId: "1:304286651204:web:afab13274af33d47a1fd11"


};
let app = Firebase.initializeApp(config);
// export const db = app.database();
export const db = app.firestore();