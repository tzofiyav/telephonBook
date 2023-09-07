
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

// Function to upload legacy JSON (old) data to Firebase
// 
async function uploadJSONData() {
    // Read the JSON file
    try {
        const jsonData = require('./det.json');

        const batch = writeBatch(db);
        const users = collection(db, 'temp2');

        let docID;
        jsonData.forEach((item) => {
            newItem = {} ;

            // Choose a unique ID for each record - app uses email or rowID is no email given
            uidChoose = item.Email || item.rowID; // Must be unique
            docID = uidChoose.toString();
            console.log(docID);
            const newDocRef = doc(users, docID);

            // split the name string
            let splitName = menepulative(item.Name);
            newItem.first_name = splitName[1];
            newItem.last_name = splitName[0];

            // split the category tag string into an array
            newItem.category= menepulativeB(item.Tags);

            // Required fields - Make labels consistent with RS app
            newItem.id = item.ID || item.rowID ; // if not ID found use unique legacy rowID                 
            newItem.email = item.Email || "" ;
            newItem.phone = item.Phone || "" ;  
            newItem.role = "volunteer" ;

            // Optional fields - preserve values - just in case ;-)
            item["Address"] && (newItem.address = item["Address"]) ;
            item["Status"]  && (newItem.status = item["Status"])  ;
            item["Birthday"] && (newItem.birthday = item["Birthday"] );
            item["Gender"] && (newItem.gender = item["Gender"]) ;
            item["Group Name"] && (newItem.group = item["Group Name"]) ;
          
            // Add the new item to the batch
            //console.info(newItem) ;
            batch.set(newDocRef, newItem);
        });
        // Commit the batch
        await batch.commit();
        console.log ("Batch load completed for ", jsonData.length, " records");
    }

    catch (error) {
        console.log("error:" + error);
    }

}
uploadJSONData();

