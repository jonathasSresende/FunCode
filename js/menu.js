// // const TRILHA_RECURSO_URL = 'http://127.0.0.1:5000/user_trilha_recurso/'; // Nova URL da API

// const coracao = document.querySelector("#coracao-count");
// const moeda = document.querySelector("#moeda-count");
// const diamante = document.querySelector("#diamante-count");

// // Função para carregar dados do sessionStorage ao carregar a página
// window.onload = function() {
//     const usuarioData = JSON.parse(sessionStorage.getItem('usuario'));
    
//     if (usuarioData) {
//         console.log("Dados do usuário carregados do sessionStorage:", usuarioData);

//         // Carregar os dados de Trilha e Recurso
//         const trilhaRecurso = usuarioData.trilha_recurso;
//         console.log(trilhaRecurso)
//         // Exibir os valores de corações, moedas e diamantes
//         coracao.textContent = trilhaRecurso.coracao;
//         moeda.textContent = trilhaRecurso.moeda;
//         diamante.textContent = trilhaRecurso.diamante;
//     } else {
//         console.error("Dados do usuário não encontrados no sessionStorage");
//     }
// };