// function {


// let addTodoButton = document.getElementById("addBtn");
// let tableBody = document.getElementById("todoTableBody");
// let inputTitle = document.getElementById("todoName");
// let prioritySelect = document.getElementById("priority");
// // in todoData we have save the data in localStorage
// let todos=JSON.parse(localStorage.getItem("todos"))||[];
// appendData(todos);

// // add event listener
// addTodoButton.addEventListener("click",()=>{
//     let todo ={
//         title:inputTitle.value,
//         priority:prioritySelect.value,
//         status:"pending🔃"
//     }
//     // 3.Accessing todoData if not there then empty Array; cheking array is already there or not null|| []
//     let todos=JSON.parse(localStorage.getItem("todos")) || [];
//     // 1.pushing todo data{} in array
//     todos.push(todo);
//     console.log(todos);
//     // 2.storing in localStorage
//     localStorage.setItem("todos",JSON.stringify(todoData));
//     let tRow=createRow(todo);
//     tableBody.append(tRow);
    
// })


// // to create a table row
// function createRow(obj,index){
// //      <tr>
// //     <td></td>
// //     <td></td>
// //     <td></td>
// //     <td></td>
// //   </tr> 
// let tr=document.createElement("tr");
// let td1=document.createElement("td");
// let td2=document.createElement("td");
// let td3=document.createElement("td");
// let td4=document.createElement("td");
// let archiveBtn=document.createElement("button");
// let toggleBtn=document.createElement("button");
// archiveBtn.innerText="Archive";
// toggleBtn.innerText=obj.status;

// toggleBtn.addEventListener("click",()=>{
//     if(toggleBtn.innerText==="pending🔃"){
//         toggleBtn.innerText="complete✅"
//         // link ui with localStorage
//         todoData[index]={...obj,status:"complete✅"};
//     }
//     else{
//        toggleBtn.innerText="pending🔃"
//        todoData[index]={...obj,status:"pending🔃"};
//     }
//     localStorage.setItem("todoData",JSON.stringify(todoData));
// })

// archiveBtn.addEventListener("click",(e)=>{
//     let archiveData=JSON.parse(localStorage.getItem("archiveData"))
//     console.dir(e.target.parentElement.parentElement)
//     e.target.parentElement.parentElement.remove();
//     let archiveObj=todoData.splice(index,1);
//      archiveData.push(archiveObj);
//      localStorage.setItem("todoData", JSON.stringify(todoData));
//      localStorage.setItem("archiveData ")
// })


// td1.innerText=obj.title;
// td2.innerText=obj.priority;
// //td3.innerText=obj.status;

// if(obj.priority=="high"){
//     td2.style.backgroundColor="red";
// }
// else if(obj.priority=="medium"){
//     td2.style.backgroundColor="yellow";

// }
// else{
//     td2.style.backgroundColor=" ";
// }
// td3.append(toggleBtn);
// td4.append(archiveBtn);
// tr.append(td1,td2,td3,td4);

// return tr;

// }


// function appendData(data){
//     data.forEach((item,index)=>{
//         let tr=createRow(item,index)
//         tableBody.append(tr);
//     })
// }
// }

let addTodoButton = document.getElementById("addBtn");
let tableBody = document.getElementById("todoTableBody");
let inputTitle = document.getElementById("todoName");
let prioritySelect = document.getElementById("priority");
let todos=JSON.parse(localStorage.getItem("todos")) || [];  //access the data from local Storage  
appendData(todos);

function createTable(obj, index){
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");
    let status=document.createElement("button");
    status.className="toggle";
    let archiveBtn=document.createElement("button");
    archiveBtn.className="archiveBtn";
    archiveBtn.innerText="Archive";
    td1.innerText=obj.title;
    td2.innerText=obj.priority;
    status.innerText=obj.status;
    td3.append(status);
    td4.append(archiveBtn);


// event listener for status btn
    status.addEventListener("click",()=>{
        if(status.innerText==="Pending🔃"){
            status.innerText="Completed✅";
            todos[index]={...obj,status:"Completed✅"};  //update the complete status on localstorage
        }
        else if(status.innerText==="Completed✅"){
            status.innerText="Pending🔃";
            todos[index]={...obj,status:"Pending🔃"};
        }
        updateLocalStorage();
    })  
   archiveBtn.style.backgroundColor="red";
   archiveBtn.style.border="none";
   archiveBtn.style.borderRadius="10%";
   archiveBtn.style.color="white";
   archiveBtn.addEventListener("click",()=>{
    let archive=JSON.parse(localStorage.getItem("archive")) || [];
    let archiveObj=todos.splice(index,1);  //to update the archive or remove the item one by one
    archive.push(...archiveObj);
    appendData(todos);   // if i want to add data further
    updateLocalStorage();
    localStorage.setItem("archive",JSON.stringify(archive)); // archive update
  
   })
   if(obj.priority==="medium"){
    td2.style.backgroundColor="rgb(255,255,0)";
    }
    else if(obj.priority==="high"){
     td2.style.backgroundColor="rgb(255,0,0)";
    }

   tr.append(td1, td2, td3, td4);
   return tr;

}
function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
addTodoButton.addEventListener("click",(e)=>{
    e.preventDefault();
    if(checkInput()){
    let todo={
        title: inputTitle.value,
        priority: prioritySelect.value,
        status: "Pending🔃"
    }
    console.log(todo);
    todos.push(todo);
    appendData(todos);
    updateLocalStorage();
}


})

function appendData(data){   // glue work
    tableBody.innerHTML="";
    data.forEach((item,index)=>{
        let tr=createTable(item,index);
        tableBody.append(tr);
       
    });


}


function checkInput(){      //To give alert if not added data
    if(inputTitle.value){
        // alert("Todo added successfully");
        return true;
    }
    else{
        alert("Todo cannot be empty!");
        return false;
    }
}

