import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as request from 'request-promise';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

// handler that reads expiry date in firebase database
export let expiryDateHandler = admin.database()
    .ref('/users/fridgeFoods/') // TODO add path of expiry date 
    .once('value', (snapshot) => {
        if (snapshot.exists()) {
            // TODO if snap equals + 7 days, send notif
            console.log("snapshot 1:" + snapshot)
        }
    });

// handler that sends push notifications
export let notificationHandler = functions.database
    .ref('') // TODO add path to each user??
    .onWrite(async event => {
        // TODO some event logic to handle push notifications
    })
