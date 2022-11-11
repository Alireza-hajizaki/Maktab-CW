let $ = document;
const username = $.querySelector('.username');
const lastname = $.querySelector('.lastname');
const addBtn = $.querySelector('.add-btn');
const deleteBtn = $.querySelector('.delete-btn');
const tableElem = $.querySelector('.table')
const tbodyElem = $.querySelector('#tbody-elem')
let editUserId = "";
let selectedUserId = new Set();
let chekedAll = $.querySelector('#chekedAll')
chekedAll.ischecked = false;

let users = []

lastname.addEventListener('keydown' , function(val){
    if(val.keyCode === 13){
        addNewUser()
    }
})

function addNewUser (){
    if(addBtn.innerHTML === 'Add'){
        let nameUser = username.value;
    let familyUser = lastname.value

    let newObj={
        id : Date.now().toString(36),
        firstname: nameUser,
        lastname : familyUser
    }
    // console.log(newObj)
    users.push(newObj)
    setLocalStorage(users)
    getLocalStorage()
    userGenerator()

    }else{

        getLocalStorage()
        const newUsers = users.map(item =>{
            if(item.id === editUserId){
            return {...item , firstname : username.value , lastname : lastname.value}
            }else{
            return {...item}
            }
    })
   setLocalStorage(newUsers)
   userGenerator()
   addBtn.innerHTML = "Add";
}
    username.value = "";
    lastname.value = "";
}

function setLocalStorage(value){
   localStorage.setItem('users' , JSON.stringify(value))
}

function userGenerator(){
    // console.log(value)
    
        tbodyElem.innerHTML = "";
        getLocalStorage()
        users.forEach((item) => {
            // console.log(item.firstname)

            let newTr = $.createElement('tr');
            let checkboxTd = $.createElement('td');
            checkboxTd.innerHTML ="<i class='bi bi-square'></i>"
            checkboxTd.setAttribute('onclick' , `checkedUser('${item.id}')`)
            checkboxTd.ischecked = false ;
            newTr.append(checkboxTd)
    
            let firstnameTd = $.createElement('td');
            firstnameTd.innerText =item.firstname
            newTr.append(firstnameTd)

            let lastnameTd = $.createElement('td');
            lastnameTd.innerText =item.lastname
            newTr.append(lastnameTd)
    
            let operationTd = $.createElement('td');
            let buttonDel = $.createElement('button')
            buttonDel.innerText = 'Delete'
            buttonDel.setAttribute('onclick' , `removeElem('${item.id}')`)
            let buttonEdit = $.createElement('button')
            buttonEdit.innerText = 'Edit'
            buttonEdit.setAttribute('onclick' , `editGenerator('${item.id}','${item.firstname}','${item.lastname}')`);


            operationTd.append(buttonDel , buttonEdit);
            newTr.append(operationTd)

            tbodyElem.append(newTr)

        })
    }

    function checkedUser(userId){

        if(!event.currentTarget.ischecked){
        event.currentTarget.ischecked = true;
        selectedUserId.add(userId)
        event.currentTarget.innerHTML = "<i class='bi bi-check2-square'></i>"
    }else{
        event.currentTarget.ischecked = false;
        selectedUserId.delete(userId)
        event.currentTarget.innerHTML = "<i class='bi bi-square'></i>"
        chekedAll.ischecked = false;
        chekedAll.innerHTML = "<i class='bi bi-square'></i>"
    }
    // console.log(selectedUserId)

    }

    function editGenerator(userId , userfirstname , userlastname){
        username.value = userfirstname
        lastname.value = userlastname
        editUserId = userId
        addBtn.innerHTML = 'update'
    }
   
    function removeElem(userId){

        // console.log(userId)
       getLocalStorage()
       const newUser = users && users.filter(item => item.id !== userId)
       setLocalStorage(newUser)
       userGenerator()
    }


function getLocalStorage(){
    let localStorageUsers = JSON.parse(localStorage.getItem('users'))

    if(localStorageUsers){
        users = localStorageUsers
    }
    // console.log(localStorageUsers)
}

function clearUsers(){
  if(chekedAll.ischecked){
    users = []
    setLocalStorage(users)
    userGenerator(users)
    chekedAll.ischecked = false;
    chekedAll.innerHTML = "<i class='bi bi-square'></i>"
  }else{
    for(let user of selectedUserId){
        removeElem(user)
    }
  }
}

function markAll(){
    const allCheckBox = $.querySelectorAll('tr> :first-child')
    if(!event.currentTarget.ischecked){
        event.currentTarget.ischecked = true;
        // selectedUserId.add(userId)
        allCheckBox.forEach(item => {
            item.ischecked = true ;
            item.innerHTML = "<i class='bi bi-check2-square'></i>"
        })
        event.currentTarget.innerHTML = "<i class='bi bi-check2-square'></i>"
        getLocalStorage()
        users.forEach(item =>{
            selectedUserId.add(item.id)
        })
    }else{
        event.currentTarget.ischecked = false;
        // selectedUserId.add(userId)
        allCheckBox.forEach(item => {
            item.ischecked = false ;
            item.innerHTML = "<i class='bi bi-square'></i>"
        })
        event.currentTarget.innerHTML = "<i class='bi bi-square'></i>"
        selectedUserId.clear()
}
}


window.addEventListener('load', userGenerator)
addBtn.addEventListener('click', addNewUser)
deleteBtn.addEventListener('click', clearUsers)
chekedAll.addEventListener('click' , markAll)
