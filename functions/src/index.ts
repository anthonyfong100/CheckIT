import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as request from 'request-promise';

admin.initializeApp(functions.config().firebase);

// create an expiry handler which checks for expiry date,
// doesnt need to be an exported functions

// trying another notification sender
exports.sendNotification = functions.database.ref('/users/{uid}/fridgeFoods/{id}/')
.onWrite((change, context) => {
    const expiringFood = context.params.id;
    const currentUser = context.params.uid;

    const getInstanceIdPromise = admin.database().ref(`/users/${currentUser}/fridgeFoods/${expiringFood}`)
    .once('value');
    const getUserUidPromise = admin.auth().getUser(currentUser);

    // how to query database for value??
    const getFoodName = admin.database().ref(`/users/${currentUser}/fridgeFoods/${expiringFood}/`)
    .once('value')
    .then(snapshot => {
        const foodName = snapshot.val().name;
        console.log("log 1" + foodName);
        return (foodName)
    })
    .catch(() => console.log());

    const getExpiry = admin.database().ref(`/users/${currentUser}/fridgeFoods/${expiringFood}/`)
    .once('value')
    .then(snapshot => {
        const expiryDate = snapshot.val().expiry;
        console.log("log 2" + expiryDate);
        return (expiryDate)
    })
    .catch(() => console.log());

    return Promise.all([getInstanceIdPromise, getUserUidPromise, getExpiry, getFoodName])
    .then(results => {
        const instanceId = results[0].val();
        const user = String(results[1]);
        const expiry = String(results[2]);
        const food = String(results[3]);
        const message = String(food + " is expiring on " + expiry);
        
        const payload = {
            notification: {
                title: user,
                body: message
            }
        };
        
        admin.messaging().sendToDevice(instanceId, payload)
        .then(function(respone) {
            console.log("Successfully sent message: ", respone);
        })
        .catch(function(error) {
            console.log("Error sending message: ", error);
        });
    })
});
