import './volunteer.css'

import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import {db} from '../../firebase_db'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';


const searchTable=()=>{
  return 0;
} 

const NavBar = () => {
  return (
    <div className="navbar">
      <button>פניות שטופלו</button>
      <button>פניות בטיפול</button>
      <button>הודעות חדשות</button>
    </div>
  );
};


function Volunteer(props) {
  const userData = props.userData
    
  const [isFormOpenFinish, setIsFormOpenFinish] = useState(false);
  const toggleFormFinish = () => {
    setIsFormOpenFinish(!isFormOpenFinish);
  };

  const [isFormOpenStatus, setIsFormOpenFinishStatus] = useState(false);
  const toggleFormStatus = () => {
    setIsFormOpenFinishStatus(!isFormOpenStatus);
  };

  const [isFormOpenDetails, setIsFormOpenDetails] = useState(false);
  const toggleFormDetails = () => {
    setIsFormOpenDetails(!isFormOpenDetails);
  };
 const [isFormOpenAvailable, setIsFormOpenAvailable] = useState(false);
  const toggleFormAvailable = () => {
    setIsFormOpenAvailable(!isFormOpenAvailable);

  };


  const updateTaskAvailability = async (request_id) => {
    try {
      const requestRef = doc(db, 'requests', request_id);
      await updateDoc(requestRef, {
        available_vols: arrayUnion(props.userEmail)
      });
      console.log('User added to the available users of the task successfully.');
    } catch (error) {
      console.error('Error updating task availability:', error);
    }
  };


  const handleAvailableFormSubmit = (request_id) => {
    updateTaskAvailability(request_id)
    toggleFormAvailable(); // Close the form after successful submission
  };


  const MessageList = ({taskCategory} ) => {
    
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
      const fetchMessages = async () => {
        const messagesRef = collection(db, 'requests');
        console.log("1111")
        // Query messages for the specified taskCategory
        const q = query(messagesRef,
          where('request_category', 'in', taskCategory),
          where('type_of_request', '==', "הודעה חדשה"));

        const querySnapshot = await getDocs(q);
        const fetchedMessages = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
           id:doc.id,...data
          };
        }).filter((message) => !message.available_vols.includes(props.userEmail));
        setMessages(fetchedMessages);
      };
      fetchMessages();
    }, [db, taskCategory]);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>אישור על זמינות</th>
              <th>מספר אנשים</th>
              <th>תיאור הפניה</th>
              <th>קטגורית פניה</th>
              <th>תאריך יצירה</th>
              <th>מספר פניה</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
            <td>
             <>
            {/* Overlay */}
            {isFormOpenAvailable && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                }}
                onClick={toggleFormAvailable}
              ></div>
            )}

            {/* Form */}
            {isFormOpenAvailable && (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "400px",
                  height: "400px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
                  zIndex: 2,
                  overflow: "auto",  // Add overflow property for scrollability

                }}
                onClick={(event) => event.stopPropagation()}
                >
                <form onSubmit={() => handleAvailableFormSubmit(message.id)}>
                  ?האם את/ה בטוח/ה מעוניינ/ת באישור זמינות
                  <button type="submit">כן</button>
                </form>
              </div>
            )}



            {/* Button */}
            <button onClick={toggleFormAvailable } >אישור זמינות</button>
      </>

          </td> 

                <td>{message.num_of_people}</td>
                <td>{message.request_description}</td>
                <td>{message.request_category}</td>
                <td>{message.production_date instanceof Timestamp ? message.production_date.toDate().toLocaleString() : ''}</td>
                <td>{message.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const updateTaskFinishDate = async (request_id,finishDate) => {
    try {
      const requestRef = doc(db, 'requests', request_id);
      const dateObject = new Date(finishDate);
      console.log(dateObject);
      await updateDoc(requestRef, {
        finish_date: dateObject,
        type_of_request: "פניה שטופלה"
      });

      console.log('updateTaskFinishDate.');
    } catch (error) {
      console.error('Error updateTaskFinishDate:', error);
    }
  };

  const updateTaskStatus = async (request_id,updateDate,update_status) => {
    try {
      const requestRef = doc(db, 'requests', request_id);
      await updateDoc(requestRef, {
        updates: arrayUnion( update_status + ' :' + updateDate)
      });
      console.log('User added to the available users of the task successfully.');
    } catch (error) {
      console.error('Error updating task availability:', error);
    }
  };

  const RequestTakeList = ({taskCategory}) => {
    const [requestTake, setRequestTake] = useState([]);
    const [finishDate, setFinishDate] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');

    const handleFinishFormSubmit = (request_id) => {
      // event.preventDefault();
      updateTaskFinishDate(request_id,finishDate)
      // Access the entered value from the state variable
      console.log('Entered value:',  finishDate);
      // Perform further actions with the value, such as saving it to a database
      toggleFormFinish()
    };

    const handleStatusFormSubmit = (request_id) => {
      // event.preventDefault();
      updateTaskStatus(request_id,updateDate,updateStatus)
      // Access the entered value from the state variable
      console.log('Entered value:',  updateDate);
      // Perform further actions with the value, such as saving it to a database
      toggleFormStatus()
    };

    useEffect(() => {
      const fetchRequestTake = async () => {
        const requestTakeRef = collection(db, 'requests');
  
        // Query messages for the specified user ID
        const q = query(requestTakeRef, 
          where('volunteer_details.email', '==', props.userEmail),
          // where('request_category', 'in', taskCategory),
          where('type_of_request', '==', "פניה בטיפול"));
        const querySnapshot = await getDocs(q);
  
        const fetchedRequestTake = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
           id:doc.id,...data
  
          };
        });
        setRequestTake(fetchedRequestTake);
      };
  
      fetchRequestTake();
    }, [db, taskCategory]);
  
    return (
      <div>

        {/* <h2>Messages for User ID: {taskCategory}</h2> */}
        <table>
          <thead>
            <tr>

              <th>סיום טיפול</th>

              <th>עדכוני סטטוס</th>

              <th>מספר נפשות</th>

              <th>תיאור משימה</th>

              <th>קטגורית משימה</th>

              <th>תאריך יצירה</th>

              <th>מספר פניה</th>

              <th>מספר אירוע</th>




              {/* <th>אישור על זמינות</th>
              <th>Message Number</th>
              <th>Task Category</th>
              <th>Task Description</th>
              <th>Number of Persons</th> */}
              {/* <th>Production Date</th> */}
            </tr>
          </thead>
          <tbody>
            {requestTake.map((request) => (
              <tr key={request.id}>
                <td>

<>
  {/* Overlay */}
  {isFormOpenFinish && (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
      }}
      onClick={toggleFormFinish}
    ></div>
  )}

  {/* Form */}
  {isFormOpenFinish && (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "400px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
        zIndex: 2,
        overflow: "auto",  // Add overflow property for scrollability

      }}
      onClick={(event) => event.stopPropagation()}
    >
      <form onSubmit={() => handleFinishFormSubmit(request.id)}>
        יש להכניס תאריך סיום טיפול
        <input type="date" id="date" name="date" value={finishDate}  onChange={(event) => setFinishDate(event.target.value)} required/>
        <button type="submit" >שלח</button>
      </form>
    </div>
  )}

  {/* Button */}
  <button onClick={toggleFormFinish}>דיווח על סיום טיפול</button>
</>
     </td>

     <td> 


    <>
      {/* Overlay */}
      {isFormOpenStatus && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={toggleFormStatus}
        ></div>
      )}

      {/* Form */}
      {isFormOpenStatus && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
            zIndex: 2,
            overflow: "auto",  // Add overflow property for scrollability

          }}
          onClick={(event) => event.stopPropagation()}
        >
          <form onSubmit={() => handleStatusFormSubmit(request.id)}>
          :עדכונים קודמים בפניה זו

          <ol type="i" start="1">
            {request.updates.map((string, index) => (
            <li key={index}>{string}</li>
           ))}
          </ol>
          
            <input type="date" id="date" name="date" placeholder=" תאריך"  value={updateDate}  onChange={(event) => setUpdateDate(event.target.value)} required/>
            <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" value={updateStatus} onChange={(event) => setUpdateStatus(event.target.value)} required/>
            <button type="submit" >עדכן סטטוס</button>
          </form>


        </div>
      )}

      {/* Button */}
      <button onClick={toggleFormStatus}>עדכון סטטוס</button>
    </>

        </td>

                <td>{request.num_of_people}</td>
                <td>{request.request_description}</td>
                <td>{request.request_category}</td>
                <td>{request.production_date  instanceof Timestamp ? request.production_date.toDate().toLocaleString() : ''}</td>
                <td>{request.id}</td>
                <td>{request.event_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  





  const RequestTakenList = ({ taskCategory}) => {
    const [requestTaken, setRequestTaken] = useState([]);
  
    useEffect(() => {
      const fetchRequestTaken = async () => {
        const requestTakenRef = collection(db, 'requests');
  
        // Query messages for the specified user ID
        const q = query(requestTakenRef, 
          where('volunteer_details.email', '==', props.userEmail),
          where('type_of_request', '==', "פניה שטופלה"));
        const querySnapshot = await getDocs(q);
  
        const fetchedRequestTaken = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
           
           id:doc.id,...data
  
          };
        });
        setRequestTaken(fetchedRequestTaken);
      };
  
      fetchRequestTaken();
    }, [db, taskCategory]);
  
    return (
      <div>

        {/* <h2>Messages for User ID: {taskCategory}</h2> */}
        <table>
          <thead>
            <tr>
            <th>מספר נפשות</th>

              <th>תיאור משימה</th>

              <th>קטגורית משימה</th>

              <th>תאריך יצירה</th>

              <th>מספר פניה</th>

              <th>מספר אירוע</th>

            </tr>
          </thead>
          <tbody>
            {requestTaken.map((request) => (
              <tr key={request.id}>
               
                <td>{request.num_of_people}</td>
                <td>{request.request_description}</td>
                <td>{request.request_category}</td>
                <td>{request.production_date  instanceof Timestamp ? request.production_date.toDate().toLocaleString() : ''}</td>
                <td>{request.id}</td>
                <td>{request.event_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  const updatePersonalDetails = async (firstName,lastName,address,phone) => {
    try {
      console.log(userData.id)
      const userRef = doc(db, 'users', props.userEmail);
      await updateDoc(userRef, {
        first_name: firstName,
        last_name: lastName,
        address: address,
        phone: phone
      });

      console.log('updatePersonalDetails.');
    } catch (error) {
      console.error('Error updatePersonalDetails:', error);
    }
  };

  const UpdatePersonal = () =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');


    const handlePersonalFormSubmit = (email) => {
      // event.preventDefault()
      updatePersonalDetails(firstName,lastName,address,phone)
      // Access the entered value from the state variable
      console.log('Entered value:',  email, firstName,lastName,address,phone);
      // Perform further actions with the value, such as saving it to a database
      toggleFormDetails()
    };


    return(
<div id="update-form">


<>
    {/* Overlay */}
    {isFormOpenDetails && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
          overflow: "auto",  // Add overflow property for scrollability

        }}
        onClick={toggleFormDetails}
      ></div>
    )}

    {/* Form */}
    {isFormOpenDetails && (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
          zIndex: 2,
          overflow: "auto",  // Add overflow property for scrollability

        }}
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={() => handlePersonalFormSubmit(props.userEmail)}>
         

          <label for="name-input">שם פרטי:</label>
           <input type="text" id="name-input" name="name" value={firstName}  onChange={(event) => setFirstName(event.target.value)} required/>
           <label for="last-name-input">שם משפחה:</label>
           <input type="text" id="last-name-input" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} required/>
           <label for="address-input">כתובת:</label>
           <input type="text" id="address-input" name="address"  value={address}  onChange={(event) => setAddress(event.target.value)} required/>
           <label for="phone-input">טלפון:</label>
           <input type="text" id="phone-input" name="phone" value={phone}  onChange={(event) => setPhone(event.target.value)} required/>
           
           <button type="submit"  >עדכן</button>
        </form>

      </div>
    )}

    {/* Button */}
    <button onClick={toggleFormDetails}>עדכון פרטים אישיים</button>
  </>


</div>

    )
  }






  // <body id = "bodyVolunteer" style={{right: 'inherit',   textAlign: 'right' }}>
  // const taskCategories=<GetVolunterrDetails email="eliedaat@gmail.com"/>


  return (
    <div>
    <NavBar />
    <div id="header">
      <h1>שלום לך {props.userData.first_name} {props.userData.last_name}</h1>
      <h1>איזור אישי למתנדב</h1>
    </div>

    <div id = "detail"/>

<div className="personal-details">
  <UpdatePersonal/>
  {/* <h2>פרטים אישיים</h2>
  <p>שם פרטי: <span id="name">שם פרטי</span></p>
  <p>שם משפחה: <span id="lastName">שם משפחה</span></p>
  <p>כתובת: <span id="address">כתובת מלאה</span></p>
  <p>טלפון: <span id="phone">מספר טלפון</span></p>
  <p>מייל: <span id="email">כתובת מייל</span></p> */}

  {/* <button onClick={toggleFormDetails}>עדכון פרטים</button> */}
</div>


<div/>



    <div id="tasksMessages">

    <h2>הודעות חדשות</h2>
    <div className="search-bar">
         <label for="search-input">חיפוש:</label>
         <input type="text" id="search-input" onKeyUp={searchTable} placeholder="הקלד כאן..."/>
         <button type="button" onClick={searchTable} >חפש</button>
       </div>
      <MessageList taskCategory={userData.category} />
    </div>
      <div id="requestTake">

      <h2>  פניות בטיפול</h2>
      <div className="search-bar">
         <label for="search-input2">חיפוש:</label>
         <input type="text" id="search-input2" onKeyUp={searchTable}  placeholder="הקלד כאן..."/>
         <button type="button" onClick={searchTable} >חפש</button>
       </div>
       <RequestTakeList  taskCategory={userData.category}/>

       
      
      

      </div>


<div id="requestTaken">

<h2>פניות שטופלו</h2>
{/* <RequestTakenList taskCategory={"הסעת חולים"} /> */}

      <div className="search-bar">
         <label for="search-input3">חיפוש:</label>
         <input type="text" id="search-input3" onKeyUp={searchTable}  placeholder="הקלד כאן..."/>
         <button type="button" onClick={searchTable} >חפש</button>
       </div>
      <RequestTakenList  taskCategory={userData.category}/> 

       </div>



        
         <script>

         </script>
        
     <script>
       // קוד JavaScript כאן
     </script>

     </div>
  );
}
export default Volunteer; 




             {/* <td/> 
               <form>
               <input type="date" id="date" name="date" placeholder=" תאריך" required/>
               <input type="submit" value="סיום טיפול"/>
             </form>
           </td>

          //  </tr>
           
          // <tr/>
          //   <td>1</td>
          //   <td>1</td>
          //   <td> סיוע למשפחות</td>
          //   <td>גידור עצים</td>
          //   <td>8 </td>
          //   <td>01/05/2023</td>
          //   <td>07/05/2023</td>
          //   <td/> <ol type="i" start="5"/>
          //     <li>אחת</li>
          //     <li>שתים</li>
          //     <li>שלוש</li>
          //     <li>ארבע</li>
          //     <li/>
          //       <form>
          //         <input type="date" id="date" name="date" placeholder=" תאריך" required/>
          //         <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" required/>
          //         <input type="submit" value="עדכן סטטוס"/>
          //       </form>
          //     </li>
          // </ol>
          //   </td>
//             <td/>
//               <form>
//               <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//               <input type="submit" value="סיום טיפול"/>
//             </form>
//           </td>
//           </tr>
          
//           <tr/>
//             <td>1</td>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//             <td/> <ol type="i" start="5"/>
//               <li>אחת (12/1/2022)</li>
//               <li>שתים</li>
//               <li>שלוש</li>
//               <li>ארבע</li>
//               <li>
//                 <form>
//                   <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//                   <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" required/>
//                   <input type="submit" value="עדכן סטטוס"/>
//                 </form>
//               </li>
//           </ol>
//           </td>
//           <td>
//             <form>
//             <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//             <input type="submit" value="סיום טיפול"/>
//           </form>
//         </td>
//           </tr>
//         </tbody>
//       </table>

*/}










//     <div>
// <div>
// <head>

//     <title>איזור אישי למתנדב</title>
    
//   </head>
//   <body dir style="right: inherit;"/>
//     <div id="header">
//       <h1>איזור אישי למתנדב</h1>
//     </div>
//     <div id="nav">
//       <a class="active" href="#">משימות</a>
//       <a href="#">פרופיל</a>
//       <a href="#">הגדרות</a>
//     </div>
//     <div id="content"/>
//       <h2>  הודעות חדשות</h2>
//       <div class="search-bar">
//         <label for="search-input">חיפוש:</label>
//         <input type="text" id="search-input" onkeyup="searchTable()" placeholder="הקלד כאן..."/>
//         <button type="button" onclick="searchTable()">חפש</button>
//       </div>
//       <table id="tasks">
//         <thead>
//           <tr>
//             <th>מספר הודעה</th>
//             <th>קטגורית משימה</th>
//             <th>תיאור משימה</th>
//             <th>מספר נפשות</th>
//             <th>תאריך יצירה</th>
//             <th>תאריך יעד</th>
//             <th>אישור על זמינות</th>

//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//             <td><input type="submit" value="אישור זמינות"/></td>
//           </tr>
//           <tr>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//             <td><input type="submit" value="אישור זמינות"/></td>
//           </tr>
//           <tr>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//             <td><input type="submit" value="אישור זמינות"/></td>
//           </tr>
//         </tbody>
//       </table>
//       <h2>  פניות בטיפול</h2>
//       <div class="search-bar">
//         <label for="search-input">חיפוש:</label>
//         <input type="text" id="search-input" onkeyup="searchTable()" placeholder="הקלד כאן..."/>
//         <button type="button" onclick="searchTable()">חפש</button>
//       </div>
//       <table id="tasks"/>
//         <thead>
//           <tr>
//             <th>מספר הודעה</th>
//             <th>מספר אירוע</th>
//             <th>קטגורית משימה</th>
//             <th>תיאור משימה</th>
//             <th>מספר נפשות</th>
//             <th>תאריך יצירה</th>
//             <th>תאריך יעד</th>
//             <th>עדכוני סטטוס</th>
//             <th>סיום טיפול</th>

//           </tr>
//         </thead>
//         <tbody/>
//           <tr/>
//             <td>1</td>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//             <td/> <ol type="i" start="5"/>
 
//             </div>
//               <li><VolunteerForm isContent={true} title="שתיים"/></li>
//               <li>שתים</li>
//               <li>שלוש</li>
//               <li>ארבע</li>
//               <li/>
//               <VolunteerForm isContent={false}/>
//               </li>
//           </ol>
//             </td>
//             <td/>
//               <form>
//               <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//               <input type="submit" value="סיום טיפול"/>
//             </form>
//           </td>

//           </tr>
//           <tr/>
//             <td>1</td>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//             <td/> <ol type="i" start="5"/>
//               <li>אחת</li>
//               <li>שתים</li>
//               <li>שלוש</li>
//               <li>ארבע</li>
//               <li/>
//                 <form>
//                   <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//                   <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" required/>
//                   <input type="submit" value="עדכן סטטוס"/>
//                 </form>
//               </li>
//           </ol>
//             </td>
//             <td/>
//               <form>
//               <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//               <input type="submit" value="סיום טיפול"/>
//             </form>
//           </td>
//           </tr>
          
//           <tr/>
//             <td>1</td>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//             <td/> <ol type="i" start="5"/>
//               <li>אחת (12/1/2022)</li>
//               <li>שתים</li>
//               <li>שלוש</li>
//               <li>ארבע</li>
//               <li>
//                 <form>
//                   <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//                   <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" required/>
//                   <input type="submit" value="עדכן סטטוס"/>
//                 </form>
//               </li>
//           </ol>
//           </td>
//           <td>
//             <form>
//             <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//             <input type="submit" value="סיום טיפול"/>
//           </form>
//         </td>
//           </tr>
//         </tbody>
//       </table>
//       <h2>  פניות שטופלו</h2>
//       <div class="search-bar">
//         <label for="search-input">חיפוש:</label>
//         <input type="text" id="search-input" onkeyup="searchTable()" placeholder="הקלד כאן..."/>
//         <button type="button" onclick="searchTable()">חפש</button>
//       </div>
//       <table id="tasks">
//         <thead>
//           <tr>
//             <th>מספר אירוע</th>
//             <th>מספר פניה</th>
//             <th>קטגורית משימה</th>
//             <th>תיאור משימה</th>
//             <th>מספר נפשות</th>
//             <th>תאריך יצירה</th>
//             <th>תאריך יעד</th>

//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//           </tr>
//           <tr>
//             <td>1</td>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//           </tr>
//           <tr>
//             <td>1</td>
//             <td>1</td>
//             <td> סיוע למשפחות</td>
//             <td>גידור עצים</td>
//             <td>8 </td>
//             <td>01/05/2023</td>
//             <td>07/05/2023</td>
//           </tr>
//         </tbody>
//       </table>
//       <form/>
//         <div class="personal-details">
//           <h2>פרטים אישיים</h2>
//           <p>שם: <span id="name">שם מלא</span></p>
//           <p>כתובת: <span id="address">כתובת מלאה</span></p>
//           <p>טלפון: <span id="phone">מספר טלפון</span></p>
//           <button onclick="openForm()">עדכון פרטים</button>
//         </div>
        
//         <div class="form-popup" id="update-form"/>
//           <form action=""/>
//             <label for="name-input">שם:</label>
//             <input type="text" id="name-input" name="name">
//             <label for="address-input">כתובת:</label>
//             <input type="text" id="address-input" name="address">
//             <label for="phone-input">טלפון:</label>
//             <input type="text" id="phone-input" name="phone">
//             <button type="submit" class="btn">עדכן</button>
//             <button type="button" class="btn cancel" onclick="closeForm()">סגור</button>
//           </form>
//         </div>
        
//         <script>
//         function openForm() {
//           document.getElementById("update-form").style.display = "block"
//         }
        
//         function closeForm() {
//           document.getElementById("update-form").style.display = "none"
//         }
//         </script>
//         <h2>  עדכון פרטים אישיים</h2>
//         <label for="description"> שם פרטי::</label>
//         <input type="text" id="description" name="description" required>
//         <label for="deadline">תאריך יעד:</label>
//         <input type="date" id="deadline" name="deadline" required>
//         <input type="submit" value="הוסף משימה">
//       </form>
//     </div>
//     <script>
//       // קוד JavaScript כאן
//     </script>
// </body>


//     </div>
//     </div>

// function openForm() {
//   document.getElementById("update-form").style.display = "block";
// }

// function closeForm() {
//   document.getElementById("update-form").style.display = "none";
// }

// function openForm() {
//   document.getElementById("update-form").style.display = "block";
// }

// function closeForm() {
//   document.getElementById("update-form").style.display = "none";
// }



// const volunteers = [ {"title":"one"},
//   ..                  {"title": "two"}
//                   ] ;
// function VolunteerForm (props) {
//   return (
//     <ul>
//         {volunteers.map((row)=>(<VolunteerRow data={row}/>))}
//     </ul>
//   )
// }
// function VolunteerRow(props) {
//   return (
//   <li>
//     props.data.title
//     </li>
//   )
// }

// function Volunteer (props) {
//   return (
//     <VolunteerForm/>
//   )



    {/* <tr>
      <td>1</td>
      <td>1</td>
      <td> סיוע למשפחות</td>
      <td>גידור עצים</td>
      <td>8 </td>
      <td>01/05/2023</td>
      <td>07/05/2023</td>
      <td> 
              <ol type="i" start="5">
              <li>אחת</li>
              <li>שתים</li>
              <li>שלוש</li>
              <li>ארבע</li>
              <li>
            <form>
            <input type="date" id="date" name="date" placeholder=" תאריך" required/>
            <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" required/>
            <input type="submit" value="עדכן סטטוס"/>
            </form>
          </li>
        </ol>
        </td>
        <td>
             <form>
             <input type="date" id="date" name="date" placeholder=" תאריך" required/>
            <input type="submit" value="סיום טיפול"/>
          </form>
         </td>
    </tr>
    <tr>
      <td>1</td>
      <td>1</td>
      <td> סיוע למשפחות</td>
      <td>גידור עצים</td>
      <td>8 </td>
      <td>01/05/2023</td>
      <td>07/05/2023</td>
      <td> 
              <ol type="i" start="5">
              <li>אחת</li>
              <li>שתים</li>
              <li>שלוש</li>
              <li>ארבע</li>
              <li>


             
              <> */}
      {/* Overlay */}
      {/* {isFormOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={toggleForm}
        ></div>
      )} */}

      {/* Form */}
      {/* {isFormOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
            zIndex: 2,
          }}
          onClick={(event) => event.stopPropagation()}
        > */}
          {/* <form>
            הכנס תאריך סיום טיפול
          <input type="date" id="date" name="date" placeholder=" תאריך" required/>
            {/* <input type="submit" value="סיום טיפול"/> */}
            {/* <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required/> */}
            {/* <button type="submit">שלח</button>
          </form> */}
        {/* </div> 
      )} */}

      {/* Button */}
      {/* <button onClick={toggleForm}>Open Form</button> */}
    {/* </> */}


            {/* <form>
            <input type="date" id="date" name="date" placeholder=" תאריך" required/>
            <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" required/>
            <input type="submit" value="עדכן סטטוס"/>
            </form> */}
          {/* </li>
        </ol>
        </td>
        <td>
             <form>
             <input type="date" id="date" name="date" placeholder=" תאריך" required/>
            <input type="submit" value="סיום טיפול"/>
          </form>
         </td>
    </tr> */}
    {/* <tr>
      <td>1</td>
      <td>1</td>
      <td> סיוע למשפחות</td>
      <td>גידור עצים</td>
      <td>8 </td>
      <td>01/05/2023</td>
      <td>07/05/2023</td>
      <td> 
              <ol type="i" start="5">
              <li>אחת</li>
              <li>שתים</li>
              <li>שלוש</li>
              <li>ארבע</li>
              <li>
            <form>
            <input type="date" id="date" name="date" placeholder=" תאריך" required/>
            <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" required/>
            <input type="submit" value="עדכן סטטוס"/>
            </form>
          </li>
        </ol>
        </td>
        <td>
             <form>
             <input type="date" id="date" name="date" placeholder=" תאריך" required/>
            <input type="submit" value="סיום טיפול"/>
          </form>
         </td>
    </tr> */}




    
// const getUsers = async () => {
//   try {
//     const usersSnapshot = await getDocs(collection(db, 'users'));
//     const users = usersSnapshot.docs.map((doc) => doc.data());
//     alert("returned users =", users);
//     return users;
//   } catch (err) {
//     console.error("getUsers: " + err);
//     alert(err.message);
//   }
// };

// Call the getUsers function
// const fetchUsers = async () => {
//   try {
//     const users = await getUsers();
//     console.log('Users:', users);
//     // Do something with the users data
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// };

// Call the fetchUsers function to fetch and process the users data
// fetchUsers();



// const GetVolunteerDetails = async ({email})=> {
//   // const [user, setUser] = useState([]);
//   // useEffect(() => {
//     // const fetchUser = async () => {
//       const docRef = doc1(db, "users", email)
//       const doc1 = await getDoc(docRef)
//       const data = doc1.data()
//       // Query messages for the specified user ID
//       // const q = query(userRef, where('id', '==', email));
//       // const querySnapshot = await getDoc(q);

//       // const fetcheduser = querySnapshot.docs.map((doc) => {
//       //   const data = doc.data();
//         return {
//           categiries: data.categories
//           // messageNum: data.id,
//           // taskCategory: data.task_category,
//           // taskDescription: data.task_description,
//           // numOfPersons: data.num_of_people,
//           // productionDate: data.production_date,
//         //  id:doc.id,...data

//         // };
//       // });
//       // setMessages(fetchedMessages);
//     };

// //     fetchMessages();
// //   }, [db, taskCategories]);
// //   try {
// //     await signInWithEmailAndPassword(auth, email, password);
// //     const docRef = doc1(db, "users", email)
// //     const doc1 = await getDoc(docRef)
// //     const data = doc1.data()
// //     // await userDoc
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// };





// const MessageList = ({ taskCategories }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const messagesRef = collection(db, 'requests');

//       // Query messages for the specified user ID
//       const q = query(messagesRef, 
//         where('request_category', 'in', taskCategories),
//         where('type_of_request', '==', "הודעה חדשה"));
//       const querySnapshot = await getDocs(q);

//       const fetchedMessages = querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           // messageNum: data.id,
//           // taskCategory: data.task_category,
//           // taskDescription: data.task_description,
//           // numOfPersons: data.num_of_people,
//           // productionDate: data.production_date,
//          id:doc.id,...data

//         };
//       });
//       setMessages(fetchedMessages);
//     };

//     fetchMessages();
//   }, [db, taskCategories]);

//   return (
//     <div>
//       <h2>Messages for User ID: {taskCategories}</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Message Number</th>
//             <th>Task Category</th>
//             <th>Task Description</th>
//             <th>Number of Persons</th>
//             {/* <th>Production Date</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((message) => (
//             <tr key={message.id}>
//               <td>{message.id}</td>
//               <td>{message.request_category}</td>
//               <td>{message.request_description}</td>
//               <td>{message.num_of_people}</td>
//               {/* <td>{message.production_date}</td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };























// const getUsers =  () => {
//   // try {
//     const users= getDocs(collection(db,'users/')) ;
//     // alert("returned users =", users)
//     return users ;
//   // }
//   // catch (err) {
//   //   console.error("getUsers:"+err);
//   //   alert(err.message);
//   // } 
// }


// const MessageList = ({ taskCategory }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const messagesRef = collection(db, 'requests');

//       // Query messages for the specified user ID
//       const q = query(messagesRef, where('request_category', '==', taskCategory));
//       const querySnapshot = await getDocs(q);

//       const fetchedMessages = querySnapshot.docs.map((doc) =>{
//         const data = doc.data()
//         return{id:doc.id,...data}
//       } );
//       setMessages(fetchedMessages);
//     };

//     fetchMessages();
//   }, [db,taskCategory]);

//   return (
//     <div>
//       <h2>Messages for User ID: {taskCategory}</h2>
//       <ul>
//         {messages.map((message) => (
          
//           <li key={message.id}>{message.id+" "+message.num_of_people}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MessageList;




// const MessageList = ({ taskCategory }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const messagesRef = collection(db, 'requests');

//       // Query messages for the specified user ID
//       const q = query(messagesRef, 
//         where('request_category', '==', taskCategory),
//         where('type_of_request', '==', "הודעה חדשה"));
//       const querySnapshot = await getDocs(q);

//       const fetchedMessages = querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           // messageNum: data.id,
//           // taskCategory: data.task_category,
//           // taskDescription: data.task_description,
//           // numOfPersons: data.num_of_people,
//           // productionDate: data.production_date,
//          id:doc.id,...data

//         };
//       });
//       setMessages(fetchedMessages);
//     };

//     fetchMessages();
//   }, [db, taskCategory]);

//   return (
//     <div>
//       {/* <h2>Messages for User ID: {taskCategory}</h2> */}
//       <table>
//         <thead>
//           <tr>
//             <th>אישור על זמינות</th>
//             <th>Message Number</th>
//             <th>Task Category</th>
//             <th>Task Description</th>
//             <th>Number of Persons</th>
//             {/* <th>Production Date</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((message) => (
//             <tr key={message.id}>
//               <td>
//             <>
//             {/* Overlay */}
//             {isFormOpenAvailable && (
//               <div
//                 style={{
//                   position: "fixed",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   backgroundColor: "rgba(0, 0, 0, 0.5)",
//                   zIndex: 1,
//                 }}
//                 onClick={toggleFormAvailable}
//               ></div>
//             )}

//             {/* Form */}
//             {isFormOpenAvailable && (
//               <div
//                 style={{
//                   position: "fixed",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   width: "400px",
//                   height: "400px",
//                   backgroundColor: "#fff",
//                   borderRadius: "10px",
//                   padding: "20px",
//                   boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
//                   zIndex: 2,
//                 }}
//                 onClick={(event) => event.stopPropagation()}
//                 >
//                 <form>
//                   ?האם את/ה בטוח/ה מעוניינ/ת באישור זמינות
//                   <button type="submit">כן</button>
//                 </form>
//               </div>
//             )}

//             {/* Button */}
//             <button onClick={toggleFormAvailable}>אישור זמינות</button>
//       </>
//           </td> 
//               <td>{message.id}</td>
//               <td>{message.request_category}</td>
//               <td>{message.request_description}</td>
//               <td>{message.num_of_people}</td>
//               {/* <td>{message.production_date}</td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };




// function ParentComponent(email) {
//   const fetchCategories = async () => {
//     try {
//       const volunteerData = await <GetVolunteerDetails email="eliedaat@gmail.com" />; // Wait for the Promise to resolve
//       const categories = volunteerData.categories; // Assuming the categories array is present in the volunteer data
//       return categories;
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       return []; // Return an empty array or handle the error case as needed
//     }
//   };

//   return <MessageList taskCategories={fetchCategories()} />;
// }

// function ParentComponent() {
//   const [taskCategories, setTaskCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const volunteerData = await <GetVolunteerDetails email="eliedaat@gmail.com" />;
//         const categories = volunteerData.categories;
//         setTaskCategories(categories);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         setTaskCategories([]); // Handle the error case by setting an empty array or appropriate fallback value
//       }
//     };

//     fetchCategories();
//   }, []);

//   return <MessageList taskCategories={taskCategories} />;
// }






// <div id="tasksMessages">
//       <h2>הודעות חדשות</h2>
//       <MessageList taskCategory={cats} />

//       <div className="search-bar">
//         <label for="search-input">חיפוש:</label>
//         <input type="text" id="search-input" onKeyUp={searchTable} placeholder="הקלד כאן..."/>
//         <button type="button" onClick={searchTable} >חפש</button>
//       </div>
      
//       <div style={{ display: "flex", flexDirection: "column" }}>
//       <>
//       {/* Arrow */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "50px",
//           height: "50px",
//           backgroundColor: "#ddd",
//           borderRadius: "50%",
//           cursor: "pointer",
//           marginRight: "20px",
//           position: "relative", 
//         }}
//         onClick={toggleTable1}
//       >
//         {isTable1Open ? <span>&#x25BC;</span> : <span>&#x25B6;</span>}
//       </div>

//       {/* Text */}
//       <div>{isTable1Open ? "הסתר הודעות חדשות" : "הצג הודעות חדשות"}</div>

//       {/* Table */}
//       {isTable1Open && (
//       <table id="tasks">
//         <thead>
//           <tr>
//             <th>אישור על זמינות</th>
//             <th>מספר נפשות</th>
//             <th>תיאור משימה</th>
//             <th>קטגורית משימה</th>
//             <th>תאריך יצירה</th>
//             <th>מספר הודעה</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasksMessages.map((tm) => (<tr> 
//             <td>




//             <>
//             {/* Overlay */}
//             {/* {isFormOpenAvailable && (
//               <div
//                 style={{
//                   position: "fixed",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   backgroundColor: "rgba(0, 0, 0, 0.5)",
//                   zIndex: 1,
//                 }}
//                 onClick={toggleFormAvailable}
//               ></div>
//             )} */}

//             {/* Form */}
//             {/* {isFormOpenAvailable && (
//               <div
//                 style={{
//                   position: "fixed",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   width: "400px",
//                   height: "400px",
//                   backgroundColor: "#fff",
//                   borderRadius: "10px",
//                   padding: "20px",
//                   boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
//                   zIndex: 2,
//                 }}
//                 onClick={(event) => event.stopPropagation()}
//                 >
//                 <form>
//                   ?האם את/ה בטוח/ה מעוניינ/ת באישור זמינות
//                   <button type="submit">כן</button>
//                 </form>
//               </div>
//             )} */}

//             {/* Button */}
//             {/* <button onClick={toggleFormAvailable}>אישור זמינות</button> */}
//       </>



      
//           </td> 
          
//           <td>{tm.numOfPersons}</td> 
//           <td>{tm.taskDescription}</td>
//           <td>{tm.taskCategory}</td>
//           <td>{tm.productionDate}</td>
//           <td>{tm.messageNum}</td></tr>))}
//         </tbody>
//       </table>
//       )}
      
//       </>
//       </div>
      // </div>
















      // <td>
      //         <>
      //         {/* Overlay */}
      //         {isFormOpenAvailable && (
      //           <div
      //             style={{
      //               position: "fixed",
      //               top: 0,
      //               left: 0,
      //               width: "100%",
      //               height: "100%",
      //               backgroundColor: "rgba(0, 0, 0, 0.5)",
      //               zIndex: 1,
      //             }}
      //             onClick={() => toggleFormAvailable} // Pass it as a callback
      //             ></div>
      //         )}
  
      //         {/* Form */}
      //         {isFormOpenAvailable && (
      //           <div
      //             style={{
      //               position: "fixed",
      //               top: "50%",
      //               left: "50%",
      //               transform: "translate(-50%, -50%)",
      //               width: "400px",
      //               height: "400px",
      //               backgroundColor: "#fff",
      //               borderRadius: "10px",
      //               padding: "20px",
      //               boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
      //               zIndex: 2,
      //             }}
      //             onClick={(event) => event.stopPropagation()}
      //             >
      //               {/* onSubmit={handleFormSubmit} */}
      //             <form>
      //               ?האם את/ה בטוח/ה מעוניינ/ת באישור זמינות
      //               <button type="submit" onClick={() => toggleFormAvailable}>כן</button> {/* Pass it as a callback */}


      //             </form>
      //           </div>
      //         )}
  
      //         {/* Button */}
      //         <button onClick={() => toggleFormAvailable}>אישור זמינות</button>
      //   </>
      //       </td> 





//       <div style={{ display: "flex", flexDirection: "column" }}>
//       <>
//       {/* Arrow */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "50px",
//           height: "50px",
//           backgroundColor: "#ddd",
//           borderRadius: "50%",
//           cursor: "pointer",
//           marginRight: "20px",
//           position: "relative",
//         }}
//         onClick={toggleTable2}
//       >
//         {isTable2Open ? <span>&#x25BC;</span> : <span>&#x25B6;</span>}
//       </div>

//       {/* Text */}
//       <div>{isTable2Open ? "הסתר פניות בטיפול" : "הצג פניות בטיפול"}</div>

//       {/* Table */}
//       {isTable2Open && (<table id="tasks">
//   <thead>
//     <tr>
//     <th>סיום טיפול</th>

//     <th>עדכוני סטטוס</th>

//     <th>מספר נפשות</th>

//     <th>תיאור משימה</th>

//     <th>קטגורית משימה</th>

//     <th>תאריך יצירה</th>

//     <th>מספר פניה</th>

//       <th>מספר אירוע</th>
//       {/* <th>תאריך יעד</th> */}
//     </tr>
//   </thead>
//   <tbody>


//   {tasksTake.map((tt) => (<tr>
//     <td>

//     <>
//       {/* Overlay */}
//       {isFormOpenFinish && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 1,
//           }}
//           onClick={toggleFormFinish}
//         ></div>
//       )}

//       {/* Form */}
//       {isFormOpenFinish && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "400px",
//             height: "400px",
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             padding: "20px",
//             boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
//             zIndex: 2,
//           }}
//           onClick={(event) => event.stopPropagation()}
//         >
//           <form>
//             יש להכניס תאריך סיום טיפול
//             <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//             <button type="submit" onClick={toggleFormFinish}>שלח</button>
//           </form>
//         </div>
//       )}

//       {/* Button */}
//       <button onClick={toggleFormFinish}>דיווח על סיום טיפול</button>
//     </>
//          </td>
    
//     <td> 


//     <>
//       {/* Overlay */}
//       {isFormOpenStatus && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 1,
//           }}
//           onClick={toggleFormStatus}
//         ></div>
//       )}

//       {/* Form */}
//       {isFormOpenStatus && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "400px",
//             height: "400px",
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             padding: "20px",
//             boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
//             zIndex: 2,
//           }}
//           onClick={(event) => event.stopPropagation()}
//         >
//           <form>
//           :עדכונים קודמים בפניה זו
//           <ol type="i" start="5">
//               <li>אחת</li>
//               <li>שתים</li>
//               <li>שלוש</li>
//               <li>ארבע</li>
              
//         </ol>
//             <input type="date" id="date" name="date" placeholder=" תאריך" required/>
//             <input type="text" id="status" name="status" placeholder="הכנס כאן עדכון חדש" required/>
//             <button type="submit" onClick={toggleFormStatus}>עדכן סטטוס</button>
//           </form>
//         </div>
//       )}

//       {/* Button */}
//       <button onClick={toggleFormStatus}>עדכון סטטוס</button>
//     </>

//         </td>
//             <td>{tt.numOfPersons}</td> 
//             <td>{tt.taskDescription}</td>
//             <td>{tt.taskCategory}</td>
//             <td>{tt.productionDate}</td>
//             <td>{tt.taskNum}</td>
//             <td>{tt.eventNum}</td></tr>))}



//   </tbody>
// </table>


//       )}


// </>
// </div>

     

{/* <div style={{ display: "flex", flexDirection: "column" }}>
      <> */}
      {/* Arrow */}
      // <div
      //   style={{
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     width: "50px",
      //     height: "50px",
      //     backgroundColor: "#ddd",
      //     borderRadius: "50%",
      //     cursor: "pointer",
      //     marginRight: "20px",
      //     position: "relative",

          
      //   }}
      //   onClick={toggleTable3}
      // >


        
      //   {isTable3Open ? <span>&#x25BC;</span> : <span>&#x25B6;</span>}
      // </div>


      {/* Text */}
      // <div>{isTable3Open ? "הסתר פניות שטופלו" : "הצג פניות שטופלו"}</div>

      {/* Table */}
//       {isTable3Open && (<table id="tasks">
//   <thead>
//     <tr>
//             <th>מספר נפשות</th>
//             <th>תיאור משימה</th>
//             <th>קטגורית משימה</th>
//             <th>תאריך יצירה</th>
//       <th>מספר פניה</th>
//       <th>מספר אירוע</th>

      
//     </tr>
//   </thead>
//   <tbody>
//   {tasksTaken.map((ttn) => (<tr> 
//             <td>{ttn.numOfPersons}</td> 
//             <td>{ttn.taskDescription}</td>

//             <td>{ttn.taskCategory}</td>
//             <td>{ttn.productionDate}</td>
//             <td>{ttn.taskNum}</td>
//             <td>{ttn.eventNum}</td></tr>))}
          
   
//   </tbody>
// </table>
//       )}
//       </>
// </div>
// var tasksMessages = [{ "messageNum":2,"taskCategory":"kjmk","taskDescription":"bb","numOfPersons":9,"productionDate":"knkn"},
// { "messageNum":3,"taskCategory":"kjmk","taskDescription":"bb","numOfPersons":9,"productionDate":"knkn"}]


// var tasksTake = [{ "taskNum":2, "eventNum":2,"taskCategory":"kjmk","taskDescription":"bb","numOfPersons":9,"productionDate":"knkn"},
// { "taskNum":44, "eventNum":3,"taskCategory":"kjmk","taskDescription":"bb","numOfPersons":9,"productionDate":"knkn"}]


// var tasksTaken = [{ "taskNum":3, "eventNum":2,"taskCategory":"kjmk","taskDescription":"bb","numOfPersons":9,"productionDate":"knkn"},
// { "taskNum":4, "eventNum":3,"taskCategory":"kjmk","taskDescription":"bb","numOfPersons":9,"productionDate":"knkn"}]


// var statuses = [{"status": "frcccccccc"}, {"status": "jbkkkkkkkkkk"}]



// function openForm(event) {
//   event.preventDefault();
//   document.getElementById("update-form").style.display = "block";
// }


// function closeForm() {
//   document.getElementById("update-form").style.display = "none";
// }


// function UpdateButton() {
//   return (
//     <button onClick={openForm}>עדכן פרטים</button>
//   );
// }


// function  UpdateTask(props){
//   return(
//     <h1>
//       Update {props.id}
//     </h1>
//   )
// }



// const [isTable1Open, setIsTable1Open] = useState(false);
//   const toggleTable1 = () => {
//     setIsTable1Open(!isTable1Open);
//   };

//   const [isTable2Open, setIsTable2Open] = useState(false);
//   const toggleTable2 = () => {
//     setIsTable2Open(!isTable2Open);
//   };

//   const [isTable3Open, setIsTable3Open] = useState(false);
//   const toggleTable3 = () => {
//     setIsTable3Open(!isTable3Open);
//   };