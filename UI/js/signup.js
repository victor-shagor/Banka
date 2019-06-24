const signup = async (event) => {
 event.preventDefault();
 const error = document.querySelector('#error')
 const email = document.querySelector('.email').value
 const password = document.querySelector('.password').value
 const firstName = document.querySelector('.firstname').value
 const lastName = document.querySelector('.lastname').value

 const data = {
  email,
  password,
  firstName,
  lastName
  }
 const get = await fetch('http://localhost:3000/api/v1/auth/signup', 
 {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(data)
 }
 );
 const response = await get.json();
 if(response.status !==201){
  error.innerHTML = response.error
  if(response.status !==200){
    error.innerHTML = response.error
    setTimeout(function(){
     document.querySelector('.debit-error').remove();
  },3000)
   }
 }
 else{
  if(response.data.isadmin === true){
   window.location.href = "../UI/adminlogin.html"
  }
  else{window.location.href = "../UI/loginpage.html"}
 }
 localStorage.token = response.data.token
}
document.querySelector('.signup').addEventListener('click' , signup)
