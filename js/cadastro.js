
const API_URL = 'http://127.0.0.1:5000/criar_usuario_e_recurso';  // Alterado para a nova API

const userForm = document.getElementById('userForm');

// Fetch and display users (não será necessário após a alteração, mas você pode manter)
async function fetchUsers() {
  const response = await fetch(API_URL);
  const users = await response.json();
  console.log(users);
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
  console.log(data); // Exibe o usuário, trilha e recurso criados no console

  // Se a criação for bem-sucedida, faz o login do usuário
  if (data.user_id && data.trilha_id && data.recurso_id) {
      sessionStorage.setItem('usuario', JSON.stringify({
          nickname: user.nick_name,
          idade: user.idade,
          trilha_id: data.trilha_id,
          recurso_id: data.recurso_id  // Armazena o id do recurso também
      }));
      window.location.href = "index.html";
  } else {
      alert("Erro ao criar usuário, trilha ou recurso!");
  }
});
