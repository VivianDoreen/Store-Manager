 //Validation function
 function validate(){
//Getting all input text objects
 var username = document.forms["login-form"]["username"];
 var password = document.forms["login-form"]["password"];

 //Getting all error_display messages
 var username_error = document.getElementById('username_error');
 var Password_error = document.getElementById('Password_error');

 //Setting all eventListners
 username.addEventListener("blur", usernameVerify, true);
 password.addEventListener("blur", passwordVerify, true);

   //Username Id Validation
   if (username.value == "") {
    username_error.textContent = "Username* required";
    username.focus();
     return false;
   }  
   
   if (username.value.match("/^[a-zA-Z ]*$/")){
    username.style.border = "1px solid red";
    username_error.textContent = "Username* required, Only names required";
    username.focus();
     return false;
   }
   if (password.value == "") {
    Password_error.textContent = "Password* required";
    password.focus();
     return false;
   }
 }

 //Eventhandler functions
 function usernameVerify(){
   if (username.value !="") {
    username_error.innerHTML = "";
     return true;
   }
 }
 
 function passwordVerify(){
   if (password.value !="") {
    Password_error.innerHTML = "";
     return true;
   }
 }