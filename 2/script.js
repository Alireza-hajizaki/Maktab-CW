let $ = document;
const password = $.querySelector(".pass");

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