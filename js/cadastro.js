const API_URL = 'http://127.0.0.1:5000/users';
 
const userForm = document.getElementById('userForm');



// Fetch and display users
async function fetchUsers() {
 
  // fetch vai gerar uma promiss para acessar a API
  const response = await fetch(API_URL);
  // Trás os dados via API
  const users = await response.json();
  userTable.innerHTML = '';
  users.forEach(user => {
      userTable.innerHTML += `
          <tr>
              <td>${user.nick_name}</td>
              <td>${user.senha}</td>
              <td>${user.idade}</td>
              <td>
                  <button onclick="editUser(${user.id}, '${user.nick_name}', '${user.senha}', ${user.idade})">Edit</button>
                  <button onclick="deleteUser(${user.id})">Delete</button>
              </td>
          </tr>
      `;
  });
}






// Add a new user
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = {
    nick_name: document.getElementById('nick_name').value,
    senha: document.getElementById('senha').value,
    idade: parseInt(document.getElementById('idade').value)
  };
  await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  });
  fetchUsers();
  userForm.reset();
});

