const url = 'http://127.0.0.1:8080/api/v1/categories';
const category_form =  document.getElementById('category_form')
    category_form.addEventListener('submit', (evt) =>{
        evt.preventDefault()
        add_category();
     });
     const add_category = () =>{
         const category_name = document.getElementById('category_name').value;
         const config = {
             method : 'POST',
             headers:{
                 'content-type' : 'application/json',
                 'Accept':'application/json',
                 'x-access-token':localStorage.getItem('x-access-token')
             },
             mode:'cors',
             body:JSON.stringify({
                category: category_name,
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
                result.innerHTML= response['message']
             }
         }).catch(error=>{
             alert(error)
         });
         
         }