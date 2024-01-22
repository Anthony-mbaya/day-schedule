
const selectEl = document.getElementById("select");
const toggleBtnEl = document.getElementById("toggleBtn");
const dateOutputEl = document.getElementById("output");
 
const confirmDialogEl = document.getElementById("confirmClose");

const taskFormEl = document.getElementById("taskForm");

const headerEl = document.getElementById("header"); 
const input1 = document.getElementById("schedule-input1");
const input2 = document.getElementById("schedule-input2");
const input3 = document.getElementById("schedule-input3");
const input4 = document.getElementById("schedule-input4");
const input5 = document.getElementById("schedule-input5");

const taskHolderEl = document.getElementById("task-holder");

const scheduleEl = document.getElementById("schedule");
const scheduleRowEl = document.getElementById("schedule-row");
const scheduleTimeEl = document.getElementById("schedule-time");
const scheduleInputEl = document.getElementById("schedule-input");
const deleteTaskEl = document.getElementById("delete-task");
const saveEl = document.getElementById("save");
const discardBtnEl = document.getElementById("discard-btn");
const cancelBtnEl = document.getElementById("cancel-btn"); 
 //date details
 const date = new Date();   
 const min = date.getMinutes();
 const hrs = date.getHours();
 const day = date.getDate();
 const mon = date.getMonth() + 1;
 const year = date.getFullYear();

 const defaultFormat = `${day} - ${mon} - ${year}`; 

 selectEl.addEventListener("change",()=>{
    switch(selectEl.value){
        case "d-m-y":dateOutputEl.textContent = defaultFormat; 
        break;
        case "y-m-d":dateOutputEl.textContent = `${year} - ${mon} - ${day}`;  
        break;
        case "h-m-s-d-m-y":dateOutputEl.textContent = `${hrs} hrs ${min} min |  ${day} - ${mon} - ${year}`;
        break;
        default:dateOutputEl.textContent = defaultFormat;
    } 
 });
 toggleBtnEl.addEventListener("click",()=>{
    //dateOutputEl.textContent = defaultFormat;
    scheduleEl.classList.toggle("hide");
    toggleBtnEl.style.display = 'none';
 });


 //start on the task
const dataArray = JSON.parse(localStorage.getItem("savedData")) || [];
let currentData = {};

deleteTaskEl.addEventListener("click",()=>{
    confirmDialogEl.showModal();
});
 
cancelBtnEl.addEventListener("click",()=>{ 
        confirmDialogEl.close(); 
});

discardBtnEl.addEventListener("click",()=>{
    confirmDialogEl.close(); 
    toggleBtnEl.style.display = "" ? "block" : "";
    input1.value = "";
    input2.value = "";
    input3.value = "";
    input4.value = "";
    input5.value = "";
});

taskFormEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    //let find index of the data if it exists in array
    let foundIndex = dataArray.findIndex((item) => item.id === currentData.id);
    //get an object with id of each input value
    //Date.now() returns the number of milliseconds elapsed since January to be unique
    const getInputObj = {
        id:`${input1.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        input1Prop:input1.value,
        input2Prop:input2.value,
        input3Prop:input3.value,
        input4Prop:input4.value,
        input5Prop:input5.value
    };

    if(foundIndex === -1){
        dataArray.unshift(getInputObj);
    }else{
        dataArray[foundIndex] = getInputObj;
    }

    
localStorage.setItem("savedData",JSON.stringify(dataArray));

if(dataArray.length){
    taskHolderEl.innerHTML = "";
//destructuring
taskHolderEl.innerHTML += `<div class="bButton"><button onclick="addFunc()" class="backBtn"> Add New </button></div>`;
    dataArray.forEach(({id,input1Prop,input2Prop,input3Prop,input4Prop,input5Prop}) => {
    taskHolderEl.innerHTML += `<div class='tasks' id='${id}'>
        <p id="output">${defaultFormat}</p>
        <div class="saveTime"><span class="time">8:00 AM :</span> <span class="elData">${input1Prop}</span></div>
        <div class="saveTime"><span class="time">10:00 AM :</span> <span class="elData">${input2Prop}</span></div>
        <div class="saveTime"><span class="time">12:00 AM :</span>  <span class="elData">${input3Prop}</span></div>
        <div class="saveTime"><span class="time">2:00 AM :</span>  <span class="elData">${input4Prop}</span></div>
        <div class="saveTime"><span class="time">4:00 AM :</span> <span class="elData"> ${input5Prop}</span></div>
        <button type="button" id="modify" onclick="modifyFun(this)">Modify</button>
        <button type="button" id="delete" onclick="deleteFun(this)">Delete</button>
        </div>`});
    }
    headerEl.innerHTML = "";
    scheduleEl.classList.toggle("hide"); 
});
const headerElemOriginal = document.getElementById("header").innerHTML;
function addFunc(){
    scheduleEl.classList.toggle("hide");  
    taskHolderEl.innerHTML = "";
    headerEl.innerHTML = headerElemOriginal;
    toggleBtnEl.style.display = "" ? "block" : "";
    input1.value = "";
    input2.value = "";
    input3.value = "";
    input4.value = "";
    input5.value = "";
} 
 //use this to access parent element
 function deleteFun(btn){
    const parent = btn.parentElement;
    const index = dataArray.findIndex((item) => item.id === parent.id);
    parent.remove();
    dataArray.splice(index, 1);
    //already used splice to remove so just add
    localStorage.setItem("savedData".JSON.stringify(dataArray));
 }
 function modifyFun(btn){
    let parent = btn.parentElement;
    const index = dataArray.findIndex((item) => item.id === parent.id);
    currentData = dataArray[index];
    //take values from submit
    input1.value = currentData.input1Prop;
    input2.value = currentData.input2Prop;
    input3.value = currentData.input3Prop;
    input4.value = currentData.input4Prop;
    input5.value = currentData.input5Prop;

    saveEl.innerText = "Update"; 
    scheduleEl.classList.toggle("hide"); 
    taskHolderEl.innerHTML = "";
 }



 