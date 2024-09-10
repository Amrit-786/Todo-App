// let tableBody = document.getElementById("todoTableBody");
// let prioritySelect = document.getElementById("prioritySelect");
// let statusSelect = document.getElementById("statusSelect");
let tableBody = document.getElementById("todoTableBody");
let prioritySelect = document.getElementById("prioritySelect");
let statusSelect = document.getElementById("statusSelect");
let archive=JSON.parse(localStorage.getItem("archive")) || [];
appendData(archive);


function createTable(obj, index){
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");
    let td5=document.createElement("td");
    let restoreBtn= document.createElement("button");
    restoreBtn.className="restoreBtn";
    restoreBtn.innerText="Restore";
    let deleteBtn=document.createElement("button");
    deleteBtn.className="deleteBtn";
    deleteBtn.innerText="Delete";


    td1.innerText=obj.title;
    td2.innerText=obj.priority;
    td3.innerText=obj.status;
    td4.append(restoreBtn);
    td5.append(deleteBtn);


    restoreBtn.addEventListener("click",()=>{
        let archive = JSON.parse(localStorage.getItem("archive")) || [];
        let todos=JSON.parse(localStorage.getItem("todos"))||[];
        let archiveobj = archive.splice(index,1);
        localStorage.setItem("archive",JSON.stringify(archive));
        tableBody.innerHTML="";
        // let archive = JSON.parse(localStorage.getItem('archive')) || [];    
        appendData(archive);
        todos.unshift(...archiveobj);
        localStorage.setItem("todos",JSON.stringify(todos));
    })


    deleteBtn.addEventListener("click",()=>{
        updateLocalStorageArchive();
        archive.splice(index, 1); // Fix here: use archive instead of todos
        AccessArchive();
       
        appendData(archive);
    })

    if (obj.priority === "low") {
        td2.style.backgroundColor = "green";
    } else if (obj.priority === "medium") {
        td2.style.backgroundColor = "yellow";
    } else {
        td2.style.backgroundColor = "red";
    }
    tr.append(td1, td2, td3, td4, td5);
    return tr;
}
function updateLocalStorageArchive() {
    let archive=JSON.parse(localStorage.getItem("archive")) || [];
}
// function updateLocalStorageTodos() {
//     let todos=JSON.parse(localStorage.getItem("todos")) || [];
// }
function AccessArchive(){
    localStorage.setItem("archive",JSON.stringify(archive));
}
// function AccessTodos(){
//     localStorage.setItem("todos",JSON.stringify(todos));
// }
function appendData(data){
    tableBody.innerHTML="";
    data.forEach((item,index)=>{
        let tr=createTable(item,index);
        tableBody.append(tr);
   
    });

}
statusSelect.addEventListener("change",()=>{
    Filter()
})
prioritySelect.addEventListener("change",()=>{
    Filter()
})


function Filter(){       //filter the archive data according to priority
    let selectedPriority=prioritySelect.value;
    let selectedStatus=statusSelect.value;
        if (selectedPriority === "" && selectedStatus === "") {
            appendData(archive);
        } else {
            const filteredArray = archive.filter((item) =>
                (selectedPriority === "" || item.priority === selectedPriority) &&
                (selectedStatus === "" || item.status === selectedStatus)
            );
       
            appendData(filteredArray);
        }
         
    }
