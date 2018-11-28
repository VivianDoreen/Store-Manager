let searchId = location.search.split('searchId=')[1]
console.log(searchId)

const product_form =  document.getElementById('pdt-form')
product_form.addEventListener('submit', (evt) =>{
    evt.preventDefault()
    edit_product();
 });
 const edit_product = () =>{
    const product_name = document.getElementById('product_name').value;
    const pdt_category = document.getElementById('pdt_category').value;
    const quantity = document.getElementById('quantity').value;
    const unit_price = document.getElementById('unit_price').value;

    const url = 'http://127.0.0.1:8080/api/v1/products/'+parseInt(searchId);
    const config = {
        method : 'PUT',
        headers:{
            'content-type' : 'application/json',
            'Accept':'application/json',
            'x-access-token':localStorage.getItem('x-access-token')
        },
        mode:'cors',
        body:JSON.stringify({
           product_name: product_name,
           category: pdt_category,
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
        if(status_code == 422){
            result.style.color = 'red'
            result.innerHTML= response['message']
            console.log(response['message'])
        }
        else if(status_code == 400){
           result.style.color = 'red'
           result.innerHTML= response['not found']
        }
        else if(status_code == 404){
           result.style.color = 'red'
           result.innerHTML= response['message']
        }
        else if(status_code == 403){
            result.style.color = 'red'
            result.innerHTML= response['message']
            console.log(response['message']);
            }
        else{
            let product = document.getElementById('message')
            product.innerHTML= 'product, ' + response['message']['product'] + '  successfully updated'
            console.log(response['message']);           
        }
    }).catch(error=>{
        alert(error)
    });
    
    }
const getProductName = () => {
    let product_tr = document.getElementById('product_name')
    let category_tr = document.getElementById('pdt_category')
    let quantity_tr = document.getElementById('quantity')
    let Unit_price_tr = document.getElementById('unit_price')

    product_tr.value= localStorage.getItem('product')
    category_tr.value= localStorage.getItem('category')
    quantity_tr.value= localStorage.getItem('quantity')
    Unit_price_tr.value= localStorage.getItem('Unit_price')
    }