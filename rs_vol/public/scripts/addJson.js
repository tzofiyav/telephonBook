const { initializeApp } = require('firebase/app');
const { getFirestore, collection, writeBatch, doc } = require('firebase/firestore');



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
    
      // Function to upload JSON data to Firebase
     async function  uploadJSONData  ()  {
        // Read the JSON file
        try{
            const jsonData = require('./det.json');
    
            const batch = writeBatch(db);
            const user = collection(db, 'volunteer');
        
            jsonData.forEach((item) => {
              const newDocRef = doc(user);
              batch.set(newDocRef, item);
            });
            await batch.commit();
        }
        
        catch(error){
            console.log("error:"+ error);
        }
    
    }
      uploadJSONData();
