// // import React from "react";
// // function Manager() {
// //     return (
// //         <h2>manager page</h2>
// //         );
// //   }
// //   export default Manager;







  
// import React, { useState } from "react";
// //import React from "react";
// import './manager.css'
// //import {Link} from 'react-router-dom'
// import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';




// function Manager() {
//     const [showSmallWindow1, setShowSmallWindow1] = useState(false);
//     const [showSmallWindow2, setShowSmallWindow2] = useState(false);
//     const [showSmallWindow3, setShowSmallWindow3] = useState(false);
//     const [showSmallWindow4, setShowSmallWindow4] = useState(false);
//     const [selectedDateNewReq, setSelectedDateNewReq] = useState('');
//     const [selectedDateNewReqEv, setSelectedDateNewReqEv] = useState('');
//     const [selectedDateNewEvent, setSelectedDateNewEvent] = useState('');
//     const [selectedDateReportFrom, setSelectedDateReportFrom] = useState('');
//     const [selectedDateReportUntil, setSelectedDateReportUntil] = useState('');

  


//     const [buttonColor, setButtonColor] = useState("#e0e0e0");
//     const [selectedOption1, setSelectedOptionKategoryNewReq] = useState('');
//     const [selectedOption2, setSelectedOptionTatKategoryNewReq] = useState('');
//     const [selectedOption3, setSelectedOptionKategoryNewEv] = useState('');
//     const [selectedOption4, setSelectedOptionTatKategoryNewEv] = useState('');
//     const [selectedOption5, setSelectedOptionKategoryReport] = useState('');
    
    
//     const [expanded1, setExpanded1] = useState(false);
//     const [text1, setText1] = useState('');

//     const [expanded2, setExpanded2] = useState(false);
//     const [text2, setText2] = useState('');

//     const [expanded3, setExpanded3] = useState(false);
//     const [text3, setText3] = useState('');

//     const [expanded4, setExpanded4] = useState(false);
//     const [text4, setText4] = useState('');

//     const [expanded, setExpandedTableContentReq] = useState(false);
    
//     const [expandedReqTaken, setExpandedTableContentReqTaken] = useState(false);
//     const [expandedReqWait, setExpandedTableContentReqWait] = useState(false);


//     //head buttons
//     const handleClickNewVol = () => {
//         setButtonColor("blue");
//         setShowSmallWindow1(true);
//         setTimeout(() => setButtonColor("#e0e0e0"), 200);
        
//     };
//     const handleCloseSmallWindowVol = () => {
//         setShowSmallWindow1(false);
//     };


//     const handleClickBook = () => {
//         setButtonColor("blue");
//         window.location.href = './contact';
//     };
  



//     //new request-window
//     const handleClickNewReq = () => {
//         setButtonColor("blue");
//         setShowSmallWindow2(true);
//         setTimeout(() => setButtonColor("#e0e0e0"), 200);
        
//     };
//     const handleCloseSmallWindowNewReq = () => {
//         setShowSmallWindow2(false);
//     };
//     const handleDateChangeNewReq = (event) => {
//         setSelectedDateNewReq(event.target.value);
//     };
//     const handleMenuChangeKategoryNewReq = (event) => {
//         setSelectedOptionKategoryNewReq(event.target.value);
//     };
//     const handleMenuChangeTatKategoryNewReq = (event) => {
//         setSelectedOptionTatKategoryNewReq(event.target.value);
//     };
//     //add new request to event-window
//     const handleClickAddReqToEven = () => {
//         setButtonColor("blue");
//         setShowSmallWindow3(true);
//         setTimeout(() => setButtonColor("#e0e0e0"), 200);
        
//     };
//     const handleCloseSmallWindowAddReqToEven = () => {
//         setShowSmallWindow3(false);
//     };
//     const handleDateChangeNewReqEv = (event) => {
//         setSelectedDateNewReqEv(event.target.value);
//       };
//     //new event-window
//     const handleClickNewEvent = () => {
//         setButtonColor("blue");
//         setShowSmallWindow4(true);
//         setTimeout(() => setButtonColor("#e0e0e0"), 200);
        
//     };
//     const handleCloseSmallWindowNewEvent  = () => {
//         setShowSmallWindow4(false);
//     };
    
//     const handleDateChangeNewEvent = (event) => {
//         setSelectedDateNewEvent(event.target.value);
//       };
//     const handleMenuChangeKategoryNewEv = (event) => {
//         setSelectedOptionKategoryNewEv(event.target.value);
//     };
//     const handleMenuChangeTatKategoryNewEv = (event) => {
//         setSelectedOptionTatKategoryNewEv(event.target.value);
//     };



//     //arrow 1-פניות בטיפול
//     const handleArrowClick1 = () => {
//         setExpanded1(!expanded1);
//         if (expanded1) {
//           // Perform any necessary actions when closing the expanded area
//         }
//       };
//     const handleInputChange1 = (e) => {
//       setText1(text1+e.target.value);
//     }

//     const handleTableContentReq = () => {
//         setExpandedTableContentReq(!expanded);
//     };

//      //arrow 2-פניות שטופלו
//      const handleArrowClick2 = () => {
//         setExpanded2(!expanded2);
//         if (expanded2) {
//           // Perform any necessary actions when closing the expanded area
//         }
//       };
//     const handleInputChange2 = (e) => {
//       setText2(text2+e.target.value);
//     };
//     const handleTableContentReqTaken = () => {
//         setExpandedTableContentReqTaken(!expandedReqTaken);
//     };
   

//      //arrow 3-פניות בהמתנה לשיבוץ
//      const handleArrowClick3 = () => {
//         setExpanded3(!expanded3);
//         if (expanded3) {
//           // Perform any necessary actions when closing the expanded area
//         }
//       };
//     const handleInputChange3 = (e) => {
//       setText3(text3+e.target.value);
//     };
//     const handleTableContentReqWait = () => {
//         setExpandedTableContentReqWait(!expandedReqWait);
//     };
    
//     const handleClickTableReqWaitToOkay = () => {
       
//     };
  

//      //arrow 4-דוחות
//     const handleArrowClick4 = () => {
//         setExpanded4(!expanded4);
//         if (expanded4) {
//           // Perform any necessary actions when closing the expanded area
//         }
//       };
//     const handleInputChange4 = (e) => {
//       setText4(e.target.value);
//     };
//     const handleDateChangeReportFrom= (event) => {
//         setSelectedDateReportFrom(event.target.value);
//     };
//     const handleDateChangeReportUntil = (event) => {
//         setSelectedDateReportUntil(event.target.value);
//     };
//     const handleMenuChangeKategoryReport = (event) => {
//         setSelectedOptionKategoryReport(event.target.value);
//     };
//     const handleDownloadReport = () => {
//         const element = document.createElement('a');
//         const file = new Blob([], { type: 'text/plain' });
//         element.href = URL.createObjectURL(file);
//         element.download = 'empty.txt';
//         document.body.appendChild(element);
//         element.click();
//         document.body.removeChild(element);
//       };
  




    
    

   


    
    
//     return (
//     <body dir style={{right: 'inherit'}}>
//         <div id="header">
//             <h1>איזור אישי למנהל</h1>
//         </div>

//         <div id="upButton">
//             <button  className="button" onClick={handleClickNewVol}>הוסף מתנדב חדש</button>
//             {showSmallWindow1 && (
//                 <div
//                 style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     backgroundColor: "white",
//                     width: "600px",
//                     height: "600px",
//                     boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.25)",
//                     zIndex: "999",
//                 }}
//                 >
//                 <div>
//                     <h2 id="detailVolunteer">  הכנסת נתוני המתנדב:</h2>
//                     <div id="detailVolunteer">
//                         <label>שם:</label>
//                         <input type="text" required/>
//                     </div>
//                     <div id="detailVolunteer">
//                         <label>ת.ז:</label>
//                         <input type="identyfy" required/>
//                     </div>
//                     <div id="detailVolunteer">
//                         <label>פלאפון:</label>
//                         <input type="tel" required/>
//                     </div>
//                     <div id="detailVolunteer">
//                         <label>מייל:</label>
//                         <input type="email" required/>
//                     </div>
//                     <div id="detailVolunteer">
//                         <label>קטגוריה:</label>
//                         <input type="text" required/>
//                     </div>
//                 </div>
//                 <button id="buttonOkay" onClick={handleCloseSmallWindowVol}>בצע</button>
//             </div>)}
//             <button  className="button" onClick={handleClickBook}>ספר פלאפונים</button>
//         </div>
        


//         <div id="requestButton">
//             <button id = "btnDown" className="button" onClick={handleClickNewReq}>  פנייה חדשה</button>
//             {showSmallWindow2 && (
//                 <div
//                 style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     backgroundColor: "white",
//                     width: "800px",
//                     height: "1100px",
//                     marginTop:"400px",
//                     marginBottom:"50px",
//                     boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.25)",
//                     zIndex: "999",
//                 }}
//                 >
//                 <div>
                   
//                     <div className="menu">
//                         <h1>  ביצוע פנייה חדשה</h1>
//                         <select class="inputAndOptionInNewReq" value={selectedOption1} onChange={handleMenuChangeKategoryNewReq}>
//                                 <option  value="קטגוריה">קטגוריה </option>
//                                 <option value="option1">סיוע לחולים</option>
//                                 <option value="option2">עזרה בבית</option>
//                                 <option value="option3">הסעות</option>
                            
//                         </select>
//                         <select class="inputAndOptionInNewReq" value={selectedOption2} onChange={handleMenuChangeTatKategoryNewReq}>
//                                 <option value="תת קטגוריה">תת קטגוריה</option>
//                                 <option value="option1">סיוע לחולים</option>
//                                 <option value="option2">עזרה בבית</option>
//                                 <option value="option3">הסעות</option>
                            
//                         </select>
                        
//                         <fieldset>
//                             <legend><h2> פרטי פנייה </h2></legend>
//                             <div id="detailReq">
//                                 <label> :שם האירוע</label>
//                                 <input type="text" required/>
//                             </div>
                            
//                             <div id="detailReq">
//                                 <label>:תאריך פנייה </label>
//                                 <input type="date" value={selectedDateNewReq} onChange={handleDateChangeNewReq} />
//                             </div>
//                             <div id="detailReq">
//                                 <label> :תוכן הפנייה</label>
//                                 <input type="text" required/>
//                             </div>
//                             <div id="detailReq">
//                                  <label> :מספר נפשות</label>
//                                 <input type="text" required/>
//                             </div>
//                         </fieldset>

//                         <fieldset>
//                             <legend><h2> פרטי מקבלי סיוע</h2></legend>
//                             <div id="detailFamily">
//                                 <label>:שם</label>
//                                 <input type="text" required/>
//                             </div>
//                             <div id="detailFamily">
//                                 <label>:משפחה</label>
//                                 <input type="text" required/>
//                             </div>
//                             <div id="detailFamily">
//                                 <label>:פלאפון</label>
//                                 <input type="text" required/>
//                             </div>
//                             <div id="detailFamily">
//                                 <label>:כתובת</label>
//                                 <input type="text" required/>
//                             </div>
//                         </fieldset>      
//                     </div>  
//                 </div>
//                 <button  id="buttonOkay" onClick={handleCloseSmallWindowNewReq}>בצע</button>
//             </div>)}

//             <button id = "btnDown" className="button" onClick={handleClickAddReqToEven}>הוספת פנייה לאירוע קיים</button>
//             {showSmallWindow3 && (
//                 <div
//                 style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     backgroundColor: "white",
//                     width: "800px",
//                     height: "550px",
//                     marginTop:"100px",
//                     marginBottom:"20px",
//                     boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.25)",
//                     zIndex: "999",
//                 }}
//                 >
//                 <div>
                   
//                    <div className="menu">
//                        <h1>  ביצוע פנייה לאירוע קיים</h1>                
//                        <fieldset>
//                            <legend><h2> פרטי פנייה </h2></legend>
//                            <div id="detailReq">
//                                <label> :שם האירוע</label>
//                                <input type="text" required/>
//                            </div>
                           
//                            <div id="detailReq">
//                                <label>:תאריך פנייה </label>
//                                <input type="date" value={selectedDateNewReqEv} onChange={handleDateChangeNewReqEv} />
//                            </div>
//                            <div id="detailReq">
//                                <label> :תוכן הפנייה</label>
//                                <input type="text" required/>
//                            </div>
//                        </fieldset>

//                    </div>  
//                </div>
//                 <button id="buttonOkay" onClick={handleCloseSmallWindowAddReqToEven}>בצע</button>
//             </div>)}
            
//             <button id = "btnDown" className="button" onClick={handleClickNewEvent}>אירוע חדש</button>
//             {showSmallWindow4 && (
//                 <div
//                 style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     backgroundColor: "white",
//                     width: "800px",
//                     height: "1100px",
//                     marginTop:"400px",
//                     marginBottom:"50px",
//                     boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.25)",
//                     zIndex: "999",
//                 }}
//                 >
//                 <div>
                   
//                    <div className="menu">
//                        <h1>   ביצוע אירוע חדש</h1>
//                        <select class="inputAndOptionInNewReq" value={selectedOption3} onChange={handleMenuChangeKategoryNewEv}>
//                                <option  value="קטגוריה">קטגוריה </option>
//                                <option value="option1">סיוע לחולים</option>
//                                <option value="option2">עזרה בבית</option>
//                                <option value="option3">הסעות</option>
                           
//                        </select>
//                        <select class="inputAndOptionInNewReq" value={selectedOption4} onChange={handleMenuChangeTatKategoryNewEv}>
//                                <option value="תת קטגוריה">תת קטגוריה</option>
//                                <option value="option1">סיוע לחולים</option>
//                                <option value="option2">עזרה בבית</option>
//                                <option value="option3">הסעות</option>
                           
//                        </select>
                       
//                        <fieldset>
//                            <legend><h2> פרטי פנייה </h2></legend>
//                            <div id="detailReq">
//                                <label> :שם האירוע</label>
//                                <input type="text" required/>
//                            </div>
                           
//                            <div id="detailReq">
//                                <label>:תאריך פנייה </label>
//                                <input type="date" value={selectedDateNewEvent} onChange={handleDateChangeNewEvent} />
//                            </div>
//                            <div id="detailReq">
//                                <label> :תוכן הפנייה</label>
//                                <input type="text" required/>
//                            </div>
//                            <div id="detailReq">
//                                 <label> :מספר נפשות</label>
//                                <input type="text" required/>
//                            </div>
//                        </fieldset>

//                        <fieldset>
//                            <legend><h2> :פרטי מקבלי סיוע</h2></legend>
//                            <div id="detailFamily">
//                                <label>:שם</label>
//                                <input type="text" required/>
//                            </div>
//                            <div id="detailFamily">
//                                <label>:משפחה</label>
//                                <input type="text" required/>
//                            </div>
//                            <div id="detailFamily">
//                                <label>:פלאפון</label>
//                                <input type="text" required/>
//                            </div>
//                            <div id="detailFamily">
//                                <label>:כתובת</label>
//                                <input type="text" required/>
//                            </div>
//                        </fieldset>      
//                    </div>  
//                </div>
//                 <button id="buttonOkay" onClick={handleCloseSmallWindowNewEvent}>בצע</button>
//             </div>)}
           
           
//         </div>

        
        
//         <div id="AllArrow"> 
//             <div id="form1" className={`rectangle ${expanded1 ? 'expanded' : ''}`}>
//                 <div className="arrow" onClick={handleArrowClick1}></div>
//                 <h2 id="contentForm">פניות בטיפול</h2> 
               
//                     {expanded1 && (
//                              <div className="content">
//                                 <table id="tableForm1">
//                                     <thead>
//                                         <tr>                                       
//                                         <th>תוכן הפנייה</th>
//                                         <th>פלאפון המתנדב</th>
//                                         <th>שם מתנדב</th>
//                                         <th>מספר הפנייה</th>
//                                         <th>תאריך הפנייה</th>
//                                         <th>עידכונים</th>
//                                         <th>מספר אירוע</th>
//                                         </tr>
//                                     </thead>
//                                     <tr>  
//                                         <td> 
//                                             <div className="expandable-cell">
//                                                 <div
//                                                 className={`expand-icon ${expanded ? 'expanded' : ''}



import React, { useState,useEffect } from "react";
//import React from "react";
import './manager.css'
//import {Link} from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
//import {Link} from 'react-router-dom'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import {db} from '../../firebase_db'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

// const MessageList = ({taskCategory} ) => {
    
//     const [messages, setMessages] = useState([]);
    
//     useEffect(() => {
//       const fetchMessages = async () => {
//         const messagesRef = collection(db, 'requests');
//         console.log("1111")
//         // Query messages for the specified taskCategory
//         const q = query(messagesRef,
//           where('request_category', 'in', taskCategory),
//           where('type_of_request', '==', "הודעה חדשה"));
//         const querySnapshot = await getDocs(q);
//         const fetchedMessages = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//            id:doc.id,...data
//           };
//         });
//         setMessages(fetchedMessages);
//       };
//       fetchMessages();
//     }, [db, taskCategory]);
//     return (
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>אישור על זמינות</th>
//               <th>מספר אנשים</th>
//               <th>תיאור הפניה</th>
//               <th>קטגורית פניה</th>
//               <th>תאריך יצירה</th>
//               <th>מספר פניה</th>
//             </tr>
//           </thead>
//           <tbody>
//             {messages.map((message) => (
//               <tr key={message.id}>
//             <td>
//              <>
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
//                   overflow: "auto",  // Add overflow property for scrollability

//                 }}
//                 onClick={(event) => event.stopPropagation()}
//                 >
//                 <form onSubmit={() => handleAvailableFormSubmit(message.id)}>
//                   ?האם את/ה בטוח/ה מעוניינ/ת באישור זמינות
//                   <button type="submit">כן</button>
//                 </form>
//               </div>
//             )}



//             {/* Button */}
//             <button onClick={toggleFormAvailable}>אישור זמינות</button>
//       </>

//           </td> 

//                 <td>{message.num_of_people}</td>
//                 <td>{message.request_description}</td>
//                 <td>{message.request_category}</td>
//                 <td>{message.production_date instanceof Timestamp ? message.production_date.toDate().toLocaleString() : ''}</td>
//                 <td>{message.id}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };



function Manager() {
    const [showSmallWindow1, setShowSmallWindow1] = useState(false);
    const [showSmallWindow2, setShowSmallWindow2] = useState(false);
    const [showSmallWindow3, setShowSmallWindow3] = useState(false);
    const [showSmallWindow4, setShowSmallWindow4] = useState(false);
    const [selectedDateNewReq, setSelectedDateNewReq] = useState('');
    const [selectedDateNewReqEv, setSelectedDateNewReqEv] = useState('');
    const [selectedDateNewEvent, setSelectedDateNewEvent] = useState('');
    const [selectedDateReportFrom, setSelectedDateReportFrom] = useState('');
    const [selectedDateReportUntil, setSelectedDateReportUntil] = useState('');

  


    const [buttonColor, setButtonColor] = useState("#e0e0e0");
    const [selectedOption1, setSelectedOptionKategoryNewReq] = useState('');
    const [selectedOption2, setSelectedOptionTatKategoryNewReq] = useState('');
    const [selectedOption3, setSelectedOptionKategoryNewEv] = useState('');
    const [selectedOption4, setSelectedOptionTatKategoryNewEv] = useState('');
    const [selectedOption5, setSelectedOptionKategoryReport] = useState('');
    
    
    const [expanded1, setExpanded1] = useState(false);
    const [text1, setText1] = useState('');

    const [expanded2, setExpanded2] = useState(false);
    const [text2, setText2] = useState('');

    const [expanded3, setExpanded3] = useState(false);
    const [text3, setText3] = useState('');

    const [expanded4, setExpanded4] = useState(false);
    const [text4, setText4] = useState('');

    const [expanded, setExpandedTableContentReq] = useState(false);
    
    const [expandedReqTaken, setExpandedTableContentReqTaken] = useState(false);
    const [expandedReqWait, setExpandedTableContentReqWait] = useState(false);


    //head buttons
    const handleClickNewVol = () => {
        setButtonColor("blue");
        setShowSmallWindow1(true);
        setTimeout(() => setButtonColor("#e0e0e0"), 200);
        
    };
    const handleCloseSmallWindowVol = () => {
        setShowSmallWindow1(false);
    };


    const handleClickBook = () => {
        setButtonColor("blue");
        window.location.href = './contact';
    };
  



    //new request-window
    const handleClickNewReq = () => {
        setButtonColor("blue");
        setShowSmallWindow2(true);
        setTimeout(() => setButtonColor("#e0e0e0"), 200);
        
    };
    const handleCloseSmallWindowNewReq = () => {
        setShowSmallWindow2(false);
    };
    const handleDateChangeNewReq = (event) => {
        setSelectedDateNewReq(event.target.value);
    };
    const handleMenuChangeKategoryNewReq = (event) => {
        setSelectedOptionKategoryNewReq(event.target.value);
    };
    const handleMenuChangeTatKategoryNewReq = (event) => {
        setSelectedOptionTatKategoryNewReq(event.target.value);
    };
    //add new request to event-window
    const handleClickAddReqToEven = () => {
        setButtonColor("blue");
        setShowSmallWindow3(true);
        setTimeout(() => setButtonColor("#e0e0e0"), 200);
        
    };
    const handleCloseSmallWindowAddReqToEven = () => {
        setShowSmallWindow3(false);
    };
    const handleDateChangeNewReqEv = (event) => {
        setSelectedDateNewReqEv(event.target.value);
      };
    //new event-window
    const handleClickNewEvent = () => {
        setButtonColor("blue");
        setShowSmallWindow4(true);
        setTimeout(() => setButtonColor("#e0e0e0"), 200);
        
    };
    const handleCloseSmallWindowNewEvent  = () => {
        setShowSmallWindow4(false);
    };
    
    const handleDateChangeNewEvent = (event) => {
        setSelectedDateNewEvent(event.target.value);
      };
    const handleMenuChangeKategoryNewEv = (event) => {
        setSelectedOptionKategoryNewEv(event.target.value);
    };
    const handleMenuChangeTatKategoryNewEv = (event) => {
        setSelectedOptionTatKategoryNewEv(event.target.value);
    };



    //arrow 1-פניות בטיפול
    const handleArrowClick1 = () => {
        setExpanded1(!expanded1);
        if (expanded1) {
          // Perform any necessary actions when closing the expanded area
        }
      };
    const handleInputChange1 = (e) => {
      setText1(text1+e.target.value);
    }

    const handleTableContentReq = () => {
        setExpandedTableContentReq(!expanded);
    };

     //arrow 2-פניות שטופלו
     const handleArrowClick2 = () => {
        setExpanded2(!expanded2);
        if (expanded2) {
          // Perform any necessary actions when closing the expanded area
        }
      };
    const handleInputChange2 = (e) => {
      setText2(text2+e.target.value);
    };
    const handleTableContentReqTaken = () => {
        setExpandedTableContentReqTaken(!expandedReqTaken);
    };
   

     //arrow 3-פניות בהמתנה לשיבוץ
     const handleArrowClick3 = () => {
        setExpanded3(!expanded3);
        if (expanded3) {
          // Perform any necessary actions when closing the expanded area
        }
      };
    const handleInputChange3 = (e) => {
      setText3(text3+e.target.value);
    };
    const handleTableContentReqWait = () => {
        setExpandedTableContentReqWait(!expandedReqWait);
    };
    
    const handleClickTableReqWaitToOkay = () => {
       
    };
  

     //arrow 4-דוחות
    const handleArrowClick4 = () => {
        setExpanded4(!expanded4);
        if (expanded4) {
          // Perform any necessary actions when closing the expanded area
        }
      };
    const handleInputChange4 = (e) => {
      setText4(e.target.value);
    };
    const handleDateChangeReportFrom= (event) => {
        setSelectedDateReportFrom(event.target.value);
    };
    const handleDateChangeReportUntil = (event) => {
        setSelectedDateReportUntil(event.target.value);
    };
    const handleMenuChangeKategoryReport = (event) => {
        setSelectedOptionKategoryReport(event.target.value);
    };
    const handleDownloadReport = () => {
        const element = document.createElement('a');
        const file = new Blob([], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'empty.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      };
  

    
    return (
    <body style={{right: 'inherit'}}>
        <div id="header">
            <h1>איזור אישי למנהל</h1>
        </div>

        <div id="upButton">
            <button  className="button" onClick={handleClickNewVol}>הוסף מתנדב חדש</button>
            {showSmallWindow1 && (
                <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    width: "600px",
                    height: "600px",
                    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.25)",
                    zIndex: "999",
                }}
                >
                <div>
                    <h2 id="detailVolunteer">  הכנסת נתוני המתנדב:</h2>
                    <div id="detailVolunteer">
                        <label>שם:</label>
                        <input type="text" required/>
                    </div>
                    <div id="detailVolunteer">
                        <label>ת.ז:</label>
                        <input type="identyfy" required/>
                    </div>
                    <div id="detailVolunteer">
                        <label>פלאפון:</label>
                        <input type="tel" required/>
                    </div>
                    <div id="detailVolunteer">
                        <label>מייל:</label>
                        <input type="email" required/>
                    </div>
                    <div id="detailVolunteer">
                        <label>קטגוריה:</label>
                        <input type="text" required/>
                    </div>
                    <div id="detailVolunteer">
                        <label>כתובת:</label>
                        <input type="adress" required/>
                    </div>
                </div>
                <button id="buttonOkay" onClick={handleCloseSmallWindowVol}>בצע</button>
            </div>)}
            <button  className="button" /*onClick={() => setCurrentPage('contact')}*/onClick={handleClickBook}>ספר פלאפונים</button>
        </div>
        


        <div id="requestButton">
            <button id = "btnDown" className="button" onClick={handleClickNewReq}>  פנייה חדשה</button>
            {showSmallWindow2 && (
                <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    width: "800px",
                    height: "1100px",
                    marginTop:"400px",
                    marginBottom:"50px",
                    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.25)",
                    zIndex: "999",
                }}
                >
                <div>
                   
                    <div className="menu">
                        <h1>  ביצוע פנייה חדשה</h1>
                        <select class="inputAndOptionInNewReq" value={selectedOption1} onChange={handleMenuChangeKategoryNewReq}>
                                <option  value="קטגוריה">קטגוריה </option>
                                <option value="option1">סיוע לחולים</option>
                                <option value="option2">עזרה בבית</option>
                                <option value="option3">הסעות</option>
                            
                        </select>
                        <select class="inputAndOptionInNewReq" value={selectedOption2} onChange={handleMenuChangeTatKategoryNewReq}>
                                <option value="תת קטגוריה">תת קטגוריה</option>
                                <option value="option1">סיוע לחולים</option>
                                <option value="option2">עזרה בבית</option>
                                <option value="option3">הסעות</option>
                            
                        </select>
                        
                        <fieldset>
                            <legend><h2> פרטי פנייה </h2></legend>
                            <div id="detailReq">
                                <label> :שם האירוע</label>
                                <input type="text" required/>
                            </div>
                            
                            <div id="detailReq">
                                <label>:תאריך פנייה </label>
                                <input type="date" value={selectedDateNewReq} onChange={handleDateChangeNewReq} />
                            </div>
                            <div id="detailReq">
                                <label> :תוכן הפנייה</label>
                                <input type="text" required/>
                            </div>
                            <div id="detailReq">
                                 <label> :מספר נפשות</label>
                                <input type="text" required/>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend><h2> פרטי מקבלי סיוע</h2></legend>
                            <div id="detailFamily">
                                <label>:שם</label>
                                <input type="text" required/>
                            </div>
                            <div id="detailFamily">
                                <label>:משפחה</label>
                                <input type="text" required/>
                            </div>
                            <div id="detailFamily">
                                <label>:פלאפון</label>
                                <input type="text" required/>
                            </div>
                            <div id="detailFamily">
                                <label>:כתובת</label>
                                <input type="text" required/>
                            </div>
                        </fieldset>      
                    </div>  
                </div>
                <button  id="buttonOkay" onClick={handleCloseSmallWindowNewReq}>בצע</button>
            </div>)}

            <button id = "btnDown" className="button" onClick={handleClickAddReqToEven}>הוספת פנייה לאירוע קיים</button>
            {showSmallWindow3 && (
                <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    width: "800px",
                    height: "550px",
                    marginTop:"100px",
                    marginBottom:"20px",
                    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.25)",
                    zIndex: "999",
                }}
                >
                <div>
                   
                   <div className="menu">
                       <h1>  ביצוע פנייה לאירוע קיים</h1>                
                       <fieldset>
                           <legend><h2> פרטי פנייה </h2></legend>
                           <div id="detailReq">
                               <label> :שם האירוע</label>
                               <input type="text" required/>
                           </div>
                           
                           <div id="detailReq">
                               <label>:תאריך פנייה </label>
                               <input type="date" value={selectedDateNewReqEv} onChange={handleDateChangeNewReqEv} />
                           </div>
                           <div id="detailReq">
                               <label> :תוכן הפנייה</label>
                               <input type="text" required/>
                           </div>
                       </fieldset>

                   </div>  
               </div>
                <button id="buttonOkay" onClick={handleCloseSmallWindowAddReqToEven}>בצע</button>
            </div>)}
            
            <button id = "btnDown" className="button" onClick={handleClickNewEvent}>אירוע חדש</button>
            {showSmallWindow4 && (
                <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    width: "800px",
                    height: "1100px",
                    marginTop:"400px",
                    marginBottom:"50px",
                    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.25)",
                    zIndex: "999",
                }}
                >
                <div>
                   
                   <div className="menu">
                       <h1>   ביצוע אירוע חדש</h1>
                       <select class="inputAndOptionInNewReq" value={selectedOption3} onChange={handleMenuChangeKategoryNewEv}>
                               <option  value="קטגוריה">קטגוריה </option>
                               <option value="option1">סיוע לחולים</option>
                               <option value="option2">עזרה בבית</option>
                               <option value="option3">הסעות</option>
                           
                       </select>
                       <select class="inputAndOptionInNewReq" value={selectedOption4} onChange={handleMenuChangeTatKategoryNewEv}>
                               <option value="תת קטגוריה">תת קטגוריה</option>
                               <option value="option1">סיוע לחולים</option>
                               <option value="option2">עזרה בבית</option>
                               <option value="option3">הסעות</option>
                           
                       </select>
                       
                       <fieldset>
                           <legend><h2> פרטי פנייה </h2></legend>
                           <div id="detailReq">
                               <label> :שם האירוע</label>
                               <input type="text" required/>
                           </div>
                           
                           <div id="detailReq">
                               <label>:תאריך פנייה </label>
                               <input type="date" value={selectedDateNewEvent} onChange={handleDateChangeNewEvent} />
                           </div>
                           <div id="detailReq">
                               <label> :תוכן הפנייה</label>
                               <input type="text" required/>
                           </div>
                           <div id="detailReq">
                                <label> :מספר נפשות</label>
                               <input type="text" required/>
                           </div>
                       </fieldset>

                       <fieldset>
                           <legend><h2> :פרטי מקבלי סיוע</h2></legend>
                           <div id="detailFamily">
                               <label>:שם</label>
                               <input type="text" required/>
                           </div>
                           <div id="detailFamily">
                               <label>:משפחה</label>
                               <input type="text" required/>
                           </div>
                           <div id="detailFamily">
                               <label>:פלאפון</label>
                               <input type="text" required/>
                           </div>
                           <div id="detailFamily">
                               <label>:כתובת</label>
                               <input type="text" required/>
                           </div>
                       </fieldset>      
                   </div>  
               </div>
                <button id="buttonOkay" onClick={handleCloseSmallWindowNewEvent}>בצע</button>
            </div>)}
           
           
        </div>

        
        
        <div id="AllArrow"> 
            <div id="form1" className={`rectangle ${expanded1 ? 'expanded' : ''}`}>
                <div className="arrow" onClick={handleArrowClick1}></div>
                <h2 id="contentForm">פניות בטיפול</h2> 
               
                    {expanded1 && (
                             <div className="content">
                                <table id="tableForm1">
                                    <thead>
                                        <tr>                                       
                                        <th>תוכן הפנייה</th>
                                        <th>פלאפון המתנדב</th>
                                        <th>שם מתנדב</th>
                                        <th>מספר הפנייה</th>
                                        <th>תאריך הפנייה</th>
                                        <th>עידכונים</th>
                                        <th>מספר אירוע</th>
                                        </tr>
                                    </thead>
                                    <tr>  
                                        <td> 
                                            <div className="expandable-cell">
                                                <div
                                                className={`expand-icon ${expanded ? 'expanded' : ''}`}
                                                onClick={handleTableContentReq}
                                                >
                                                    <span id="icon">+</span>
                                                    <span className="icon-text">לחץ לפירוט</span>
                                                </div>
                                                {expanded && (
                                                <div className="expanded-content">
                                                    <p>Additional content goes here...</p>
                                                </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>789 </td>
                                        <td>0521234567</td>
                                        <td>יצחק כהן </td>
                                        <td>15/8/23</td>
                                        <td>נשלח הארוחה </td>
                                        <td>1 </td>
                                    </tr>
                                    {/* <tr>                                    
                                        <td>סיוע למשפחה...</td>
                                        <td>789 </td>
                                        <td>0521234567</td>
                                        <td>יצחק כהן </td>
                                        <td>15/8/23</td>
                                        <td>נשלח הארוחה </td>
                                        <td>2 </td>
                                    </tr> */}
                            
                                </table>
                            </div>     
                    )}                      
            </div>
            {expanded1 && <div className="empty-space" />}

            <div className={`push-down ${expanded1 ? 'open' : ''}`}>

                <div id="form" className={`rectangle ${expanded2 ? 'expanded' : ''}`}>
                    <div className="arrow" onClick={handleArrowClick2}></div>
                    <h2 id="contentForm">פניות שטופלו</h2>
                    <div className="content">
                        {expanded2 && (
                            <div>
                                <table id="tableForm1">
                                    <thead>
                                        <tr>                                       
                                        <th> תוכן הפנייה </th>
                                        <th>פלאפון המתנדב </th>
                                        <th>שם המתנדב</th>
                                        <th> מספר הפנייה</th>
                                        <th>תאריך סיום</th>
                                        <th>תאריך התחלה</th>
                                        <th>עידכונים</th>
                                        <th>מספר אירוע</th>
                                        </tr>
                                    </thead>

                                    <tr>  
                                        <td> 
                                            <div className="expandable-cell">
                                                <div
                                                className={`expand-icon ${expandedReqTaken ? 'expanded' : ''}`}
                                                onClick={handleTableContentReqTaken}
                                                >
                                                    <span id="icon">+</span>
                                                    <span className="icon-text">לחץ לפירוט</span>
                                                </div>
                                                {expandedReqTaken && (
                                                <div className="expanded-content">
                                                    <p>Additional content goes here...</p>
                                                </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>0521234567 </td>
                                        <td>יצחק כהן </td>
                                        <td>123</td>
                                        <td>15/9/23</td>
                                        <td>15/8/23</td>
                                        <td>נשלח הארוחה </td>
                                        <td>1 </td>
                                    </tr>

                                </table>
                            </div>             
                        )}
                    </div>
                        
                </div>
                {expanded2 && <div className="empty-space" />}

                <div className={`push-down ${expanded2 ? 'open' : ''}`}>
                    <div id="form" className={`rectangle ${expanded3 ? 'expanded' : ''}`}>
                        <div className="arrow" onClick={handleArrowClick3}></div>
                        <h2 id="contentForm">פניות בהמתנה לשיבוץ</h2>
                        <div className="content"> 
                            {expanded3 && (                       
                                <div>
                                    <table id="tableForm1">
                                        <thead>
                                            <tr>                                       
                                                <th> שליחת אישור למתנדב מסויים</th>
                                                <th> תוכן הפנייה</th>
                                                <th>תאריך הפנייה</th>
                                                <th> רשימת מתנדבים שאישרו</th>
                                                <th>מספר פנייה</th>
                                                <th>מספר אירוע</th>
                                            </tr>

                                            <tr>  
                                                <td> <button  onClick={handleClickTableReqWaitToOkay}>שליחה לאישור</button></td>
                                                <td>תוכן הפנייה</td>
                                                <td>15/9/23</td>
                                                <td> 
                                                    <div className="expandable-cell">
                                                        <div
                                                        className={`expand-icon ${expandedReqWait ? 'expanded' : ''}`}
                                                        onClick={handleTableContentReqWait}
                                                        >
                                                            <span id="icon">+</span>
                                                            <span className="icon-text"> צפה ברשימה</span>
                                                        </div>
                                                        {expandedReqWait && (
                                                        <div className="expanded-content">
                                                            <p>....</p>
                                                                {/* <div>                  
                                                                    <select class="inputAndOptionInReport" value={selectedOption5} onChange={handleMenuChangeKategoryReport}>
                                                                    <option  value="רשימת מתנדבים">רשימת מתנדבים </option>
                                                                    <option value="option1"> יהודה לוי</option>
                                                                    <option value="option2"> שירה כהן</option>
                                                                    <option value="option3">משה הלוי</option>                         
                                                                    </select>
                                                                </div> */}
                                                            
                                                        </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>345  </td>
                                                <td>1 </td>
                                            </tr>

                                        </thead>
                                    </table>
                                </div>                 
                            )}
                        </div>                           
                    </div>
                    {expanded3 && <div className="empty-space" />}
                </div>
            </div>


            <div className={`push-down ${expanded3 ? 'open' : ''}`}>
                <div id="form" className={`rectangle ${expanded4 ? 'expanded' : ''}`}>
                    <div className="arrow" onClick={handleArrowClick4}></div>
                    <h2 id="contentForm"> דוחות </h2>
                    <div className="content"> 
                        {expanded4 && ( 
                            <div>
                                <div>                  
                                    <select class="inputAndOptionInReport" value={selectedOption5} onChange={handleMenuChangeKategoryReport}>
                                    <option  value="קטגוריה">קטגוריה </option>
                                    <option value="option1">סיוע לחולים</option>
                                    <option value="option2">עזרה בבית</option>
                                    <option value="option3">הסעות</option>                         
                                    </select>
                                </div>
                                

                                <div id="reportInput">
                                    <div class="inputAndOptionInReport">
                                        <label>: מתאריך </label>
                                        <input type="date" value={selectedDateReportFrom} onChange={handleDateChangeReportFrom} />
                                    </div>

                                    <div class="inputAndOptionInReport">
                                        <label>: עד תאריך</label>
                                        <input type="date" value={selectedDateReportUntil} onChange={handleDateChangeReportUntil} />
                                    </div>
                                </div>
                                <button onClick={handleDownloadReport}>הפק דוח</button>

                            </div>
                        )} 
                    </div>                      
                </div>
            </div>
        </div>

    </body>     
    );

}




export default Manager;

