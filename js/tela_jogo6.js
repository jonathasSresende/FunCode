// Definindo a pergunta e as opções
const question = `Você está ajudando um robô a decidir se ele pode brincar no parque. Para isso, você precisa comparar a idade do robô com a idade mínima para brincar, que é 5 anos.

Se o robô tem 6 anos, ele pode brincar?
` ;
const options = [
    "Sim, porque ele é mais velho que 5 anos.", // Opção A (correta)
    "Não, porque ele é mais novo que 5 anos.",  // Opção B 
    "Sim, porque ele tem exatamente 5 anos.", // Opção C 
    "Não, porque ele não pode brincar."   // Opção D
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
    const correctIndex = 0; // O índice da resposta correta (Opção B)
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