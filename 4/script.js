let $ = document;
const email = $.querySelector("#email"); 
const password = $.querySelector("#password");
console.log(password.value)


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

password.addEventListener('input', passwordElem);
function passwordElem(){
    
    let minMaxLength = /^[\s\S]{8,32}$/,
    upper = /[A-Z]/,
    lower = /[a-z]/,
    number = /[0-9]/,
    special = /[ !"#$%&'()*+,\-./:;?@[\\\]^_`{|}~]/;
    if (minMaxLength.test(password.value) &&
    upper.test(password.value) &&
    lower.test(password.value) &&
    number.test(password.value) &&
    special.test(password.value)
    ) {
    password.style.border = '3px solid green' ;
    passwordvalidate = true;
}else{
    password.style.border = '3px solid red' ;
    passwordvalidate = false;    
    }
}