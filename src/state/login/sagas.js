import firebase from "firebase";
import { put } from "redux-saga/effects";
import { performAction, Types } from "..";
import { success, LOGIN, failure } from "../types";

function* loginPersistence(email,password) {
  yield new Promise((resolve,reject) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        console.log('will signing');
        return firebase.auth().signInWithEmailAndPassword(email, password);
      }).then((result)=>{
          console.log('result',result);
          resolve(result);
      })
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        reject(error);
      });
  });
}

export function* loginSaga(action) {
  const {
    payload: { email, password }
  } = action;

  try {
    // let collection = firebase
    //   .firestore()
    //   .collection("cenacle")
    //   .doc("user")
    //   .collection("details");
    // const details = yield collection.where("email", "==", email).get();
    // if (details.size === 1) {
    //   console.log(details);
    // } else {
    //   console.log("login <<<", "not found in collection");
    //   // yield put(performAction("error",failure(LOGIN)))
    // }

    const result =  yield loginPersistence(email,password).next().value;
    console.log('login >>>',result);
    yield put(performAction(result,success(LOGIN)))

    


  } catch (error) {
    console.log("login <<<", error);
    yield put(performAction(error, failure(LOGIN)));
  }
}
