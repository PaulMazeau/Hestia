/* eslint-disable */
const functions = require("firebase-functions");
const admin=require("firebase-admin");
const FieldValue = require('firebase-admin').firestore.FieldValue
admin.initializeApp();
const db = admin.firestore();


//Update membersID des membres restant
//Update colocID nom coloc membersID du membre quittant
//Supprime la coloc si plus de membre
exports.updateUsersProfileOnJoinOrLeaveColoc =  functions.firestore.document("Colocs/{colocID}").onUpdate((change, event)=>{
    const batch = db.batch();
    let oldMembersID = change.before.data().membersID
    let newMembersID = change.after.data().membersID
    if(newMembersID.length == 0) { //on supprime si ya plus eprsonne ds la coloc
        batch.delete(db.doc("Colocs/" + event.params.colocID));
        batch.update(db.doc("Users/"+oldMembersID[0]), {membersID: [], colocID: '0', nomColoc:''})
        return batch.commit();
    }
    if(oldMembersID.length != newMembersID.length){
        if(oldMembersID.length < newMembersID.length){ //donc qqn a join la coloc
            for(var i= 0; i<newMembersID.length; i++){
                batch.update(db.doc("Users/"+ newMembersID[i]), {membersID: newMembersID})
            }
            return batch.commit();
        }else{//qqn a leave la coloc
            for(var i = 0; i<oldMembersID.length; i++){
                if(newMembersID.includes(oldMembersID[i])){ //pr ts ceux qui restent on update leur doc
                    batch.update(db.doc("Users/"+ oldMembersID[i]), {membersID: newMembersID})
                }else{//si c le frero qui a leave (on doit aussi delete  tt les transac)
                    batch.update(db.doc("Users/"+ oldMembersID[i]), {membersID: [], colocID: '0', nomColoc: ''})
                }
            }
            return batch.commit();
        }
    }

})


//update soldes des concernés par la transac
exports.updateUsersSoldeAfterAddTransaction = functions.firestore.document("Colocs/{colocID}/Transactions/{transacID}").onCreate((snapshot, context) => {
    const receiversID = snapshot.data().receiversID;
    const giverID = snapshot.data().giverID;
    const amount = snapshot.data().amount
    const length = receiversID.length;
    const batch = db.batch();
    var payeurIsIn = false;
    for(var i = 0; i<length; i++){ //juste un algo tout con pr connaitre le cout de la transac pr chacun
        if(!(receiversID[i] == giverID)){
            batch.update(db.doc("Users/" + receiversID[i]), {solde: FieldValue.increment(-Number(amount)/length)})
        }else{
            payeurIsIn = true
            batch.update(db.doc("Users/" + giverID), {solde: FieldValue.increment(Number(amount) - Number(amount)/length)})
        }
    }
    if(!payeurIsIn){
        batch.update(db.doc("Users/" + giverID), {solde: FieldValue.increment(Number(amount))})
    }
    return batch.commit();
})

exports.updateUsersSoldeAfterDeleteTransaction = functions.firestore.document("Colocs/{colocID}/Transactions/{transacID}").onDelete((snap, context) => {
    const receiversID = snap.data().receiversID;
    const giverID = snap.data().giverID;
    const amount = snap.data().amount
    const length = receiversID.length;
    const batch = db.batch();
    var payeurIsIn = false;
    for(var i = 0; i<length; i++){
        if(!(receiversID[i]==giverID)){
            batch.update(db.doc("Users/" + receiversID[i]), {solde: FieldValue.increment(+Number(amount)/length)})
        }else{
            payeurIsIn= true
            batch.update(db.doc("Users/" + giverID), {solde: FieldValue.increment(-Number(amount) + Number(amount)/length)})
        }
    }
    if(!payeurIsIn){
        batch.update(db.doc("Users/" + giverID), {solde: FieldValue.increment(-Number(amount))})
    }
    return batch.commit();
})





/* eslint-disable */

//eslint c le truc pr les indentations, check que ton code est bien mis  en forme... en un mot : OSEF
//est présent car g setup cloud function en me disant que ce serait sympa de lustiliser
// mais c pas marrant car sur 60 lignes de codes ya 110erreurs


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
