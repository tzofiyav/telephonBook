import React, { useState, useEffect } from "react";
import './contact.css';
import { ontr, onbtn, onbtn1, search } from './details.js';
import TableComponent from './TableComponent.js';
import {list} from './TableComponent';
import { MultiSelect } from "react-multi-select-component";
import {menepulative} from "./menipulation.js"

const Contact = () => {
  const [inputs, setInputs] = useState([]);
  const [arrData, setArrData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = await list();
      setSelectOptions(options);
    };

    fetchData();
  }, []);

  const addSelected = (sel) =>{
    setSelected(sel);
    setCategory((prevState) => ({
        ...prevState,
        category: sel.map((option) => option.value),
    }));
  }

  function setCategory(sel){
      
  }

  //console.log("hhhhhhhhhhhhh"+selectOptions);
  return (
    <div>

      <h1>ספר טלפונים</h1>



      <div className="my-popup" id="myForm" style={{ display: "none" }}>
        <h2>עדכון נתונים</h2>
        שם משפחה:{" "}
        <input className="popupInput" type="text" size="15px" name="check" id="text_to_add" />
        שם פרטי:{" "}
        <input className="popupInput" type="text" size="15px" name="check" id="text_to_add0" />
        תעודת זהות:{" "}
        <input className="popupInput" type="number" name="check" size="15px" id="text_to_add1" />
        <br />
        <br />
        <br />
        טלפון נייד:
        <input className="popupInput" type="number" name="check" size="15px" id="text_to_add2" />
       
        כתובת: :
        <input className="popupInput" type="text" name="check" size="15px" id="text_to_add3" />
        מייל:
        <input className="popupInput" type="email" name="check" size="15px" id="text_to_add4" />
        
        מס' תגים:
        <input className="popupInput" type="number" name="check" size="15px" id="text_to_add5" />
        <br />
        <br />
        <br />
        תגים :

        <span>{selected.map((selected)=>selected.label).toString()}</span>
                    <MultiSelect
                        options={selectOptions}
                        value={selected}
                        onChange={addSelected}
                        labelledBy={"Select"}
                        isCreatable={true}
                    />
        <input className="popupInput" type="text" name="check" size="15px" id="text_to_add6" />
        סטטוס:
        <input className="popupInput" type="text" name="check" size="15px" id="text_to_add7" />
        מגדר:
        <input className="popupInput" type="text" name="check" size="15px" id="text_to_add8" />
        יום הולדת:
        <input className="popupInput" type="date" name="check" size="15px" id="text_to_add9" />
        <br />
        <br />
        <br />
        <button id="btn_add" onClick={onbtn}>
          עדכון חבר
        </button>
        <button id="btn_add1" onClick={onbtn1}>
          בטל
        </button>
        <br />
        <br />
        <br />
      </div>


      <div className="my-popup" id="myForm2" style={{ display: "none" }}>
        <h2>עדכון נתונים</h2>
        שם הארגון:{" "}
        <input className="popupInput" type="text" size="15px" name="check2" id="text_to_add2" />
        מס' ארגון:{" "}
        <input className="popupInput" type="number" name="check2" size="15px" id="text_to_add12" />
        טלפון:
        <input className="popupInput" type="number" name="check2" size="15px" id="text_to_add22" />
        <br />
        <br />
        <br />
        כתובת: :
        <input className="popupInput" type="text" name="check2" size="15px" id="text_to_add32" />
        מייל:
        <input className="popupInput" type="email" name="check2" size="15px" id="text_to_add42" />
        מס' תגים:
        <input className="popupInput" type="number" name="check2" size="15px" id="text_to_add52" />
        <br />
        <br />
        <br />
        תגים :
        <input className="popupInput" type="text" name="check2" size="15px" id="text_to_add62" />
        סטטוס:
        <input className="popupInput" type="text" name="check2" size="15px" id="text_to_add72" />
        <br />
        <br />
        <br />
        <button id="btn_add" onClick={onbtn}>
          עדכון ארגון
        </button>
        <br />
        <br />
        <br />
      </div>

      <div>
        <TableComponent />
      </div>


      <div style={{ display: "flex" }}>
        <h3 style={{ margin: "40px", marginRight: "600px" }}>פרטי מקבלי סיוע</h3>
        <input
          type="text"
          style={{ margin: "40px", marginRight: "250px" }}
          id="myInput2"
          onKeyUp={() => search("myInput2", "myTable2")}
          placeholder="Search for names.."
          title="Type in a name"
        />
      </div>

      <table className="customers" id="myTable2">
        <tbody>
          <tr>
            <th>מס'</th>
            <th>שם מלא</th>
            <th>מס' זהות</th>
            <th>מס' פלאפון</th>
            <th>כתובת</th>
            <th>דוא"ל</th>
            <th>מס' תגים</th>
            <th>תגים</th>
            <th>סטטוס</th>
            <th>מגדר</th>
            <th>יום הולדת</th>
          </tr>
          <tr id="0504311478" onClick={() => ontr("0504311478")}>
            <td>1</td>
            <td>משפחת חנקין</td>
            <td>---</td>
            <td>0504311478</td>
            <td>לואי לפסקי 53, ירושלים</td>
            <td>ch050431@gmail.com</td>
            <td>1</td>
            <td>הצלה</td>
            <td>פעיל</td>
            <td>---</td>
            <td>---</td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: "flex" }}>
        <h3 style={{ margin: "40px", marginRight: "600px" }}>פרטי ארגונים</h3>
        <input
          type="text"
          style={{ margin: "40px", marginRight: "250px" }}
          id="myInput3"
          onKeyUp={() => search("myInput3", "myTable3")}
          placeholder="Search for name of organization.."
          title="Type in a name"
        />
      </div>

      <table className="customers" id="myTable3">
        <tbody>
          <tr>
            <th>מס'</th>
            <th>שם הארגון</th>
            <th>מס' ארגון</th>
            <th>מס' טלפון</th>
            <th>כתובת</th>
            <th>דוא"ל</th>
            <th>מס' תגים</th>
            <th>תגים</th>
            <th>סטטוס</th>
          </tr>
          <tr id="580079978" onClick={() => ontr("580079978")}>
            <td>1</td>
            <td>עזר מציון</td>
            <td>580079978</td>
            <td>03-6144444</td>
            <td>הרב רבינוב 5, ב"ב</td>
            <td>mazkirutbb@ami.org.il</td>
            <td>1</td>
            <td>הצלה</td>
            <td>פעיל</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Contact;
