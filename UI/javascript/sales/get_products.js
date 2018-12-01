let shoppingCart = [];

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
           generate_product_table(index+1, product.id, product.product, product.category, product.quantity, product.Unit_price );
       } 
   );
   }
})
   .catch(error=>{
       console.log(error);            
       });
    }

const generate_product_table = (count, id, product, category, quantity, Unit_price ) => {
const bTable = document.getElementById("products_List");
const tr = document.createElement('tr')

const countTd = document.createElement('td')
const productTd = document.createElement('td')
const categoryTd = document.createElement('td')
const quantityTd = document.createElement('td')
const unit_priceTd = document.createElement('td')

const addSaleButton = document.createElement('button')

countTd.innerHTML = count
productTd.innerHTML = product
categoryTd.innerHTML = category
quantityTd.innerHTML = quantity
unit_priceTd.innerHTML = Unit_price

addSaleButton.innerHTML = 'Add to cart'
addSaleButton.addEventListener('click', () => {
   addSale(id, product, category, quantity, Unit_price);
})

bTable.appendChild(tr)
tr.appendChild(countTd)
tr.appendChild(productTd)
tr.appendChild(categoryTd)
tr.appendChild(quantityTd)
tr.appendChild(unit_priceTd)

tr.appendChild(addSaleButton)
}

const addSale = (searchId, product, category, quantity, Unit_price) =>{

div_id = document.getElementById('form_sale')
pdt_id = document.getElementById('pdt_code')
pdt_id.value = searchId
pdt_name = document.getElementById('product_name')
pdt_name.value = product

// cart_total = document.getElementById('cart_total')
var singleProduct = {};
singleProduct.Name=product;
singleProduct.Description=quantity;
singleProduct.Price=Unit_price;
//Add newly created product to  cart 
shoppingCart.push(singleProduct);

// cart_total.innerHTML=shoppingCart

//call display function to show on screen
displayShoppingCart();
}

const displayShoppingCart = () =>{
    var orderedProductsTblBody=document.getElementById("orderedProductsTblBody");
    //ensure we delete all previously added rows from ordered products table
    while(orderedProductsTblBody.rows.length>0) {
        orderedProductsTblBody.deleteRow(0);
    }

    //variable to hold total price of shopping cart
    var cart_total_price=0;
    //iterate over array of objects
    for(var product in shoppingCart){
        //add new row      
        var row=orderedProductsTblBody.insertRow();
        //create three cells for product properties 
        var cellName = row.insertCell(0);
        var cellDescription = row.insertCell(1);
        var cellPrice = row.insertCell(2);
        cellPrice.align="right";
        //fill cells with values from current product 
        cellName.innerHTML = shoppingCart[product].Name;
        cellDescription.innerHTML = shoppingCart[product].Description;
        cellPrice.innerHTML = shoppingCart[product].Price;
        cart_total_price+=shoppingCart[product].Price;
    }
    //total sum of price
    document.getElementById("cart_total").innerHTML=cart_total_price;
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