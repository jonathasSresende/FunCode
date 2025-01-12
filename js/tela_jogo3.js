// Definindo a pergunta e as opções
const question = `Um robô quer ir até a Lua. Para isso, ele precisa dar pulos nos meteoros. Ele pode pular um meteoro por vez, e ele precisa dar 9 pulos para chegar à Lua.

Pergunta:
Qual das opções abaixo descreve a melhor maneira de fazer o robô dar 9 pulos?
`;
const options = [
    "Robô dá 10 pulos de uma vez só e chega à Lua.", // Opção A
    "Robô dá 1 pulo e depois volta para o início, repetindo isso até que ele se canse.",  // Opção B 
    "Robô dá 1 pulo e depois para. Ele não chega à Lua.", // Opção C
    "Robô dá 1 pulo, depois dá mais 1 pulo, e assim por diante, até dar 9 pulos."   // Opção D (correta)
];

let score = 0; // Inicializa a pontuação

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
    const correctIndex = 3; // O índice da resposta correta (Opção B)
    const resultMessage = document.createElement("div");
    resultMessage.className = "result-message";

    // Limpa mensagens anteriores
    const existingMessage = document.querySelector(".result-message");
    if (existingMessage) {
        existingMessage.remove();
    }

    if (selectedIndex === correctIndex) {
        score++;
        resultMessage.innerText = "Você Acertou!";
        
        // Botão para voltar à página anterior
        const backButton = document.createElement("button");
        backButton.innerText = "Voltar para o Menu";
        backButton.className = "btn btn-success d-flex row m-auto";
        backButton.onclick = function() {
            window.location.href = "./menu.html";
        };
        resultMessage.appendChild(backButton);
    } else {
        resultMessage.innerText = "Tente novamente!";
        
        // Adiciona um botão para reiniciar o jogo
        const restartButton = document.createElement("button");
        restartButton.innerText = "Reiniciar";
        restartButton.className = "btn btn-danger d-flex row m-auto ";
        restartButton.onclick = restartGame;
        resultMessage.appendChild(restartButton);
    }

    // Exibe a mensagem de resultado
    document.getElementById("game-container").appendChild(resultMessage);
    
    // Desabilita os botões após a resposta
    const optionsButtons = document.querySelectorAll(".option");
    optionsButtons.forEach(button => {
        button.disabled = true;
    });
}

// Função para reiniciar o jogo
function restartGame() {
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