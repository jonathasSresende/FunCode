const API_URL = 'http://127.0.0.1:5000/users';

const nome = document.querySelector("#nome");
const senha = document.querySelector("#senha");
const userForm = document.querySelector("#userForm");

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const response = await fetch(API_URL);
    const users = await response.json();

    console.log("Usuários recebidos:", users);

  


    // alert(users[0].ID)

    // NICK_NAME e  SENHA são os valores de nome do banco de dados
    const user = users.find(user => user.NICK_NAME === nome.value.trim() && user.SENHA === senha.value.trim());
    if (user) {
        console.log("Usuário autenticado:", user);
        // Verifique se o user contém o id
        console.log("ID do usuário:", user.ID); // Verifique se o 'id' existe no objeto

        // Esse é o Json
        sessionStorage.setItem('usuario', JSON.stringify({
            nickname: user.NICK_NAME,
            idade: user.idade,
            user_id: user.ID // Salve o id se ele existir
        }));

        window.location.href = "menu.html";
    } else {
        console.error("Usuário ou senha inválidos");
        alert("Usuário ou senha inválidos!");
    }
});
