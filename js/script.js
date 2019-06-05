let signUpBtn = document.querySelector('.sign_up_btn'),
    logInBtn = document.querySelector('.log_in_btn'),
    logInBtnBig = document.querySelector('.btn_txt'),
    closeBtn = document.querySelector('.close'),
    logInDiv = document.querySelector('.log_in'),
    logInForm = document.querySelector('.log_in_form'),
    password = document.querySelector('#password'),
    email = document.querySelector('#email'),
    repeatPassword = document.querySelector('#repeat_password'),
    checkbox = document.querySelectorAll('input[type="checkbox"]'),
    submit = document.querySelector('.submit'),
    repPass = document.querySelector('#repPass'),
    action = '',
    a = {},
    loggedIn = {};



signUpBtn.addEventListener('click', signUp);
logInBtn.addEventListener('click', logIn);
logInBtnBig.addEventListener('click', logIn);
closeBtn.addEventListener('click', close);
email.addEventListener('keyup', function(){deleteError(email,'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')});
password.addEventListener('keyup', function(){deleteError(password, "[A-Za-z0-9]{6,}")});
repeatPassword.addEventListener('keyup', function(){deleteError(repeatPassword)});

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('change', function () {
        if (this.checked) {
            this.parentNode.querySelector('input').type = "text";
        } else {
            this.parentNode.querySelector('input').type = "password";
        }
    });
}

submit.addEventListener('click', function(e){
    e.preventDefault();
    
    if (action == 'signUp') {
        if (isInputValid(email, '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$') && isInputValid(password, "[A-Za-z0-9]{6,}") && isInputValid(repeatPassword)) {
            let myemail = {password:password.value};
            loggedIn = {email: email.value,
               password:password.value};
                
            
            a[email.value] = myemail;
            console.log(a);
            save();
            close();
            location.href = 'cabinet.html'
}
    } else if (action == 'logIn') {
        if (isInputValid(email, '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$') && isInputValid(password, "[A-Za-z0-9]{6,}")) {
            let myemail = email.value,
                mypass = password.value;
            if (a[myemail].password == mypass) {
                loggedIn = {email: email.value,
               password:password.value};
                close();
                save();
            location.href = 'cabinet.html'
            } else {
                alert(`I don't know you!`)
            }
        }
    }
});


function deleteError(elem, rule) {
    if(elem==repeatPassword){
        if(elem.value==password.value){elem.parentNode.classList.remove('error');}
    }else if (elem.value.match(rule)) {
        elem.parentNode.classList.remove('error');
    }
}


function isInputValid(HTMLelement, rule) {
    const inputVal = HTMLelement.value;
    function returnError(HTMLelement){
      HTMLelement.parentNode.classList.add('error');
            return false;   
    };
     if(HTMLelement==repeatPassword){
        if (inputVal==password.value){return true}else{
            return returnError(HTMLelement);
        }
    }else if (rule) {
        if (inputVal.match(rule)) {
            return true;
        } else {
            return returnError(HTMLelement);
        }
    }
if (inputVal.length) {
        return true
    } else {
         return returnError(HTMLelement);
    }
}


function signUp() {
    
    logInDiv.style.display = 'block';
    repPass.style.display = 'block';
    action = 'signUp';
}

function logIn() {
    
    logInDiv.style.display = 'block';
    action = 'logIn';
}

function close() {
    
    logInDiv.style.display = 'none';
    repPass.style.display = 'none';
    act = '';
}


function save() {
    localStorage.setItem('passwords', JSON.stringify(a));
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
}

window.onload = function () {
    if (localStorage.getItem('passwords') != null) {
        a = JSON.parse(localStorage.getItem('passwords'));
        
    }
}

