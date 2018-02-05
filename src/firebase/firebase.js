import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCvbrHIewJ-_mrh23GqLkEQgvT9ThbSvsw",
    authDomain: "oneto1-chatapp.firebaseapp.com",
    databaseURL: "https://oneto1-chatapp.firebaseio.com",
    projectId: "oneto1-chatapp",
    storageBucket: "oneto1-chatapp.appspot.com",
    messagingSenderId: "692785669761"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };