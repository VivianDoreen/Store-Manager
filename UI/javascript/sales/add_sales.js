let searchId = location.search.split('searchId=')[1]
console.log(searchId)

const get_product_id = () =>{
    let product_id = document.getElementById('pdt_code')
    let product = document.getElementById('product')
    let unit_price = document.getElementById('pdt_unit_price')
    let pdt_quantity = document.getElementById('pdt_quantity')

    product_id.value = searchId
    product.innerHTML = 'Product name: '+localStorage.getItem('product')
    unit_price.innerHTML = 'Purchase unit price: '+localStorage.getItem('Unit_price')
    pdt_quantity.innerHTML = 'Available products: '+localStorage.getItem('quantity')
}

const url = 'http://127.0.0.1:8080/api/v1/sales';
const sales_form =  document.getElementById('sales_form_add')
sales_form.addEventListener('submit', (evt) =>{
        evt.preventDefault()
        add_sale();
     });
     const add_sale = () =>{
         const product_id = document.getElementById('pdt_code').value;
         const quantity = document.getElementById('quantity').value;
         const unit_price = document.getElementById('unit_price').value;

         const config = {
             method : 'POST',
             headers:{
                 'content-type' : 'application/json',
                 'Accept':'application/json',
                 'x-access-token':localStorage.getItem('x-access-token')
             },
             mode:'cors',
             body:JSON.stringify({
                products_id: product_id,
                quantity: quantity,
                unit_price: unit_price
             })
         }
         fetch(url, config)
         .then((response) =>{
             status_code = response.status
             return response.json()
         }).then((response)=>{
             result = document.getElementById("message");
             if(status_code == 401){
                result.style.color = 'red'
                result.innerHTML= 'Your session has expired. please login again'
            }
             else if(status_code == 422){
                 result.style.color = 'red'
                 result.innerHTML= response['message']
             }
             else if(status_code == 400){
                result.style.color = 'red'
                result.innerHTML= response['not found']
             }
             else if(status_code == 404){
                result.style.color = 'red'
                result.innerHTML= response['message']
             }
             else{
                result.innerHTML= 'product'+ response['message']['product']+'Sold'
                console.log(response['message']['product']);
             }
         }).catch(error=>{
             alert(error)
         });
       }