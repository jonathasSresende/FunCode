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

  if (user) {
    // Se o usuário for encontrado, cria a sessão e redireciona para o menu
    sessionStorage.setItem('usuario', {
      nickname: user.NICK_NAME,
      idade: user.idade});  // Armazena na sessão local do navegador (sessionStorage)
    window.location.href = "index.html";  // Redireciona para a página menu.html
} else {
    alert("Usuário e senha inválidos!");
}
});


