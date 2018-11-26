import * as client from 'firebase'
import * as admin from 'firebase-admin';
var serviceAccount = require("../../terence-838bd-firebase-adminsdk-w629d-782ff6ec28.json");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCfjcN3F2xol2dKO7xAl6iJKKaEVxuZgY4",
  authDomain: "terence-838bd.firebaseapp.com",
  databaseURL: "https://terence-838bd.firebaseio.com",
  projectId: "terence-838bd",
  storageBucket: "terence-838bd.appspot.com",
  messagingSenderId: "518913624530"
};
client.initializeApp(config);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://terence-838bd.firebaseio.com"
  });
var firestore = client.firestore();

// Disable deprecated features
firestore.settings({
  timestampsInSnapshots: true
});

  export {
      admin,
      client,
      firestore
  }