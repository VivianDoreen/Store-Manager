const login_form =  document.getElementById('login-form')
login_form.addEventListener('submit', (evt) =>{
evt.preventDefault()
login_user();
});
const login_user = () =>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const url = 'https://b13challenge3.herokuapp.com/api/v1/auth/login';
    const config = {
        method : 'POST',
        headers:{
            'content-type' : 'application/json',
            'Accept':'application/json'
        },
        mode:'cors',
        body:JSON.stringify({
            email: email,
            password :password
        })
    }
    fetch(url, config)
    .then((response) =>{
        status_code = response.status
        return response.json()
    }).then((response)=>{
        if(status_code == 422){
            document.getElementById("error-msg").innerHTML= response['Error']
        }
        else if(status_code == 401){
            document.getElementById("error-msg").innerHTML= response['message']
        }
        else if(status_code == 404){
            document.getElementById("error-msg").innerHTML= response['message']
        }
        else{
            window.localStorage.setItem('x-access-token', response['x-access-token'])
            // window.location = 'admin.html'
            if ((response['role']) == 'admin'){
                window.location = 'admin.html'
            }
            if ((response['role']) == 'attendant'){
                window.location = 'attendant_page.html'
            }
                // window.location = 'admin.html'
                // console.log(response['role']);
        }

    }).catch(error=>{
        document.getElementById("error-msg").innerHTML= error
    });
}
module.exports = {
    login_user
}