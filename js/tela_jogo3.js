// URL da API para avançar exercício
const AVANCAR_EXERCICIO_API_URL = 'http://127.0.0.1:5000/avancar_exercicio/';

// Função para avançar o exercício ao acertar a resposta
function avancarExercicio(id_usuario) {
    fetch(AVANCAR_EXERCICIO_API_URL + id_usuario, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log(data.message); // Exibe mensagem de sucesso
        } else {
            console.error("Erro ao avançar o exercício:", data);
        }
    })
    .catch(error => {
        console.error("Erro ao fazer a requisição para avançar exercício:", error);
    });
}


// URL da API de remoção de corações
const REMOVER_CORACAO_API_URL = 'http://127.0.0.1:5000/remover_coracao/';



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


//Samuel

// URL da API de recursos
const RECURSOS_API_URL = 'http://127.0.0.1:5000/recursos/';

// Obtém os dados do usuário do sessionStorage
const usuarioData = JSON.parse(sessionStorage.getItem('usuario'));
let trilhaId = null;

if (usuarioData && usuarioData.user_id) {
    const id_usuario = usuarioData.user_id;

    // Faz o fetch para obter os dados de trilha e recurso do usuário
    fetch(`http://127.0.0.1:5000/user_trilha_recurso/${id_usuario}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const trilhaRecurso = data[0];
                trilhaId = trilhaRecurso.trilha_id;

                // Atualiza os valores na interface
                document.querySelector("#coracao-count").textContent = trilhaRecurso.CORACAO;
                document.querySelector("#moeda-count").textContent = trilhaRecurso.MOEDA;
                document.querySelector("#diamante-count").textContent = trilhaRecurso.DIAMANTE;
            } else {
                console.error("Nenhum dado encontrado para o usuário.");
            }
        })
        .catch(error => console.error("Erro ao obter trilha e recurso:", error));
} else {
    console.error("ID do usuário não encontrado no sessionStorage.");
}

// Função para remover um coração quando o usuário errar a resposta
function removerCoracao(trilhaId) {
    fetch(REMOVER_CORACAO_API_URL + trilhaId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Coração removido com sucesso:", data);

        // Atualiza a interface com a nova quantidade de corações
        if (data.CORACAO !== undefined) {
            atualizarCoracoes(data.CORACAO);
        }
    })
    .catch(error => console.error("Erro ao remover coração:", error));
}

// Função para atualizar a contagem de corações na interface
function atualizarCoracoes(novaQuantidade) {
    document.getElementById('coracao-count').innerText = novaQuantidade;
}

//Samuel    ^^^^^^^^^^^^


// Função para iniciar o jogo
function startGame() {
    document.getElementById("question").innerText = question;
    const optionsButtons = document.querySelectorAll(".option");
    optionsButtons.forEach((button, index) => {
        button.innerText = options[index];
    });
}

function checkAnswer(selectedIndex) {
    const correctIndex = 3; // O índice da resposta correta (Opção D)

    // Lógica para abrir o modal com a resposta
    const modal = document.getElementById("resultModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalButtonContainer = document.getElementById("modalButtonContainer");

    // Limpa os botões do modal antes de adicionar novos
    modalButtonContainer.innerHTML = '';

    if (selectedIndex === correctIndex) {
        score++;

        // Atualiza os recursos do usuário ao acertar
        if (trilhaId) {
            atualizarRecursoAoAcertar(trilhaId);
        } else {
            console.error("Trilha ID não encontrado.");
        }

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
        // Atualizar a fase do usuário no sessionStorage
        const usuarioData = JSON.parse(sessionStorage.getItem('usuario'));
        usuarioData.fase_concluida = 4; // Avança para a proxima fase após completar a atual

        // Atualizar a trilha do usuário no banco de dados
        const id_usuario = usuarioData.user_id;
        avancarExercicio(id_usuario); // Chama a função para avançar o exercício
        sessionStorage.setItem('usuario', JSON.stringify(usuarioData));

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

        // Remove um coração ao errar a resposta
        if (trilhaId) {
            removerCoracao(trilhaId);
        } else {
            console.error("Trilha ID não encontrado.");
        }

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
    const modal = document.getElementById("resultModal");
    modal.style.display = "none"; // Fecha o modal

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






//samuel

// Função para atualizar recursos ao acertar a questão
function atualizarRecursoAoAcertar(trilhaId) {
    fetch(RECURSOS_API_URL + trilhaId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            MOEDA: 10 // Adiciona 10 moedas ao usuário
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Recurso atualizado com sucesso:", data);
        
        // Atualiza a interface após a atualização do recurso
        if (data.MOEDA !== undefined) {
            atualizarMoedas(data.MOEDA);
        }
    })
    .catch(error => console.error("Erro ao atualizar recurso:", error));
}

// Função para atualizar a contagem de moedas na interface
function atualizarMoedas(novaQuantidade) {
    document.getElementById('moeda-count').innerText = novaQuantidade;
}
// Inicia o jogo ao carregar a página
window.onload = startGame;
