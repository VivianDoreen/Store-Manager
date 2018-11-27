window.addEventListener('load', (evt) =>{
    evt.preventDefault()
    get_sales();
    });

    const get_sales = () =>{
    const url = 'http://127.0.0.1:8080/api/v1/sales';
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
       result.innerHTML = response['sales']
   }
   if(status_code == 401){
       alert('Your session has expired. please login again');
       window.location='index.html'
   }
   else{
       const sales = response['sales']
       sales.forEach((sale, index) => {
           generate_sales_table(index+1, sale.id, sale.product, sale.quantity, sale.unit_price, sale.total_price);
       } 
   );
   }
})
   .catch(error=>{
       console.log(error);            
           // alert(error)
       });
    }

const generate_sales_table = (count, id, product, quantity, Unit_price, total_price) => {
const bTable = document.getElementById("sales_list");
const tr = document.createElement('tr')

const countTd = document.createElement('td')
const productTd = document.createElement('td')
const quantityTd = document.createElement('td')
const unit_priceTd = document.createElement('td')
const total_priceTd = document.createElement('td')

const viewButton = document.createElement('button')
const updateButton = document.createElement('button')

countTd.innerHTML = count
productTd.innerHTML = product
quantityTd.innerHTML = quantity
unit_priceTd.innerHTML = Unit_price
total_priceTd.innerHTML = total_price

viewButton.innerHTML = 'View'
viewButton.addEventListener('click', () => {
   viewSale(id, product, quantity, Unit_price, total_price);
})
updateButton.innerHTML = 'Edit'
updateButton.addEventListener('click', () => {
   updateSale(id, product, quantity, Unit_price, total_price);
})

bTable.appendChild(tr)
tr.appendChild(countTd)
tr.appendChild(productTd)
tr.appendChild(quantityTd)
tr.appendChild(unit_priceTd)
tr.appendChild(total_priceTd)

tr.appendChild(viewButton)
tr.appendChild(updateButton)
}
const viewSale = (searchId, product, quantity, Unit_price, total_price) =>{
window.localStorage.setItem("storageId",product);
location.href = 'view_sales.html?searchId='+searchId;
}
const updateSale = (searchId, product, quantity, unit_price, total_price) =>{
window.localStorage.setItem("product",product);
window.localStorage.setItem("quantity",quantity);
window.localStorage.setItem("unit_price",unit_price);

location.href = 'modify_sale.html?searchId='+searchId;
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