const post = document.querySelector('#view')
const token = localStorage.token
const create = async (event)=> {
 event.preventDefault();
 if(token === ''){
  window.location.href = "../UI/signin.html"
 }
 else{
 const get = await fetch('https://banka-victor.herokuapp.com/api/v1/accounts',
 {
  method: 'POST',
  headers: {
    'x-access-token': token
  }
 })
 const response = await get.json();
 const output = `
   <table>
   <thead>
   <tr>
     <th>Account Number</th>
    <th>Balance</th>
    <th>Account type</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>${response.data.accountNumber}</td>       
     <td>${response.data.openingBalance}</td>
     <td>${response.data.type}</td> 
     
      </tr>
     </tbody>
  </table>
    ` 
  post.innerHTML =output;
}
  
}
document.querySelector('.create').addEventListener('click' , create);

const logout = () => {
  localStorage.token = ''
}
document.querySelector('.out').addEventListener('click' , logout);