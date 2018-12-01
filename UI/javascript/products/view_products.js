let searchId = location.search.split('searchId=')[1]
console.log(searchId)

window.addEventListener('load', ()=>{
    generate_single_category();
    })
const generate_single_category = () =>{
    const url = 'http://127.0.0.1:8080/api/v1/products/'+parseInt(searchId);
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
        let product = response['product']['product']
        let category = response['product']['category']
        let quantity = response['product']['quantity']
        let Unit_price = response['product']['Unit_price']
        let Total_price = response['product']['Total_price']
        let date_created = response['product']['date_created']
        let admin = response['product']['admin']
        createCategoriesTable(product, category, quantity, Unit_price, Total_price, date_created, admin)
       
    }
    })
    .catch(error=>{
            alert(error)
        });
}

const createCategoriesTable = (product, category, quantity, Unit_price, total_price, date_created, admin) => {
    const product_tr = document.getElementById('productNane')
    const category_tr = document.getElementById('pdtcategory')
    const quantity_tr = document.getElementById('quantity')
    const Unit_price_tr = document.getElementById('unit_price')
    const total_price_tr = document.getElementById('total_price')
    const date_created_tr = document.getElementById('date_created')
    const admin_tr = document.getElementById('admin')

    const product_td = document.createElement('td')
    const category_td = document.createElement('td')
    const quantity_td = document.createElement('td')
    const unit_price_td = document.createElement('td')
    const total_price__on_td = document.createElement('td')
    const created_on_td = document.createElement('td')
    const admin_on_td = document.createElement('td')

    product_td.innerHTML = product
    category_td.innerHTML = category
    quantity_td.innerHTML = quantity
    unit_price_td.innerHTML = Unit_price
    total_price__on_td.innerHTML = total_price
    created_on_td.innerHTML = date_created
    admin_on_td.innerHTML = admin

    product_tr.appendChild(product_td)
    category_tr.append(category_td)
    quantity_tr.appendChild(quantity_td)
    Unit_price_tr.appendChild(unit_price_td)
    total_price_tr.appendChild(total_price__on_td)
    date_created_tr.append(created_on_td)
    admin_tr.append(admin_on_td)
}

// const getCategoryName = () =>{
//     const category = document.getElementById('product')
//     category.innerHTML = ' category ['+localStorage.getItem('storageId') + '] details'
//     console.log(category)
// } 
