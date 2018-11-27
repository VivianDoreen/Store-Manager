window.addEventListener('load', ()=>{
generate_categories();
})
const generate_categories = () =>{
const url = 'http://127.0.0.1:8080/api/v1/categories';
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
    result.innerHTML = "You have no categories"
}
if(status_code == 401){
    alert('Your session has expired. please login again');
    window.location='index.html?name'+'vivian'
}
else{
    const categories = response['categories']
    categories.forEach((category, index) => {
        createCategoriesTable(index +1, category.id, category.category, category.admin, category.dateCreated)
    })
}
})
.catch(error=>{
        alert(error)
        console.log(error)
    });
    }
const createCategoriesTable = (count, id, category, admin, dateCreated) =>{
    const bTable = document.getElementById("categories");
    const tr = document.createElement('tr')

    const countTd = document.createElement('td')
    const categoryTd = document.createElement('td')
    const categoryDate = document.createElement('td')

    const viewButton = document.createElement('button')
    const updateButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    countTd.innerHTML = count
    categoryTd.innerHTML = category
    categoryDate.innerHTML = dateCreated

    viewButton.innerHTML = 'View'
    viewButton.addEventListener('click', () => {
        viewCategory(id, category, admin, dateCreated);
    })
    updateButton.innerHTML = 'Edit'
    updateButton.addEventListener('click', () => {
        updateCategory(id, category);
    })
    deleteButton.innerHTML = 'Delete'
    deleteButton.addEventListener('click', () => {
        confirmDelete(id);
    })

    bTable.appendChild(tr)
    tr.appendChild(countTd)
    tr.appendChild(categoryTd)
    tr.appendChild(categoryDate)
    tr.appendChild(viewButton)
    tr.appendChild(updateButton)
    tr.appendChild(deleteButton)
}

const viewCategory = (searchId, category, admin, dateCreated) =>{
    window.localStorage.setItem("storageId",category);
    location.href = 'view_category.html?searchId='+searchId;
}
const updateCategory = (searchId, category) =>{
    window.localStorage.setItem("storageId",category);
    location.href = 'modify_category.html?searchId='+searchId;
}
const confirmDelete = (id) => {
    var r = window.confirm("Are you sure you want to delete");
    if (r == true){
        delete_category(id);
    }
    else{
        result = document.getElementById("message");
        result.innerHTML= "delete cancelled";
    }
}
const delete_category = (searchId) => {
    console.log(searchId)
    const url = 'http://127.0.0.1:8080/api/v1/categories/'+parseInt(searchId);
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
    result.innerHTML = "You have no categories"
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