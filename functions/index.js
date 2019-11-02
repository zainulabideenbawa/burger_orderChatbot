const functions = require('firebase-functions');
const admin = require("firebase-admin");


admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore();






// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.webhook = functions.https.onRequest((request, response) => {
    let params = request.body.queryResult.parameters;

    var docRef = firestore.collection('orders');
    docRef.add({
        name: params.given_name,
        dish: params.dish,
        quantity: params.quantity
    }).then(() => {
        console.log(`your order of ${params.quantity} ${params.dish} is recieved`);
        response.send({
            fulfillmentText: `${params.given_name} your order of ${params.quantity} ${params.dish} is recieved.`
        })
    }).catch((e) => {
        console.log("error", e)
        response.send({
            fulfillmentText: `something went wrong`
        })

    });
})
