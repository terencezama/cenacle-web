import * as client from 'firebase'
import * as admin from 'firebase-admin';
var serviceAccount = require("../../terence-838bd-firebase-adminsdk-w629d-7d31ccf4f3.json");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDxjDs_vkZp0t4qwfcHrjrG_7geF5ukTZw",
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