const url = 'http://127.0.0.1:8080/api/v1/auth/signup';
const product_form =  document.getElementById('user-form')
product_form.addEventListener('submit', (evt) =>{
        evt.preventDefault()
        add_user();
     });
     const add_user = () =>{
         const user_name = document.getElementById('name').value;
         const user_email = document.getElementById('email').value;
         const user_password = document.getElementById('password').value;
         const confirm_password = document.getElementById('confirm_password').value;
         const user_role = document.getElementById('role').value;
        console.log(user_name);
         const config = {
             method : 'POST',
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
                confirm_password: confirm_password,
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
             else if(status_code == 400){
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
                result.innerHTML= response['message']['name'] + ' successfully registered'
                console.log(response['message']['name']);
             }
         }).catch(error=>{
             console.log(error);
            // result.innerHTML= error
             alert(error)
         });
         
         }