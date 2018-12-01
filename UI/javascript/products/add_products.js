const url = 'http://127.0.0.1:8080/api/v1/products';
const product_form =  document.getElementById('pdt-form')
product_form.addEventListener('submit', (evt) =>{
        evt.preventDefault()
        add_product();
     });
     const add_product = () =>{
         const product_name = document.getElementById('product_name').value;
         const pdt_category = document.getElementById('pdt_category').value;
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
             if(status_code == 401){
                result.style.color = 'red'
                result.innerHTML= response['message']
                window.location='index.html'
                console.log(response);
                
            }
             else if(status_code == 422){
                 result.style.color = 'red'
                 result.innerHTML= response['message']
                 console.log(response['message']);
             }
             else if(status_code == 403){
                result.style.color = 'red'
                result.innerHTML= response['message']
                console.log("Already exists");
             }
             else if(status_code == 400){
                result.style.color = 'red'
                result.innerHTML= response['not found']
                console.log("wrong paran");
             }
             else if(status_code == 404){
                result.style.color = 'red'
                result.innerHTML= response['message']
                console.log("Not found");
             }
             else{
                result.innerHTML= 'product '+response['message']['product'] + ' successfully added'
                console.log("created");
             }
         }).catch(error=>{
             alert(error)
         });
         }
         