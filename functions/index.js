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

//  connecting excel sheet to log data. 


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


function listMajors(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                console.log(`${row[0]}, ${row[4]}`);
            });
        } else {
            console.log('No data found.');
        }
    });
}
