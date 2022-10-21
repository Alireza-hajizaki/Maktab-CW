let $ =document;
    const firstNameInput = $.getElementById("firstname"),
    lastNameInput = $.getElementById('lastname'),
    emailInput = $.getElementById('email'),
    phoneInput = $.getElementById('phone'),
    signUpBtn = $.getElementById('sign'),
    signUpContainer = $.querySelector('.container'),
    tableInput = $.getElementById('users-table'),
    buttonElem = $.querySelector('#btn'),
    mainElem = $.querySelector('.main')

    
let emailvalidate = false;
let firstNameValidation =false;

firstNameInput.addEventListener('input', firsNameElem);
function firsNameElem(){
    if(firstNameInput.value){
        firstNameInput.style.border = '3px solid green'
        firstNameValidation = true;
    }else{
        firstNameInput.style.border = '3px solid red'
        firstNameValidation = false;
    }
}

emailInput.addEventListener('input',emailValidation);

function emailValidation(){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(emailInput.value)){
        emailInput.style.border = "3px solid green"
        emailvalidate = true
    }else{
        emailInput.style.border = "3px solid red"
        emailvalidate=false
    }
}

signUpBtn.addEventListener('click',submitElem);
function submitElem(){
    if(emailvalidate && firstNameValidation){
    userApp.addUser({
        firstname : firstNameInput.value,
        lastname : lastNameInput.value ,
        Email : emailInput.value ,
        Phone : phoneInput.value
    })

    signUpContainer.style.display = 'none';
    mainElem.style.display = 'block'

    firstNameInput.value = ''
    lastNameInput.value = ''
    emailInput.value = ''
    phoneInput.value = ''

    emailvalidate =false;
    firstNameValidation = false;

    render();
    }else{
      if(!emailvalidate){
        emailInput.style.border ='3px solid red'
      }
      if(!firstNameValidation){
        firstNameInput.style.border = '3px solid red'
      }
    }

}


let userApp ={
    getData : function(){
        return JSON.parse(localStorage.getItem("UsersData")) ?? []
    },
    setData : function(data){
        const UsersData = [...this.getData() , data]
        localStorage.setItem("UsersData",JSON.stringify(UsersData))
        render()
    },
    genId : function(){
        return Date.now().toString(36)
    },
    addUser : function(userProperties){
       let {
        firstname, lastname ='' ,  Email , Phone = ''
       } = userProperties;
        const user = {
            id : this.genId(),
            firstName : firstname,
            lastName : lastname,
            email : Email,
            phone : Phone
        }

        this.setData(user)
    },
}

function render(){

   tableInput.innerHTML = "<thead><th>Id</th><th>FirstName</th><th>LastName</th><th>E-Mail Address</th><th>Phone Number</th></thead>"

 const peoples = userApp.getData()
 peoples.forEach(people => {
    let trElem = $.createElement('tr');
    let tdElem = $.createElement('td');
    tdElem.innerHTML = people.id
    trElem.append(tdElem);

    let td1Elem = $.createElement('td');
    td1Elem.innerHTML = people.firstName
    trElem.append(td1Elem);
    
    let td2Elem = $.createElement('td');
    td2Elem.innerHTML = people.lastName
    trElem.append(td2Elem);

    let td3Elem = $.createElement('td');
    td3Elem.innerHTML = people.email
    trElem.append(td3Elem);

    let td4Elem = $.createElement('td');
    td4Elem.innerHTML = people.phone
    trElem.append(td4Elem);
    
    tableInput.append(trElem);
    console.log()
    
 });
}

function showSignUpBox(){
    mainElem.style.display = 'none'
    signUpContainer.style.display = 'grid'
}


buttonElem.addEventListener('click', showSignUpBox)

window.addEventListener('load' , render);