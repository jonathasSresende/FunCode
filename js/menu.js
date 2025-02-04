const TRILHA_RECURSO_URL = 'http://127.0.0.1:5000/user_trilha_recurso/';

// Supondo que você tenha o id_usuario armazenado no sessionStorage após o login
const usuarioData = JSON.parse(sessionStorage.getItem('usuario'));

if (usuarioData && usuarioData.user_id) {
    const id_usuario = usuarioData.user_id;

    // Fazer o fetch para obter os dados de trilha e recurso do usuário
    fetch(TRILHA_RECURSO_URL + id_usuario)
        .then(response => response.json())
        .then(data => {
            console.log("Dados da Trilha e Recurso:", data);

            if (data.length > 0) {
                const trilhaRecurso = data[0]; // Obter o primeiro (único) item de dados

                // Exibir os dados no console ou atualizar a interface
                console.log("ID do Usuário:", trilhaRecurso.user_id);
                console.log("Nome do Usuário:", trilhaRecurso.NICK_NAME);
                console.log("Idade do Usuário:", trilhaRecurso.IDADE);
                console.log("ID da Trilha:", trilhaRecurso.trilha_id);
                console.log("ID do Recurso:", trilhaRecurso.recurso_id);
                console.log("Corações:", trilhaRecurso.CORACAO);
                console.log("Diamantes:", trilhaRecurso.DIAMANTE);
                console.log("Moedas:", trilhaRecurso.MOEDA);

                // Agora, você pode exibir esses dados em elementos HTML, por exemplo:
                document.querySelector("#coracao-count").textContent = trilhaRecurso.CORACAO;
                document.querySelector("#moeda-count").textContent = trilhaRecurso.MOEDA;
                document.querySelector("#diamante-count").textContent = trilhaRecurso.DIAMANTE;
            } else {
                console.error("Nenhum dado encontrado para o usuário.");
            }
        })
        .catch(error => {
            console.error("Erro ao fazer a requisição:", error);
        });
} else {
    console.error("ID do usuário não encontrado no sessionStorage.");
}

