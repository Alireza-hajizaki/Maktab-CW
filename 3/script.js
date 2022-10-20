let $ = document;
const email = $.querySelector(".email"); 

email.addEventListener('input',emailValidation);

function emailValidation(){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(email.value)){
        email.style.border = "3px solid green"
        emailvalidate = true
    }else{
        email.style.border = "3px solid red"
        emailvalidate=false
    }
}