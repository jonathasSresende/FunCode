// Definindo a pergunta e as opções
const question = `O robô que você programou está tentando acender uma luz, mas a luz não acende. 
Isso significa que algo está errado no código. O que você deve fazer para descobrir o problema?
` ;
const options = [
    "Ignorar o robô e brincar com outra coisa.", // Opção A 
    "Verificar o código do robô para ver se ele escreveu (acender) corretamente.",  // Opção B (correta)
    "Desligar o robô e deixá-lo de lado.", // Opção C 
    "Pedir para o robô tentar acender a luz de novo."   // Opção D
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
    const correctIndex = 1; // O índice da resposta correta (Opção B)
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