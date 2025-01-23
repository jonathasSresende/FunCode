// Definindo a pergunta e as opções
const question = `O robô está se preparando para uma grande aventura no Ártico! Ele precisa levar algumas coisas importantes na mala para se manter aquecido e confortável.

Se você pudesse escolher um item que o robô deve guardar na mala, qual seria?
` ;
const options = [
    "Uma blusa quentinha", // Opção A (correta)
    "Uma regata leve",  // Opção B 
    "Um chinelo confortável", // Opção C 
    "Uma prancha de surfe"   // Opção D
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
Quando programamos, muitas vezes precisamos guardar informações em algum lugar. Isso é útil para lembrar delas depois, levar para outro lugar ou usá-las quando for necessário.
Pense no Robô! Ele pode guardar coisas na mala para usar mais tarde. Olha só como seria:
Robo = "Nada na mala"
    Blusa Quentinha
    Chinelo Confortável
    Prancha de Surfe
    Regata Leve
Robo = "Blusa Quentinha"
Aqui, o Robô é o que chamamos de variável na programação.Dentro da variável Robo, guardamos a informação "Blusa Quentinha", assim ele poderá usá-la quando sentir frio no Ártico!
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


  // Função para atualizar a contagem de moedas
  function atualizarMoedas(novaQuantidade) {
    document.getElementById('moeda-count').innerText = novaQuantidade;
}

// Exemplo de chamada para atualizar as moedas
// Isso pode ser chamado após uma ação que incrementa as moedas
function incrementarMoedas() {
    // Aqui você pode fazer uma chamada para a API para obter a nova quantidade de moedas
    // Para este exemplo, vamos apenas incrementar um valor fixo
    let quantidadeAtual = parseInt(document.getElementById('moeda-count').innerText);
    let novaQuantidade = quantidadeAtual + 10; // Incrementa 10 moedas
    atualizarMoedas(novaQuantidade);
}

// Chame a função para incrementar as moedas quando necessário
// Por exemplo, após uma ação do usuário ou uma resposta da API
incrementarMoedas(); // Chame esta função quando você quiser incrementar as moedas

