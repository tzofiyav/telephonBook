import { db } from '../../firebase_db';
import React, { useEffect, useState } from 'react';
import { ontr, onbtn, search } from './details.js';
import { collection, getDocs, doc, query, where, updateDoc } from 'firebase/firestore';
import HelmetExport from 'react-helmet';
import { menepulative } from './menipulation';
import { MultiSelect } from "react-multi-select-component";
export const updateData = async (legacyRowID, idV, newData) => {
    try {
        const collectionRef = collection(db, 'temp');
        let fieldName;
        let fieldValue;
       /* if(idV!=""){
            fieldName="ID";
            fieldValue=idV;
        } 

        else{
            fieldName="rowID";
            fieldValue=Number(legacyRowID.data);
        }*/

        const idField = legacyRowID ? "rowID" : "ID";
        const idValue = legacyRowID ? Number(legacyRowID.data) : idV;
        console.log("idField:", idField);
        console.log("idValue:", idValue);
        console.log("rowID:", legacyRowID);
        console.log("ID:", idV);
        const q = query(collectionRef, where(idField,  '==', idValue));
        
       /* let q;
        if(fieldName=="ID"){
            q = query(collectionRef, where(fieldName,  'array-contains', fieldValue));
        }
        else{
            q = query(collectionRef, where(fieldName, '==', fieldValue));
        }*/
       // const q = query(collectionRef, where(fieldName,  'array-contains', fieldValue));
        console.log(q);
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            const docRef = doc(db, 'temp', snapshot.docs[0].id);
            console.log(newData);
            await updateDoc(docRef, newData);

            console.log('Data updated successfully');
        }
        else {
            console.error("unable to find volunteer data");
            alert("TODO unable to find volunteer data");

        }
        //const docRef = doc(db, 'volunteer', );

    } catch (error) {
        console.error('Error updating data:', error);
    }
   
};
export const list = async () => {
    try {
      const collectionRef2 = collection(db, 'config');
      const snapshot2 = await getDocs(collectionRef2);
      const data2 = snapshot2.docs.map((doc) => doc.data());

      console.log(data2);
      const selectOptions = data2.map((item) => ({ label: item, value: item }));
  
      console.log("Select options:", selectOptions);
      return selectOptions;
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
      return [];
    }
  };
  


/*const selection = (sel) =>{
    selection(sel);
    setVolDetails((prevState) => ({
        ...prevState,
        category: sel.map((option) => option.value),
    }));
  }*/



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


export function menepulativeCategory(arr) {
    let strCategory = arr[0];
    for (let i = 1; i < arr.length; i++)

        strCategory += ", " + arr[i];

    return strCategory;
}

const TableComponent = () => {
    const [tableData, setTableData] = useState([]);
    const [strCategory, setArrCategory] = useState([]);
    useEffect(() => {
        // Function to fetch data from Firebase
        const fetchDataFromFirebase = async () => {
            try {
                const collectionRef = collection(db, 'temp');;
                const snapshot = await getDocs(collectionRef);
                //const data = snapshot.docs.map((doc) => doc.data());
                const data = snapshot.docs.map((doc) => ({...doc.data(), categoryString: menepulativeCategory(doc.data().category)}));
                //const manipulatedCategory = data.map((item) => menepulativeCategory(item.category));
                console.log(data);

                setTableData(data);
                //setArrCategory(manipulatedCategory);

            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            }

          

        };

        // Call the function to fetch data from Firebase
        fetchDataFromFirebase();
    }, []);


   
/*const [selected, setSelected] = useState([]);


    console.log("hello" , categoryList);
   
    const options = categoryList.map((cat)=> 
    ({"label":cat,"value":cat}));


    const addSelected = (sel) =>{
      setSelected(sel);
      setVolDetails((prevState) => ({
          ...prevState,
          category: sel.map((option) => option.value),
      }));
    }*/

    // Render the table with the fetched data
    return (
        <div>

            <div style={{ display: "flex" }}>
                <h3 style={{ margin: "40px", marginRight: "600px" }}>פרטי מתנדבים</h3>
                <input
                    type="text"
                    style={{ margin: "40px", marginRight: "250px" }}
                    id="myInput"
                    onKeyUp={() => search("myInput", "myTable")}
                    placeholder="Search for last_names.."
                    title="Type in a name"
                />
            </div>

            <table id="myTable">
                <thead>
                    <tr>
                        <th>מס'</th>
                        <th>שם משפחה</th>
                        <th>שם פרטי</th>
                        <th>מס' זהות</th>
                        <th>מס' פלאפון</th>
                        <th>כתובת</th>
                        <th>דוא"ל</th>
                        <th>מס' תגים</th>
                        <th>תגים</th>
                        <th>סטטוס</th>
                        <th>מגדר</th>
                        <th>יום הולדת</th>
                        {/* Add more columns here as per your data */}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (

                        <tr key={index} id={index} onClick={() => ontr(index)}>
                            <td>{item.rowID}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.ID}</td>
                            <td>{item.phone}</td>
                            <td>{item.Address}</td>
                            <td>{item.Email}</td>
                            <td>{item.Number_of_tags}</td>
                            <td>{/*strCategory[index]*/ item.categoryString}</td>
                            <td>{item.Status}</td>
                            <td>{item.Gender}</td>
                            <td>{item.Birthday}</td>
                            {/* Add more columns here as per your data */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
