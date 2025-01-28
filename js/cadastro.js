const API_URL = 'http://127.0.0.1:5000/users';
 
const userForm = document.getElementById('userForm');
 
 
 
// Fetch and display users
async function fetchUsers() {
 
  // fetch vai gerar uma promiss para acessar a API
  const response = await fetch(API_URL);
  // Trás os dados via API
  const users = await response.json();
 
  console.log(users)
}
 
 
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = {
      nick_name: document.getElementById('nick_name').value,
      senha: document.getElementById('senha').value,
      idade: parseInt(document.getElementById('idade').value)
  };
 
  const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  });
 
  const data = await response.json();
  console.log(data); // Exibe o usuário e a trilha criada no console
 
  fetchUsers();
  userForm.reset();
 
  if (data.user_id) {
      sessionStorage.setItem('usuario', JSON.stringify({
          nickname: user.nick_name,
          idade: user.idade,
          trilha: data.trilha
      }));
      window.location.href = "index.html";
  } else {
      alert("Erro ao criar usuário!");
  }
});