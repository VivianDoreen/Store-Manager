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
        result.innerHTML = "You have no products added"
    }
    if(status_code == 401){
        alert('Your session has expired. please login again');
        window.location='index.html'
    }
    else{
        // console.log(response['categories']);
        const categories = response['categories']
        categories.forEach((category, index) => {
            createCategoriesTable(index +1, category.id, category.category, category.admin, category.dateCreated)
        })
    }
    })
    .catch(error=>{
            alert(error)
        });
        }
    const createCategoriesTable = (count, id, category, admin, dateCreated) =>{
        const bTable = document.getElementById("categories");
        const tr = document.createElement('tr')
    
        const countTd = document.createElement('td')
        const categoryTd = document.createElement('td')
        const categoryDate = document.createElement('td')
    
        countTd.innerHTML = count
        categoryTd.innerHTML = category
        categoryDate.innerHTML = dateCreated
    
        bTable.appendChild(tr)
        tr.appendChild(countTd)
        tr.appendChild(categoryTd)
        tr.appendChild(categoryDate)
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