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
Na programação, usamos uma ideia básica: se algo acontece, fazemos uma coisa; se não acontece, fazemos outra. O código para este jogo seria assim:
Jogadores = 4  
Robo = Conta 0  
Se Jogadores < 5:  
         Robo + Conta 10
  
Senão:  
         Robo + Conta 20
  
Aqui, temos 4 jogadores. O robô começa com 0 porque ainda não contou. Ele verifica:
Se há menos de 5 jogadores, soma 10.
Se há 5 ou mais, soma 20.
Como há 4 jogadores, o robô vai contar até 10!

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
