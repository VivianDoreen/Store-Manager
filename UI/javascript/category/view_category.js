let searchId = location.search.split('searchId=')[1]
console.log(searchId)

window.addEventListener('load', ()=>{
    generate_single_category();
    })
const generate_single_category = () =>{
    const url = 'http://127.0.0.1:8080/api/v1/categories/'+parseInt(searchId);
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
        result.innerHTML = "You have no products added"
    }
    if(status_code == 401){
        alert('Your session has expired. please login again');
        window.location='index.html'
    }
    else{
        let category = response['categories']['category']
        let admin = response['categories']['admin']
        let date_created = response['categories']['date_created']
        createCategoriesTable(category, admin, date_created)
       
    }
    })
    .catch(error=>{
            alert(error)
        });
}

const createCategoriesTable = (category, admin, date_created) => {
    const category_tr = document.getElementById('categoryNane')
    const created_by_tr = document.getElementById('admin')
    const date_created_tr = document.getElementById('date_created')

    const category_td = document.createElement('td')
    const admin_td = document.createElement('td')
    const created_on_td = document.createElement('td')

    category_td.innerHTML = category
    admin_td.innerHTML = admin
    created_on_td.innerHTML = date_created

    category_tr.append(category_td)
    created_by_tr.append(admin_td)
    date_created_tr.append(created_on_td)
}

const getCategoryName = () =>{
    const category = document.getElementById('category')
    category.innerHTML = ' category ['+localStorage.getItem('storageId') + '] details'
    console.log(category)
} 
