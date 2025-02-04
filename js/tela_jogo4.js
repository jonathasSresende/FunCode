// // Definindo a pergunta e as opções
// const question = `Imagine que você tem um robô muito inteligente! Esse robô adora fazer contas. Sempre que você dá um número para ele, ele pega esse número e soma com o dobro desse número.

// Por exemplo, se você der o número 3, o robô faz assim:

// Primeiro, ele calcula o dobro de 3, que é 6.
// Depois, ele soma 3 + 6, que dá 9.
// Agora, se você der os números 5, 2 e 10 para o robô, quais números ele vai devolver?
// ` ;
// const options = [
//     "10, 4, 20", // Opção A
//     "25, 4, 100",  // Opção B 
//     "15, 6, 30", // Opção C (correta)
//     "12, 10, 30"   // Opção D
// ];

// let score = 0; // Inicializa a pontuação

// // Função para iniciar o jogo
// function startGame() {
//     document.getElementById("question").innerText = question;
//     const optionsButtons = document.querySelectorAll(".option");
//     optionsButtons.forEach((button, index) => {
//         button.innerText = options[index];
//     });
// }

// // Função para verificar a resposta
// function checkAnswer(selectedIndex) {
//     const correctIndex = 2; // O índice da resposta correta (Opção B)

//     // Lógica para abrir o modal com a resposta
//     const modal = document.getElementById("resultModal");
//     const modalMessage = document.getElementById("modalMessage");
//     const modalButtonContainer = document.getElementById("modalButtonContainer");

//     // Limpa os botões do modal antes de adicionar novos
//     modalButtonContainer.innerHTML = '';

//     if (selectedIndex === correctIndex) {
//         score++;
//         modalMessage.innerText = `Você Acertou!
// EXPLICAÇÃO:
// O universo dos computadores está totalmente ligado com a matematica. Em varios codigos é necessario fazer calculos, no nosso caso temos um calculo com tres partes. E o codigo seria assim:
// Numero_do_Robo = 5 
// Dobro= 0
// Resultado = 0
// Dobro = Numero_do_Robo x 2
// Resultado = Dobro + Numero_do_Robo
// Resultado é 15
// -----------------------------------------------------------
// Numero_do_Robo = 2
// Dobro= 0
// Resultado = 0
// Dobro = Numero_do_Robo x 2
// Resultado = Dobro + Numero_do_Robo
// Resultado é 6
// -----------------------------------------------------------
// Numero_do_Robo = 10
// Dobro= 0
// Resultado = 0
// Dobro = Numero_do_Robo x 2
//         `;

//         // Botão para voltar ao menu
//         const backButton = document.createElement("button");
//         backButton.innerText = "Voltar para o Menu";
//         backButton.className = "btn btn-success";
//         backButton.onclick = function() {
//             window.location.href = "./menu.html";
//         };
//         modalButtonContainer.appendChild(backButton);
//     } else {
//         modalMessage.innerText = "Tente novamente!";

//         // Botão para reiniciar o jogo
//         const restartButton = document.createElement("button");
//         restartButton.innerText = "Reiniciar";
//         restartButton.className = "btn btn-danger";
//         restartButton.onclick = restartGame;
//         modalButtonContainer.appendChild(restartButton);
//     }

//     // Exibe o modal
//     modal.style.display = "flex";

//     // Desabilita os botões de opção após a resposta
//     const optionsButtons = document.querySelectorAll(".option");
//     optionsButtons.forEach(button => {
//         button.disabled = true;
//     });
// }

// // Função para reiniciar o jogo
// function restartGame() {
//     // Fecha o modal
//     const modal = document.getElementById("resultModal");
//     modal.style.display = "none"; // Fecha o modal

//     // Limpa a mensagem de resultado
//     const resultMessage = document.querySelector(".result-message");
//     if (resultMessage) {
//         resultMessage.remove();
//     }

//     // Habilita os botões novamente
//     const optionsButtons = document.querySelectorAll(".option");
//     optionsButtons.forEach(button => {
//         button.disabled = false;
//     });

//     // Reinicia a pontuação e a pergunta
//     score = 0;
//     document.getElementById("score").innerText = "Pontuação: " + score;
//     startGame();
// }




// // Inicia o jogo ao carregar a página
// window.onload = startGame;


// //-----------------------------------------------------

//   // Função para atualizar a contagem de moedas
//   function atualizarMoedas(novaQuantidade) {
//       document.getElementById('moeda-count').innerText = novaQuantidade;
//   }

//   // Exemplo de chamada para atualizar as moedas
//   // Isso pode ser chamado após uma ação que incrementa as moedas
//   function incrementarMoedas() {
//       // Aqui você pode fazer uma chamada para a API para obter a nova quantidade de moedas
//       // Para este exemplo, vamos apenas incrementar um valor fixo
//       let quantidadeAtual = parseInt(document.getElementById('moeda-count').innerText);
//       let novaQuantidade = quantidadeAtual + 10; // Incrementa 10 moedas
//       atualizarMoedas(novaQuantidade);
//   }

//   // Chame a função para incrementar as moedas quando necessário
//   // Por exemplo, após uma ação do usuário ou uma resposta da API
//   incrementarMoedas(); // Chame esta função quando você quiser incrementar as moedas


// Definindo a pergunta e as opções
const question = `Imagine que você tem um robô muito inteligente! Esse robô adora fazer contas. Sempre que você dá um número para ele, ele pega esse número e soma com o dobro desse número.

Por exemplo, se você der o número 3, o robô faz assim:

Primeiro, ele calcula o dobro de 3, que é 6.
Depois, ele soma 3 + 6, que dá 9.
Agora, se você der os números 5, 2 e 10 para o robô, quais números ele vai devolver?
` ;
const options = [
    "10, 4, 20", // Opção A
    "25, 4, 100",  // Opção B 
    "15, 6, 30", // Opção C (correta)
    "12, 10, 30"   // Opção D
];

let score = 0; // Inicializa a pontuação

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

// Função para iniciar o jogo
function startGame() {
    document.getElementById("question").innerText = question;
    const optionsButtons = document.querySelectorAll(".option");
    optionsButtons.forEach((button, index) => {
        button.innerText = options[index];
    });
}

// Função para verificar a resposta
function checkAnswer(selectedIndex) {
    const correctIndex = 2; // O índice da resposta correta (Opção C)

    // Lógica para abrir o modal com a resposta
    const modal = document.getElementById("resultModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalButtonContainer = document.getElementById("modalButtonContainer");

    // Limpa os botões do modal antes de adicionar novos
    modalButtonContainer.innerHTML = '';

    if (selectedIndex === correctIndex) {
        score++;

        // Atualiza os recursos do usuário ao acertar
        if (trilhaId) {
            atualizarRecursoAoAcertar(trilhaId);
        } else {
            console.error("Trilha ID não encontrado.");
        }

        modalMessage.innerText = `Você Acertou!
EXPLICAÇÃO:
O universo dos computadores está totalmente ligado com a matematica. Em varios codigos é necessario fazer calculos, no nosso caso temos um calculo com tres partes. E o codigo seria assim:
Numero_do_Robo = 5 
Dobro= 0
Resultado = 0
Dobro = Numero_do_Robo x 2
Resultado = Dobro + Numero_do_Robo
Resultado é 15
-----------------------------------------------------------
Numero_do_Robo = 2
Dobro= 0
Resultado = 0
Dobro = Numero_do_Robo x 2
Resultado = Dobro + Numero_do_Robo
Resultado é 6
-----------------------------------------------------------
Numero_do_Robo = 10
Dobro= 0
Resultado = 0
Dobro = Numero_do_Robo x 2
        `;

        // Botão para voltar ao menu
        const backButton = document.createElement("button");
        backButton.innerText = "Voltar para o Menu";
        backButton.className = "btn btn-success";
        backButton.onclick = function() {
            window.location.href = "./menu.html";
        };
        modalButtonContainer.appendChild(backButton);
    } else {
        modalMessage.innerText = "Tente novamente!";

        // Botão para reiniciar o jogo
        const restartButton = document.createElement("button");
        restartButton.innerText = "Reiniciar";
        restartButton.className = "btn btn-danger";
        restartButton.onclick = restartGame;
        modalButtonContainer.appendChild(restartButton);
    }

    // Exibe o modal
    modal.style.display = "flex";

    // Desabilita os botões de opção após a resposta
    const optionsButtons = document.querySelectorAll(".option");
    optionsButtons.forEach(button => {
        button.disabled = true;
    });
}

// Função para atualizar recursos ao acertar a questão
function atualizarRecursoAoAcertar(trilhaId) {
    fetch(RECURSOS_API_URL + trilhaId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            MOEDA: 10 // Adiciona 10 moedas ao usuário
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Recurso atualizado com sucesso:", data);
        
        // Atualiza a interface após a atualização do recurso
        if (data.MOEDA !== undefined) {
            atualizarMoedas(data.MOEDA);
        }
    })
    .catch(error => console.error("Erro ao atualizar recurso:", error));
}

// Função para atualizar a contagem de moedas na interface
function atualizarMoedas(novaQuantidade) {
    document.getElementById('moeda-count').innerText = novaQuantidade;
}

// Função para reiniciar o jogo
function restartGame() {
    const modal = document.getElementById("resultModal");
    modal.style.display = "none"; // Fecha o modal

    // Limpa a mensagem de resultado
    const resultMessage = document.querySelector(".result-message");
    if (resultMessage) {
        resultMessage.remove();
    }

    // Habilita os botões novamente
    const optionsButtons = document.querySelectorAll(".option");
    optionsButtons.forEach(button => {
        button.disabled = false;
    });

    // Reinicia a pontuação e a pergunta
    score = 0;
    document.getElementById("score").innerText = "Pontuação: " + score;
    startGame();
}

// Inicia o jogo ao carregar a página
window.onload = startGame;
