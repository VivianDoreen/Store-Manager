window.addEventListener('load', (evt) =>{
    evt.preventDefault()
    get_users();
    });

    const get_users = () =>{
    const url = 'http://127.0.0.1:8080/api/v1/users';
    const config = {
        method : 'GET',
        headers:{
            'content-type' : 'application/json',
            'Accept':'application/json',
            'x-access-token':localStorage.getItem('x-access-token')
        },
        mode:'cors'
    }
    fetch(url, config)
    .then((response)=>{
       status_code = response.status
       return response.json()
   }).then((response)=>{
       result=document.getElementById('message')
   if(status_code == 404){
       result.innerHTML = response['users']
   }
   if(status_code == 401){
       alert('Your session has expired. please login again');
       window.location='index.html'
   }
   else{
       const users = response['users']
       users.forEach((user, index) => {
           generate_user_table(index+1, user.id, user.name, user.email, user.password, user.role);
       } 
   );
   }
})
   .catch(error=>{
           alert(error)
       });
    }

const generate_user_table = (count, id, name, email, password, role) => {
const bTable = document.getElementById("users_List");
const tr = document.createElement('tr')

const countTd = document.createElement('td')
const nameTd = document.createElement('td')
const emailTd = document.createElement('td')
const roleTd = document.createElement('td')

const viewButton = document.createElement('button')
const updateButton = document.createElement('button')
const deleteButton = document.createElement('button')

countTd.innerHTML = count
nameTd.innerHTML = name
emailTd.innerHTML = email
roleTd.innerHTML = role

viewButton.innerHTML = 'View'
viewButton.addEventListener('click', () => {
   viewCategory(id, name, email, role);
})
updateButton.innerHTML = 'Edit'
updateButton.addEventListener('click', () => {
   updateCategory(id, name, email, role);
})
deleteButton.innerHTML = 'Delete'
deleteButton.addEventListener('click', () => {
   confirmDelete(id);
})

bTable.appendChild(tr)
tr.appendChild(countTd)
tr.appendChild(nameTd)
tr.appendChild(emailTd)
tr.appendChild(roleTd)

tr.appendChild(viewButton)
tr.appendChild(updateButton)
tr.appendChild(deleteButton)
}
const viewCategory = (searchId, name, email, password, role) =>{
console.log(window.localStorage.setItem("storageName",name));

location.href = 'attendant_profile.html?searchId='+searchId;
}
const updateCategory = (searchId, name, email, password, role) =>{
window.localStorage.setItem("storageName",name);
window.localStorage.setItem("storageEmail",email);
window.localStorage.setItem("storagePassword", password);
window.localStorage.setItem("storageRole",role);
location.href = 'modify_user.html?searchId='+searchId;
}
const confirmDelete = (id) => {
var r = window.confirm("Are you sure you want to delete");
if (r == true){
   delete_user(id);
}
else{
   result = document.getElementById("message");
   result.innerHTML= "delete cancelled";
}
}
const delete_user = (searchId) => {
console.log(searchId)
const url = 'http://127.0.0.1:8080/api/v1/users/'+parseInt(searchId);
const config = {
method : 'DELETE',
headers:{
   'content-type' : 'application/json',
   'Accept':'application/json',
   'x-access-token':localStorage.getItem('x-access-token')
},
mode:'cors'
}
fetch(url, config)
.then((response)=>{
status_code = response.status
return response.json()
}).then((response)=>{
result=document.getElementById('message')
if(status_code == 404){
result.innerHTML = "You have no users"
console.log(response)
}
if(status_code == 401){
alert('Your session has expired. please login again');
window.location='index.html'
}
else{
    result = document.getElementById("message");
    result.innerHTML= "response['user']";
    console.log(response['user']);
    window.location.reload()
}
})
.catch(error=>{
    result = document.getElementById("message"); 
    result.innerHTML= error;
    console.log(error)
});
}
function myFunction() {
var input, filter, table, tr, td, i;
input = document.getElementById("myInput");
filter = input.value.toUpperCase();
table = document.getElementById("myTable");
tr = table.getElementsByTagName("tr");
console.log(tr)
for (i = 0; i < tr.length; i++) {
 td = tr[i].getElementsByTagName("td")[1];
 if (td) {
   if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
     tr[i].style.display = "";
   } else {
     tr[i].style.display = "none";
   }
 }       
}
}