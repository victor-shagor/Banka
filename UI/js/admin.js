const error = document.querySelector('#error')
const post = document.querySelector('.table')
const token = localStorage.token
const getData = async (event)=> {
 event.preventDefault();
 if(token === ''){
  window.location.href = "../UI/signin.html"
 }
 else{
 const get = await fetch('http://localhost:3000/api/v1/accounts',
 {
  method: 'GET',
  headers: {
    'x-access-token': token
  }
 })
 const response = await get.json();
 // console.log(response);
 let output ='';
  
  
 
  response.data.forEach((post) =>{
  
   output += `
   <tr>
     <td><input type="submit" class ="delete" data-accountnumber=${post.accountnumber} id="verify"value="delete"></a></td>       
     <td>${post.accountnumber}</td>
     <td>${post.balance}</td>
     <td>${post.status}</td>
     <td><input type="submit" class ="active" data-accountnumber=${post.accountnumber} id="approval"value="active"><input type="submit" class ="dormant" data-accountnumber=${post.accountnumber} id="reject"value="dormant"></td>
     </tr>
    ` 
    
  
  })
  post.innerHTML = output;
 }
}

document.addEventListener('DOMContentLoaded' , getData);


const deleteAccount = async (event)=> {
 event.preventDefault();
 let account;
 if(event.target.classList.contains('delete')){
 account = event.target.dataset.accountnumber
 }
 if(token === ''){
  window.location.href = "../UI/signin.html"
 }
 else{
 const get = await fetch(`http://localhost:3000/api/v1/account/${account}`,
 {
  method: 'DELETE',
  headers: {
    'x-access-token': token
  },
 })
 const response = await get.json();
getData(event)
}
}
document.querySelector('#view').addEventListener('click', deleteAccount)

const activate = async (event)=> {
 event.preventDefault();
 let account;
 let data = {}
 if(event.target.classList.contains('active')){
  account = event.target.dataset.accountnumber
  data = {status: 'active'}
  }
  if(event.target.classList.contains('dormant')){
   account = event.target.dataset.accountnumber
   data = {status: 'dormant'}
   }
   if(token === ''){
    window.location.href = "../UI/signin.html"
   }
   else{
 const get = await fetch(`http://localhost:3000/api/v1/account/${account}`,
 {
  method: 'PATCH',
  headers: {
    'x-access-token': token,
    'Content-type' : 'application/json'
  },
  body: JSON.stringify(data)
 })
 const response = await get.json();
 getData(event)
}
}
document.querySelector('#view').addEventListener('click', activate)

const debit = async (event)=> {
 event.preventDefault();
 let amount = Number(document.querySelector('.damount').value)
 let account = Number(document.querySelector('.daccount').value)
 const data = {
  amount,
 }
 if(token === ''){
  window.location.href = "../UI/signin.html"
 }
 else{
 const get = await fetch(`http://localhost:3000/api/v1/transactions/${account}/debit`,
 {
  method: 'POST',
  headers: {
    'x-access-token': token,
    'Content-type' : 'application/json'
  },
  body: JSON.stringify(data)
 })
 const response = await get.json();
 if(response.status!==201){
  document.querySelector('.debit-error').innerHTML = response.error
  setTimeout(function(){
   document.querySelector('.debit-error').remove();
},3000)
 }
 else{
  document.querySelector('.debit-error').innerHTML = 'Account Credited Successfully'
  setTimeout(function(){
   document.querySelector('.debit-error').remove();
},3000)
 }
 document.querySelector('.debit-error').innerHTML = response.error
 document.querySelector('.damount').value = ''
 document.querySelector('.daccount').value = ''
 getData(event)
}
}
document.querySelector('.debit').addEventListener('click', debit)

const credit = async (event)=> {
 event.preventDefault();
 let amount = Number(document.querySelector('.amount').value)
 let account = Number(document.querySelector('.account').value)
 const data = {
  amount,
 }
 if(token === ''){
  window.location.href = "../UI/signin.html"
 }
 else{
 const get = await fetch(`http://localhost:3000/api/v1/transactions/${account}/credit`,
 {
  method: 'POST',
  headers: {
    'x-access-token': token,
    'Content-type' : 'application/json'
  },
  body: JSON.stringify(data)
 })
 const response = await get.json();
 if(response.status!==201){
  document.querySelector('.credit-error').innerHTML = response.error
  setTimeout(function(){
   document.querySelector('.credit-error').remove();
},3000)
 }
 else{
  document.querySelector('.credit-error').innerHTML = 'Account Credited Successfully'
  setTimeout(function(){
   document.querySelector('.credit-error').remove();
},3000)
 }
 document.querySelector('.amount').value = ''
 document.querySelector('.account').value = ''
 getData(event)
}
}
document.querySelector('.credit').addEventListener('click', credit)


const logout = () => {
 localStorage.token = ''
}
document.querySelector('.out').addEventListener('click' , logout);