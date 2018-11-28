let searchId = location.search.split('searchId=')[1]
console.log(searchId)

const category_form =  document.getElementById('category_form')
category_form.addEventListener('submit', (evt) =>{
    evt.preventDefault()
    edit_category();
 });
 const edit_category = () =>{
     const category_name = document.getElementById('category_name').value;
     const url = 'http://127.0.0.1:8080/api/v1/categories/'+parseInt(searchId);
     const config = {
         method : 'PUT',
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
         if(status_code == 401){
            alert('Your session has expired. please login again');
            window.location='index.html'
        }
        else if(status_code == 400){
           result.style.color = 'red'
           result.innerHTML= response['not found']
           console.log(response['message']);
        }
         else if(status_code == 422){
             result.style.color = 'red'
             result.innerHTML= response['message']
             console.log(response['message']);
         }
         else if(status_code == 404){
            result.style.color = 'red'
            result.innerHTML= response['message']
            console.log(response['message']);
         }
         else if(status_code == 403){
            result.style.color = 'red'
            result.innerHTML= response['message']
            console.log(response['message']);
         }
         else{
            let category = document.getElementById('category_name')
            result.innerHTML= 'category, ' + response['message']['category'] + '  successfully updated'
            category.value= response['message']['category']
            console.log(response['message']);
         }
     }).catch(error=>{
         alert(error)
     });
     }
const getCategoryName = () => {
let category = document.getElementById('category_name')
category.value= localStorage.getItem('storageId')
}