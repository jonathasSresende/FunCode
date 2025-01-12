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