//import TableComponent from './TableComponent.js';
import { updateData } from './TableComponent.js';
import {menepulative} from "./menipulation.js"
 let oldValue=new Array();
 let oldId;
 
 const person = new Object();
// let fieldName=new Array("rowID","Name", "ID", "phone","Address","Email", "Number_of_tags", "Tags,Status,Gender","Birthday");
 let inputs = new Array();
 let arrData = new Array();
 let tr;
 export function ontr(id){
  console.log(id)
    tr=document.getElementById(id);
   
    console.log("dgjfgjfuj", oldId)
    console.log("jygyguyg"+tr.childNodes.length)
    let j=0;
    for(let i=0; i<tr.childNodes.length;i++){
      console.log("jygyguyg"+tr.childNodes[i].lastChild+ i)
       if(tr.childNodes[i].lastChild==null|| tr.childNodes[i].lastChild==undefined){
        inputs[j]="";
       }
        if(tr.childNodes[i].lastChild!=null){
          console.log("jygyguyg"+tr.childNodes[i].lastChild.data)
          inputs[j]=tr.childNodes[i].lastChild.data;
          console.log("         "+inputs[j])
          oldValue[j]=inputs[j];
        }
       
        j++;
    }
    arrData= document.getElementsByName("check");
    if(tr.childNodes.length<11)
    arrData= document.getElementsByName("check2");
    for(let i=0; i<arrData.length;i++){
        arrData[i].value=inputs[i+1];
    }
    
    let window1;
    if(tr.childNodes.length<11){
      window1=document.getElementById("myForm2");
    }
    else{
      window1=document.getElementById("myForm");
    }
    
    window1.style.display="block";

    console.log(inputs)
    console.log(tr.childNodes)
  }


 export function onbtn(){
    let newValue;
    let j=1;
    console.log(tr.childNodes.length);
    console.log(arrData.length);
    for(let i=0; i<arrData.length;i++){
      if(tr.childNodes[j].lastChild!=null){
        tr.childNodes[j].lastChild.data=arrData[i].value;
        
      }
        
      else{
        const node = document.createElement("text")
        tr.childNodes[j].appendChild(node);
        tr.childNodes[j].lastChild.innerText=arrData[i].value;
        tr.childNodes[j].lastChild.data=arrData[i].value;
        newValue=arrData[i].value;
        console.log(tr.childNodes[j].lastChild.data);
      }
        //console.log(tr.childNodes[j].lastChild);
        console.log("arrData"+arrData[i].value);
        j++;
    }
   // person.rowId=tr.childNodes[0].lastChild;
    person.first_name =arrData[0].value;
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh"+arrData[0].value);
    person.last_name =arrData[1].value;
    person.ID = arrData[2].value;
    person.phone = arrData[3].value;
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh"+arrData[3].value);
    person.Address = arrData[4].value;
    person.Email =arrData[5].value;
    person.Number_of_tags = arrData[6].value;
    person.category = menepulative( arrData[7].value );
    person.Status = arrData[8].value;
    person.Gender = arrData[9].value;
    person.Birthday = arrData[10].value;
    console.log("fgjygjukiygkytrthygfdfhjg", tr.childNodes[0].lastChild, tr.childNodes[2].lastChild)
    updateData(tr.childNodes[0].lastChild,tr.childNodes[3].lastChild, person)
    .then(() => {
      console.log("Update was successful");// Update was successful, handle any additional actions if needed.
    })
    .catch((error) => {
      console.error('Error updating data:', error);
    });

    let window1;
    if(tr.childNodes.length<11){
      window1=document.getElementById("myForm2");
    }
    else{
      window1=document.getElementById("myForm");
    }
    
    window1.style.display="none";
   


}

export function onbtn1(){

  let window1;
  window1=document.getElementById("myForm");
  if(tr.childNodes.length<11){
    window1=document.getElementById("myForm2");
  }
  
  window1.style.display="none";
 
}


 export function search(id1, id) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(id1);
    filter = input.value.toUpperCase();
    table = document.getElementById(id);
    console.log(table)
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }