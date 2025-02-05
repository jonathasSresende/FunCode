// async function loadRanking() {
//     try {
//         const response = await fetch('http://localhost:5000/users'); // URL da sua API
//         const users = await response.json(); // Supondo que a resposta seja um JSON
 
//         // Ordena os usuários por pontos em ordem decrescente
//         users.sort((a, b) => b.pontos - a.pontos); // Certifique-se de que a chave 'pontos' exista
 
//         const tbody = document.querySelector('tbody');
//         tbody.innerHTML = ''; // Limpa a tabela atual
 
//         users.forEach((user, index) => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${index + 1}</td>
//                 <td>${user.nick_name}</td> <!-- Use o nome correto da chave -->
//                 <td>${user.idade}</td> <!-- Use o nome correto da chave -->
//                 <td>${score}</td> <!-- Use o nome correto da chave ou 0 se não existir -->
//             `;
//             tbody.appendChild(row);
//         });
//     } catch (error) {
//         console.error('Erro ao carregar o ranking:', error);
//     }
// }
 
// // Carrega o ranking quando a página é carregada
// window.onload = loadRanking;

// Exemplo de uso: Adiciona alguns usuários ao localStorage
// Você pode remover ou modificar isso para adicionar usuários de outra forma
// saveUser('Usuario1', 25, 10);
// saveUser('Usuario2', 30, 8);
// saveUser('Usuario3', 22, 5);



// Função para salvar usuários no localStorage
function saveUser(nickname, age, points) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ nickname, age, points });
    localStorage.setItem('users', JSON.stringify(users));
}
 
// Função para carregar e exibir o ranking
function loadRanking() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
   
    // Ordena os usuários por pontos em ordem decrescente
    users.sort((a, b) => b.points - a.points);
 
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa a tabela atual
 
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.nickname}</td>
            <td>${user.age}</td>
            <td>${user.points}</td>
        `;
        tbody.appendChild(row);
    });
}
 





 
// Carrega o ranking quando a página é carregada
window.onload = loadRanking;






// URL da API de recursos
const RECURSOS_API_URL = 'http://127.0.0.1:5000/recursos/';

// Obtém os dados do usuário do sessionStorage
const usuarioData = JSON.parse(sessionStorage.getItem('usuario'));
let trilhaId = null;

if (usuarioData && usuarioData.user_id) {
    const id_usuario = usuarioData.user_id;

    // Faz o fetch para obter os dados de trilha e recurso do usuário
    fetch(`http://127.0.0.1:5000/user_trilha_recurso/${id_usuario}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const trilhaRecurso = data[0];
                trilhaId = trilhaRecurso.trilha_id;

                // Atualiza os valores na interface
                document.querySelector("#coracao-count").textContent = trilhaRecurso.CORACAO;
                document.querySelector("#moeda-count").textContent = trilhaRecurso.MOEDA;
                document.querySelector("#diamante-count").textContent = trilhaRecurso.DIAMANTE;
            } else {
                console.error("Nenhum dado encontrado para o usuário.");
            }
        })
        .catch(error => console.error("Erro ao obter trilha e recurso:", error));
} else {
    console.error("ID do usuário não encontrado no sessionStorage.");
}
