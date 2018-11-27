const logout_link = document.getElementById('logout_link')
  logout_link.addEventListener('click', (event) =>{
    event.preventDefault()
    logoutUser();
  })
const logoutUser = () => {
    localStorage.removeItem('x-access-token')
    window.location="index.html"
}
