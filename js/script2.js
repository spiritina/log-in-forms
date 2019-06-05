'use strict';
let loggedIn = {};
let colorInp= document.getElementById('color');
colorInp.addEventListener("input", function(){
    let color = colorInp.value;
    setPageColor(color);
})

function setPageColor(color){
    document.body.style.backgroundColor = color;
    let photo = document.querySelector('.photo');
    photo.style.borderColor = color;
}

let countries = document.getElementById('countries');
countries.addEventListener('change', function(){
  console.log(countries.options[countries.selectedIndex].innerText);  
})

function person  (name, lastName, country, color){
    this.name = name;
    this.lastName = lastName;
    this.country = country;
    this.color = color;
}

let submit = document.getElementById('submit');
submit.addEventListener('click', (e)=>{
   e.preventDefault();
    let country = countries.options[countries.selectedIndex].innerText;
    let firstNameInp = document.getElementById('name');
    let lastNameInp = document.getElementById('last_name');
    let name = firstNameInp.value;
    let lastName = lastNameInp.value;
    let color = colorInp.value;
    let newbie = new person(name, lastName, country, color);
    save(newbie);
    if(name.match('.{3,15}')&&lastName.match('.{3,15}')){
    let inputs=document.getElementById('inputContainer');
    inputs.style.opacity='0';
    setTimeout(()=>{
//        let inputs=document.getElementById('inputContainer');
//        inputs.style.visibility = 'none';
//        drawName(name, lastName, country);
//         inputs.style.display = 'none';
//        setPageColor(color);
        showLoggedIn(name, lastName, country, color);
    },500);}else{alert("There are empty fields!")}
});

function showLoggedIn(name, lastName, country, color){
    let inputs=document.getElementById('inputContainer');
        inputs.style.visibility = 'none';
        drawName(name, lastName, country);
         inputs.style.display = 'none';
        setPageColor(color);
}

function drawName(name, lastName, country){
    let div = document.createElement('div');
        div.classList.add('personal_info');
        div.innerHTML = `<p>${name} ${lastName}</p><p>${country}</p>`;
       
        let form = document.forms[0];
        form.appendChild(div);
        div.style.opacity = 1;
}

function save(person) {
    if (localStorage.getItem('loggedIn')){
        let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    loggedIn.personalData = person;
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        if(localStorage.getItem('passwords')){
            let passwords = JSON.parse(localStorage.getItem('passwords'));
            passwords[loggedIn.email].personalData = person;
            localStorage.setItem('passwords', JSON.stringify(passwords));
        }
    }
}

let logOut = document.getElementsByClassName('log_out')[0];
logOut.addEventListener('click', (e)=>{
    e.preventDefault();
    localStorage.removeItem('loggedIn');
    location.href = 'index.html';
})

window.onload = function(){
  if (localStorage.getItem('loggedIn')){
      loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
      if(localStorage.getItem('passwords')){
          let passwords = JSON.parse(localStorage.getItem('passwords'));
            if(passwords[loggedIn.email].personalData){
                loggedIn.personalData = passwords[loggedIn.email].personalData;
            }};
      if(loggedIn.personalData){
//          let inputs = document.getElementById('inputContainer');
//          inputs.style.display = 'none';
//          drawName(loggedIn.personalData.name, loggedIn.personalData.lastName, loggedIn.personalData.country);
//          setPageColor(loggedIn.personalData.color);
          showLoggedIn(loggedIn.personalData.name, loggedIn.personalData.lastName, loggedIn.personalData.country, loggedIn.personalData.color);
          
      }else{document.body.style.backgroundColor = colorInp.value;}
  }  
}