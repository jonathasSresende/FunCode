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
No dia a dia, nós fazemos muitas comparações:
Se um amigo é mais alto ou mais baixo que a gente. 
Se um número é par ou ímpar. 
Se está frio usamos blusa, se está calor usamos shorts. 
Na programação, também precisamos comparar coisas, e usamos alguns símbolos para isso
= significa "é igual a" 
< significa "é menor que"
<= significa "é menor ou igual a"
> significa "é maior que"
>= significa "é maior ou igual a"
!= significa "é diferente de"
Nosso Robô fez uma comparação assim para saber se podia brincar no parque:
idade_robo = 6
idade_minima = 5
Se idade_robo >= idade_minima:
    O Robô pode brincar no parque! 
Senão:
    O Robô ainda não pode brincar.
Como 6 é maior que 5, o Robô pode brincar e se divertir bastante! 
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

