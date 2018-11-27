let searchId = location.search.split('searchId=')[1]

const user_form =  document.getElementById('user-form')
user_form.addEventListener('submit', (evt) =>{
    evt.preventDefault()
    edit_user();
 });
 
 const edit_user = () =>{
    const user_name = document.getElementById('name').value;
    const user_email = document.getElementById('email').value;
    const user_password = document.getElementById('password').value;
    const user_role = document.getElementById('role').value;
    const url = 'http://127.0.0.1:8080/api/v1/users/'+parseInt(searchId);
    
    console.log(user_name, user_email, user_password, user_role,url);

    const config = {
        method : 'PUT',
        headers:{
            'content-type' : 'application/json',
            'Accept':'application/json',
            'x-access-token':localStorage.getItem('x-access-token')
        },
        mode:'cors',
        body:JSON.stringify({
           name: user_name,
           email: user_email,
           password: user_password,
           role:user_role
        })
    }
    fetch(url, config)
    .then((response) =>{
        status_code = response.status
        return response.json()
    }).then((response)=>{
           result = document.getElementById("message");
           if(status_code == 401){
               alert('Your session has expired. please login again');
               window.location='index.html'
           }
           else if(status_code == 422){
            result.style.color = 'red'
            result.innerHTML= response['message']
        }
        else if(status_code == 403){
           result.style.color = 'red'
           result.innerHTML= response['message']
        }
        else if(status_code == 404){
           result.style.color = 'red'
           result.innerHTML= response['message']
        }
        else{
           result.innerHTML= response['message']
           console.log(response['message']);
        }
    }).catch(error=>{
        console.log(error);
        alert(error)
    });
    
    }
const getUserName = () => {
    let user_name = document.getElementById('name');
    let user_email = document.getElementById('email');
    let user_password = document.getElementById('password');
    let user_role = document.getElementById('role');
    
    user_name.value = localStorage.getItem('storageName')
    user_email.value = localStorage.getItem('storageEmail')
    user_role.value = localStorage.getItem('storageRole')
    }