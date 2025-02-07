// URL da API de recursos
const RECURSOS_API_URL = 'http://127.0.0.1:5000/recursos/';
 
const TRILHA_RECURSO_URL = 'http://127.0.0.1:5000/user_trilha_recurso/';
 

 
document.addEventListener("DOMContentLoaded", function () {
    fetchRanking();
});
 
async function fetchRanking() {
    try {
        const response = await fetch("http://127.0.0.1:5000/tebela");
 
        const usuarios = await response.json();
        // Ordena os usuários pela quantidade de fases concluídas em ordem decrescente
        usuarios.sort((a, b) => b.exercicio_id - a.exercicio_id);
 
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
 
        usuarios.forEach((usuario, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
<td>${index + 1}</td>
<td>${usuario.NICK_NAME}</td>
<td>${usuario.IDADE}</td>
<td>${usuario.exercicio_id}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao buscar ranking:", error);
    }
}



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
