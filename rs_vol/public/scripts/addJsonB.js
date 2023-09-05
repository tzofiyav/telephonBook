
const { initializeApp } = require('firebase/app');
//const {  menepulative } = require('./menipulation.js');
const { getFirestore, collection, writeBatch, doc } = require('firebase/firestore');

//../../src/pages/contact/menipulation.js


const firebaseConfig = {
    apiKey: "AIzaSyBagLyeXOLZH0FT8GaynbLOAhQcXhnLQhI",
    authDomain: "rs-vol.firebaseapp.com",
    databaseURL: "https://rs-vol-default-rtdb.firebaseio.com",
    projectId: "rs-vol",
    storageBucket: "rs-vol.appspot.com",
    messagingSenderId: "65098016721",
    appId: "1:65098016721:web:a30fc82593f66f8ddd22f0",
    measurementId: "G-8FZMKYNJ2L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function menepulative(text) {
    if (text) {
        const firstSpaceIndex = text.indexOf(" ");
        if (firstSpaceIndex !== -1) {
            const part1 = text.substring(0, firstSpaceIndex);
            const part2 = text.substring(firstSpaceIndex + 1);
            return [part1, part2];
        } else {
            // Handle the case where there is no space in the text
            return [text, ""];
        }
    } else {
        // Handle the case where 'text' is undefined or empty
        return ["", ""];
    }
}

function menepulativeB(text) {
    if (text) {
        const newItem = text.split(",");
        return newItem;
    } else {
        // Handle the case where 'text' is undefined or empty
        return ["", ""]; // Return an empty array or handle it differently based on your requirements
    }
}

// Function to upload JSON data to Firebase
async function uploadJSONData() {
    // Read the JSON file
    try {
        const jsonData = require('./det.json');

        const batch = writeBatch(db);
        const users = collection(db, 'temp');
        //let goodItem;
        let nameDoc;
        let nameChoose;
        jsonData.forEach((item) => {
            nameChoose = item.Email || item.rowID;
            nameDoc = nameChoose.toString();
            console.log(nameDoc);
            const newDocRef = doc(users, nameDoc);
            let goodNameItem = menepulative(item.Name);
            item.first_name = goodNameItem[0];
            item.last_name = goodNameItem[1];
            item.category= menepulativeB(item.Tags);
            delete item.Name;
            delete item.Tags;
            batch.set(newDocRef, item);
        });
        await batch.commit();
    }

    catch (error) {
        console.log("error:" + error);
    }

}
uploadJSONData();

