from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection
 
# Usa o nome do módulo para configurar a raiz do projeto.
app = Flask(__name__)
# Permite que navegadores realizem requisições para o back-end Flask mesmo se estiverem hospedados em domínios ou portas diferentes.
CORS(app)
 
# # Criar usuário e sua trilha
# @app.route('/users', methods=['POST'])
# def create_user():
#     data = request.json
#     conn = get_connection()
#     cursor = conn.cursor()
 
#     # Criar usuário
#     cursor.execute("INSERT INTO usuario (nick_name, senha, idade) VALUES (%s, %s, %s)",
#                    (data['nick_name'], data['senha'], data['idade']))
#     user_id = cursor.lastrowid  # Obtém o ID do novo usuário
#     conn.commit()
 
#     # Criar trilha para o novo usuário chamando a procedure
#     cursor.callproc("InserirOuRetornarTrilha", [user_id])
#     result = []
#     for res in cursor.stored_results():
#         result = res.fetchall()
 
#     conn.commit()
#     cursor.close()
#     conn.close()
 
#     return jsonify({"message": "User and trail created successfully", "user_id": user_id, "trilha": result}), 201

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

# @app.route('/criar recurso', methods=['POST'])
# def create_recurso():
#     data = request.json
#     conn = get_connection()
#     cursor = conn.cursor()
 
#     # Criar usuário
#     cursor.execute("INSERT INTO recurso (coracao, moeda, diamante) VALUES (%s, %s, %s)",
#                    (data['coracao'], data['moeda'], data['diamante']))
#     id_recurso = cursor.lastrowid  # Obtém o ID do novo usuário
#     conn.commit()
 
#     # Criar trilha para o novo usuário chamando a procedure
#     cursor.callproc("InserirOuRetornarTrilha", [user_id])
#     result = []
#     for res in cursor.stored_results():
#         result = res.fetchall()
 
#     conn.commit()
#     cursor.close()
#     conn.close()
 
#     return jsonify({"message": "User and trail created successfully", "user_id": user_id, "trilha": result}), 201

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

# # Atualizar usuário
# @app.route('/users/<int:id>', methods=['PUT'])
# def update_user(id):
#     data = request.json
#     conn = get_connection()
#     cursor = conn.cursor()
 
#     cursor.execute("UPDATE users SET nick_name=%s, senha=%s, idade=%s WHERE id=%s",
#                    (data['nick_name'], data['senha'], data['idade'], id))
#     conn.commit()
 
#     # Fechar o cursor e a conexão
#     cursor.close()
#     conn.close()
 
#     return jsonify({"message": "User updated successfully"}), 200
 
# # Criar ou retornar trilha do usuário
# @app.route('/trilha/<int:id_usuario>', methods=['GET'])
# def get_or_create_trilha(id_usuario):
#     conn = get_connection()
#     cursor = conn.cursor(dictionary=True)
#     cursor.callproc("InserirOuRetornarTrilha", [id_usuario])
#     result = []
#     for res in cursor.stored_results():
#         result = res.fetchall()
#     cursor.close()
#     conn.close()
#     return jsonify(result), 200

# @app.route('/trilha/<int:id_usuario>', methods=['GET'])
# def get_trilha(id_usuario):
#     try:
#         conn = get_connection()
#         cursor = conn.cursor()

#         # Buscar a trilha do usuário
#         cursor.execute("SELECT ID FROM TRILHA WHERE ID_USUARIO = %s", (id_usuario,))
#         trilha = cursor.fetchone()

#         cursor.close()
#         conn.close()

#         if trilha:
#             return jsonify({
#                 "message": "Trilha encontrada",
#                 "id_trilha": trilha[0]  # Retorna o ID da trilha
#             }), 200
#         else:
#             return jsonify({"message": "Trilha não encontrada para este usuário"}), 404

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route('/criar_recurso', methods=['POST'])
# def criar_recurso():
#     data = request.json
#     id_trilha = data['id_trilha']  # ID da trilha vinculada ao usuário

#     try:
#         conn = get_connection()
#         cursor = conn.cursor()

#         # Chamando a função AtualizarRecurso para inserir um novo recurso
#         cursor.execute("SELECT AtualizarRecurso(%s, %s, %s, %s)", (id_trilha, 3, 0, 0))
#         recurso_id = cursor.fetchone()[0]  # Obtém o ID do recurso criado

#         conn.commit()
#         cursor.close()
#         conn.close()

#         return jsonify({
#             "message": "Recurso criado com sucesso",
#             "recurso_id": recurso_id,
#             "coracao": 3,  # Valor inicial de corações
#             "diamante": 0,
#             "moeda": 0,
#             "id_trilha": id_trilha
#         }), 201

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    

    
#usuario Ta em cima
#-----------------------------------------------------------------------------------------
 
    # # Vai usar o json cuja key são os IDs
    # cursor.execute("INSERT INTO modelo (id, modelo) VALUES (%s, %s)",
    #                (data['id'], data['modelo']))
    # conn.commit()
 
    # # Fechar o cursor e a conexão
    # cursor.close()
    # conn.close()
 
    # return jsonify({"message": "User created successfully"}), 201
 
 
 
if __name__ == '__main__':
    app.run(debug=True)