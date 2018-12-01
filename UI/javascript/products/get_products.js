         window.addEventListener('load', (evt) =>{
         evt.preventDefault()
         get_products();
         });

         const get_products = () =>{
         const url = 'http://127.0.0.1:8080/api/v1/products';
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
            result.innerHTML = "You have no products"
        }
        if(status_code == 401){
            alert('Your session has expired. please login again');
            window.location='index.html'
        }
        else{
            const product = response['ProductsList']
            product.forEach((product, index) => {
                generate_product_table(index+1, product.id, product.product, product.category, product.quantity, product.Unit_price, product.Total_price );
            } 
        );
        }
    })
        .catch(error=>{
            console.log(error);            
                // alert(error)
            });
         }

const generate_product_table = (count, id, product, category, quantity, Unit_price, Total_price) => {
    const bTable = document.getElementById("products_List");
    const tr = document.createElement('tr')

    const countTd = document.createElement('td')
    const productTd = document.createElement('td')
    const categoryTd = document.createElement('td')
    const quantityTd = document.createElement('td')
    const unit_priceTd = document.createElement('td')
    const total_priceTd = document.createElement('td')

    const viewButton = document.createElement('button')
    const updateButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    countTd.innerHTML = count
    productTd.innerHTML = product
    categoryTd.innerHTML = category
    quantityTd.innerHTML = quantity
    unit_priceTd.innerHTML = Unit_price
    total_priceTd.innerHTML = Total_price

    viewButton.innerHTML = 'View'
    viewButton.addEventListener('click', () => {
        viewCategory(id, product, category, quantity, Unit_price, Total_price);
    })
    updateButton.innerHTML = 'Edit'
    updateButton.addEventListener('click', () => {
        updateCategory(id, product, category, quantity, Unit_price, Total_price);
    })
    deleteButton.innerHTML = 'Delete'
    deleteButton.addEventListener('click', () => {
        confirmDelete(id);
    })

    bTable.appendChild(tr)
    tr.appendChild(countTd)
    tr.appendChild(productTd)
    tr.appendChild(categoryTd)
    tr.appendChild(quantityTd)
    tr.appendChild(unit_priceTd)
    tr.appendChild(total_priceTd)

    tr.appendChild(viewButton)
    tr.appendChild(updateButton)
    tr.appendChild(deleteButton)
}
const viewCategory = (searchId, category, admin, dateCreated) =>{
    window.localStorage.setItem("storageId",category);
    location.href = 'view_product.html?searchId='+searchId;
}
const updateCategory = (searchId, product, category, quantity, Unit_price, Total_price) =>{
    window.localStorage.setItem("product",product);
    window.localStorage.setItem("category",category);
    window.localStorage.setItem("quantity",quantity);
    window.localStorage.setItem("Unit_price",Unit_price);
    location.href = 'modify_product.html?searchId='+searchId;
}
const confirmDelete = (id) => {
    var r = window.confirm("Are you sure you want to delete");
    if (r == true){
        delete_product(id);
    }
    else{
        result = document.getElementById("message");
        result.innerHTML= "delete cancelled";
    }
}
const delete_product = (searchId) => {
    console.log(searchId)
    const url = 'http://127.0.0.1:8080/api/v1/products/'+parseInt(searchId);
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
    result.innerHTML = "You have no categories added"
}
if(status_code == 401){
    alert('Your session has expired. please login again');
    window.location='index.html'
}
else{
    result = document.getElementById("message");
    result.innerHTML= response['Message'];
    console.log(response['Message']);
    window.location.reload()
}
})
.catch(error=>{
    result.innerHTML= error;
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