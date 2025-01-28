// Definindo a pergunta e as opções
const question = `Um robô quer ir até a Lua. Para isso, ele precisa dar pulos nos meteoros. Ele pode pular um meteoro por vez, e ele precisa dar 10 pulos para chegar à Lua.

Pergunta:
Qual das opções abaixo descreve a melhor maneira de fazer o robô dar 10 pulos?
`;
const options = [
    "Robô dá 10 pulos de uma vez só e chega à Lua.", // Opção A
    "Robô dá 1 pulo e depois volta para o início, repetindo isso até que ele se canse.",  // Opção B 
    "Robô dá 1 pulo e depois para. Ele não chega à Lua.", // Opção C
    "Robô dá 1 pulo, depois dá mais 1 pulo, e assim por diante, até dar 10 pulos."   // Opção D (correta)
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
        modalMessage.innerText = ` Você Acertou!
EXPLICAÇÃO:
Na programação, muitas vezes precisamos repetir uma ação várias vezes. Em vez de escrever o mesmo comando várias vezes, usamos algo chamado laço de repetição (ou loop). Ele faz a mesma coisa várias vezes automaticamente!
O código para o robô dar 10 pulos seria assim:
Robo = 0  Meteoros
Enquanto Robo < 10:  
         Robo + Pula 1 meteoro  
  
Robo CHEGOU na Lua! 
Aqui está o que acontece no código:
Começamos com o robô tendo feito 0 pulos.
Enquanto o robô não tiver pulado 10 meteoros ele não irá para de pular.A cada pulo, o robô pula 1 meteoro.Quando o robô chegar a 10 pulos, ele para e comemora na Lua! 🚀
Usar laços de repetição é uma maneira mais rápida e inteligente de repetir coisas. Muito melhor do que escrever tudo várias vezes, não é?

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


//-----------------------------------------------------

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
