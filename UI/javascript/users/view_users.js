let searchId = location.search.split('searchId=')[1]
console.log(searchId)

window.addEventListener('load', ()=>{
    generate_single_user();
    })
const generate_single_user = () =>{
    const url = 'http://127.0.0.1:8080/api/v1/users/'+parseInt(searchId);
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
        result.innerHTML = "You have no users"
    }
    if(status_code == 401){
        alert('Your session has expired. please login again');
        window.location='index.html'
    }
    else{
        let name = response['user']['name']
        let email = response['user']['email']
        let role = response['user']['role']
        // let Unit_price = response['product']['Unit_price']
        // let Total_price = response['product']['Total_price']
        // let date_created = response['product']['date_created']
        // let admin = response['product']['admin']
        createUserTable(name, email, role)
       
    }
    })
    .catch(error=>{
            alert(error)
        });
}

const createUserTable = (name, email, role) => {
    const name_tr = document.getElementById('nameUser')
    const email_tr = document.getElementById('userEmail')
    const role_tr = document.getElementById('role')
    // const Unit_price_tr = document.getElementById('unit_price')
    // const total_price_tr = document.getElementById('total_price')
    // const date_created_tr = document.getElementById('date_created')
    // const admin_tr = document.getElementById('admin')

    const name_td = document.createElement('td')
    const email_td = document.createElement('td')
    const role_td = document.createElement('td')
    // const unit_price_td = document.createElement('td')
    // const total_price__on_td = document.createElement('td')
    // const created_on_td = document.createElement('td')
    // const admin_on_td = document.createElement('td')

    name_td.innerHTML = name
    email_td.innerHTML = email
    role_td.innerHTML = role
    // unit_price_td.innerHTML = Unit_price
    // total_price__on_td.innerHTML = total_price
    // created_on_td.innerHTML = date_created
    // admin_on_td.innerHTML = admin

    name_tr.appendChild(name_td)
    email_tr.append(email_td)
    role_tr.appendChild(role_td)
    // Unit_price_tr.appendChild(unit_price_td)
    // total_price_tr.appendChild(total_price__on_td)
    // date_created_tr.append(created_on_td)
    // admin_tr.append(admin_on_td)
}

const getUserName = () =>{
    const user_name = document.getElementById('userName')
    user_name.innerHTML = ' User ['+localStorage.getItem('storageName') + '] details'
    console.log(localStorage.getItem('storageName'))
} 