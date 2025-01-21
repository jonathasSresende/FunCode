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
    const correctIndex = 2; // O índice da resposta correta (Opção B)

    // Lógica para abrir o modal com a resposta
    const modal = document.getElementById("resultModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalButtonContainer = document.getElementById("modalButtonContainer");

    // Limpa os botões do modal antes de adicionar novos
    modalButtonContainer.innerHTML = '';

    if (selectedIndex === correctIndex) {
        score++;
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

// Função para fechar o modal quando clicar no "X"
document.getElementById("closeModalBtn").onclick = function() {
    const modal = document.getElementById("resultModal");
    modal.style.display = "none"; // Fecha o modal
};

// Função para fechar o modal se o usuário clicar fora da área do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById("resultModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Inicia o jogo ao carregar a página
window.onload = startGame;
