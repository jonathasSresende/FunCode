const API_URL = 'http://127.0.0.1:5000/users';


const nome=document.querySelector("#nome");
const senha=document.querySelector("#senha");
const userForm=document.querySelector("#userForm");

  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch(API_URL);
    // Trás os dados via API
    const users = await response.json();

    const user = users.find(user => user.NICK_NAME === nome.value && user.SENHA === senha.value);

    if (user) {
        // Se o usuário for encontrado, cria a sessão e redireciona para o menu
        sessionStorage.setItem('usuario', {
          nickname: user.NICK_NAME,
          idade: user.idade});  // Armazena na sessão local do navegador (sessionStorage)
        window.location.href = "menu.html";  // Redireciona para a página menu.html
    } else {
        alert("Usuário ou senha inválidos!");
    }

  })