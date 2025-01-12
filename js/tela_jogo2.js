// Definindo a pergunta e as opções
const question = `O robo adora brincar de esconde-esconde. 
Ele tem uma regra especial para decidir se ele deve contar até 10 ou até 20 antes de começar a procurar. A regra é a seguinte:

Se o número de jogadores for menor que 5, Robo conta até 10.
Senao Robo conta até 20.

Se o número de jogadores for 4, até que número Robo vai contar?`;
const options = [
    "5 segundos", // Opção A
    "10 segundos",  // Opção B (correta)
    "15 segundos", // Opção C
    "20 segundos"   // Opção D
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