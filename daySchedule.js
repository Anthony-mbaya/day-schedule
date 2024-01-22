
const selectEl = document.getElementById("select");
const toggleBtnEl = document.getElementById("toggleBtn");
const dateOutputEl = document.getElementById("output");
 
const confirmDialogEl = document.getElementById("confirmClose");

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
    dateOutputEl.textContent = defaultFormat;
    scheduleEl.classList.toggle("hide");
    toggleBtnEl.style.display = 'none';
 });


 //start on the task
const dataArray = [];
let currenData = {};

deleteTaskEl.addEventListener("click",()=>{
    confirmDialogEl.showModal();
});

cancelBtnEl.addEventListener("click",()=>{
    confirmDialogEl.close();
});

discardBtnEl.addEventListener("click",()=>{
    confirmDialogEl.close();
    scheduleEl.classList.toggle("hide");
    toggleBtnEl.style.display = "" ? "block" : "";
});

saveEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    //let find index of the data if it exists in array
    let foundIndex = dataArray.findIndex((item) => item.id === currenData.id);
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
    }
//destructuring
    dataArray.forEach(({id,input1Prop,input2Prop,input3Prop,input4Prop,input5Prop}) => {
        (taskHolderEl.innerHTML += `
        <div class='tasks' id='${id}'>
        <p>8:00AM : ${input1Prop}</p>
        <p>10:00AM : ${input2Prop}</p>
        <p>12:00AM : ${input3Prop}</p>
        <p>2:00AM : ${input4Prop}</p>
        <p>4:00AM : ${input5Prop}</p>
        <button type="button" id="modify">Modify</button>
        <button type="button" id="delete">Delete</button>
        </div>`)
    });
    scheduleEl.classList.toggle("hide");
});

 