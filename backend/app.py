from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection
 
# Usa o nome do módulo para configurar a raiz do projeto.
app = Flask(__name__)
# Permite que navegadores realizem requisições para o back-end Flask mesmo se estiverem hospedados em domínios ou portas diferentes.
CORS(app)
 
@app.route('/criar_usuario_e_recurso', methods=['POST'])
def criar_usuario_e_recurso():
    data = request.json
    nick_name = data['nick_name']
    senha = data['senha']
    idade = data['idade']

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Criar Usuário
        cursor.execute("INSERT INTO USUARIO (NICK_NAME, SENHA, IDADE) VALUES (%s, %s, %s)",
                       (nick_name, senha, idade))
        user_id = cursor.lastrowid  # Obtém o ID do usuário recém-criado

        # Criar Trilha para o usuário
        cursor.callproc("InserirOuRetornarTrilha", [user_id])
        trilha_id = None
        for res in cursor.stored_results():
            trilha_id = res.fetchone()[0]  # Obtém o ID da trilha

        if trilha_id:
            # Criar Recurso para a trilha
            cursor.execute("INSERT INTO RECURSO (CORACAO, DIAMANTE, MOEDA, ID_TRILHA) VALUES (%s, %s, %s, %s)",
                           (3, 20, 10, trilha_id))  # Valores iniciais
            recurso_id = cursor.lastrowid  # Obtém o ID do recurso criado

            conn.commit()
            return jsonify({
                "message": "Usuário, trilha e recurso criados com sucesso!",
                "user_id": user_id,
                "trilha_id": trilha_id,
                "recurso_id": recurso_id
            }), 201

        else:
            conn.rollback()
            return jsonify({"error": "Erro ao criar trilha"}), 500

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

# Listar usuários
@app.route('/users', methods=['GET'])
def get_users():
    conn = get_connection()
    # vai buscar como dicionário
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario")
 
    # Ele vai buscar todos como fetchall
    users = cursor.fetchall()
 
    # Fechar o cursor e a conexão
    cursor.close()
    conn.close()
 
    return jsonify(users), 200

@app.route('/add_recurso', methods=['POST'])
def add_recurso():
    try:
        data = request.json  # Recebe os dados do corpo da requisição
        trilha_id = data.get('trilha_id')  # Agora estamos usando trilha_id, não id_usuario
        coracao = data.get('coracao', 0)  # Padrão 0 se não for enviado
        moeda = data.get('moeda', 20)
        diamante = data.get('diamante', 10)

        if not trilha_id:
            return jsonify({"error": "ID da trilha é obrigatório"}), 400

        conn = get_connection()
        cursor = conn.cursor()

        # Verificar se a trilha existe para o ID fornecido
        cursor.execute("SELECT ID FROM trilha WHERE ID = %s", (trilha_id,))
        trilha = cursor.fetchone()

        if not trilha:
            return jsonify({"error": "Trilha não encontrada"}), 404

        # Inserir os recursos na tabela `recurso`
        query = """
            INSERT INTO recurso (ID_TRILHA, CORACAO, MOEDA, DIAMANTE)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (trilha_id, coracao, moeda, diamante))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Recurso adicionado com sucesso"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 

@app.route('/recursos/<int:trilha_id>', methods=['PUT'])
def atualizar_recursos(trilha_id):
    try:
        # Conectar ao banco de dados
        conn = get_connection()
        cursor = conn.cursor()

        # Chamar a procedure AtualizarRecursoFase passando o ID da trilha
        cursor.callproc('AtualizarRecursoFase', [trilha_id])

        # Commit da transação e fechar a conexão
        conn.commit()

        # Verificar se houve erro ou a atualização foi bem-sucedida
        if cursor.rowcount == 0:
            return jsonify({"error": "Trilha não encontrada ou erro na atualização"}), 404

        cursor.close()
        conn.close()

        return jsonify({"message": "Recursos atualizados com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/user_trilha_recurso/<int:id_usuario>', methods=['GET'])
def get_user_trilha_recurso(id_usuario):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Consulta para trazer os dados do usuário, trilha e recurso
        query = """
            SELECT 
                usuario.ID AS user_id,
                usuario.NICK_NAME,
                usuario.IDADE,
                trilha.ID AS trilha_id,
                recurso.ID AS recurso_id,
                recurso.CORACAO,
                recurso.DIAMANTE,
                recurso.MOEDA
            FROM usuario
            LEFT JOIN trilha ON usuario.ID = trilha.ID_USUARIO
            LEFT JOIN recurso ON trilha.ID = recurso.ID_TRILHA
            WHERE usuario.ID = %s
        """

        cursor.execute(query, (id_usuario,))
        result = cursor.fetchall()

        cursor.close()
        conn.close()

        if result:
            return jsonify(result), 200
        else:
            return jsonify({"message": "Nenhum dado encontrado para o usuário"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/criar_recurso', methods=['GET'])
def get_recurso():
    conn = get_connection()
    # vai buscar como dicionário
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM recurso")
 
    # Ele vai buscar todos como fetchall
    recurso = cursor.fetchall()
 
    # Fechar o cursor e a conexão
    cursor.close()
    conn.close()
 
    return jsonify(recurso), 200

@app.route('/remover_coracao/<int:trilha_id>', methods=['PUT'])
def remover_coracao(trilha_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # Chama a procedure para remover um coração
        cursor.callproc('RemoverCoracao', [trilha_id])
        conn.commit()
        
        # Busca o novo valor de corações
        cursor.execute("SELECT CORACAO FROM RECURSO WHERE ID_TRILHA = %s", (trilha_id,))
        coracao_atual = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return jsonify({"Mensagem": "Coração removido com sucesso!", "CORACAO": coracao_atual[0] if coracao_atual else 0})
    
    except mysql.connector.Error as err:
        return jsonify({"Erro": "Erro ao remover coração", "Detalhes": str(err)})

@app.route('/avancar_exercicio/<int:id_usuario>', methods=['PUT'])
def avancar_exercicio(id_usuario):
    try:
        # Conectar ao banco de dados
        
        conn = get_connection()
        cursor = conn.cursor()

        # cursor = mysql.connection.cursor()
        
        # Chamar a procedure que vai avançar o exercício
        cursor.callproc('AvancarExercicio', [id_usuario])
        
        # Verificar se a operação foi bem-sucedida
        conn.commit()
        # mysql.connection.commit()
        
        # Fechar o cursor
        cursor.close()
        
        # Retornar resposta de sucesso
        return jsonify({"message": "Exercício avançado com sucesso!"}), 200
    
    except Exception as e:
        # Caso haja algum erro, exibir mensagem
        return jsonify({"error": str(e)}), 400
    

# Listar usuários
@app.route('/tebela', methods=['GET'])
def get_tebela():
    conn = get_connection()
    # vai buscar como dicionário
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT USUARIO.*, exercicio.ID AS exercicio_id
                   FROM usuario
            LEFT JOIN trilha ON usuario.ID = trilha.ID_USUARIO
            LEFT JOIN recurso ON trilha.ID = recurso.ID_TRILHA
            LEFT JOIN progresso ON trilha.ID_PROGRESSO = progresso.ID
            LEFT JOIN exercicio ON progresso.ID_EXERCICIO = exercicio.ID""")
    # query = """
    #         SELECT 
    #             exercicio.ID AS exercicio_id
    #         LEFT JOIN trilha ON usuario.ID = trilha.ID_USUARIO
    #         LEFT JOIN recurso ON trilha.ID = recurso.ID_TRILHA
    #         LEFT JOIN progresso ON trilha.ID_PROGRESSO = progresso.ID
    #         LEFT JOIN exercicio ON progresso.ID_EXERCICIO = exercicio.ID
    #     """
    # Ele vai buscar todos como fetchall
    users = cursor.fetchall()
    # Fechar o cursor e a conexão
    cursor.close()
    conn.close()
    return jsonify(users), 200

if __name__ == '__main__':
    app.run(debug=True)



