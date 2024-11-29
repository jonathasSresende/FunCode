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
 
// Exemplo de uso: Adiciona alguns usuários ao localStorage
// Você pode remover ou modificar isso para adicionar usuários de outra forma
saveUser('Usuario1', 25, 10);
saveUser('Usuario2', 30, 8);
saveUser('Usuario3', 22, 5);
 
// Carrega o ranking quando a página é carregada
window.onload = loadRanking;