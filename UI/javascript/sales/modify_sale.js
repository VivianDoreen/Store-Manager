let searchId = location.search.split('searchId=')[1]
console.log(searchId)

const sale_form =  document.getElementById('sales-form')
sale_form.addEventListener('submit', (evt) =>{
    evt.preventDefault()
    edit_sale();
 });
 const edit_sale = () =>{
    const product_id = document.getElementById('pdt_code').value;
    const quantity = document.getElementById('quantity').value;
    const unit_price = document.getElementById('unit_price').value;

    const url = 'http://127.0.0.1:8080/api/v1/sales/'+parseInt(searchId);
    const config = {
        method : 'PUT',
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
        else{
            let product = document.getElementById('message')
            product.innerHTML= 'sale, ' + response['message']['product'] + '  successfully updated'
            console.log(response['message']);           
        }
    }).catch(error=>{
        alert(error)
    });
    
    }
const getSale = () => {
    let product_tr = document.getElementById('pdt_code')
    let quantity_tr = document.getElementById('quantity')
    let unit_price_tr = document.getElementById('unit_price')

    product_tr.value = window.localStorage.getItem("product");
    quantity_tr.value = window.localStorage.getItem("quantity");
    unit_price_tr.value = window.localStorage.getItem("unit_price");
    }