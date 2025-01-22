from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

# Usa o nome do módulo para configurar a raiz do projeto.
app = Flask(__name__)
# Permite que navegadores realizem requisições para o back-end Flask mesmo se estiverem hospedados em domínios ou portas diferentes.
CORS(app)

# Criar usuário
@app.route('/users', methods=['POST'])
def create_user():
    # O data esta vindo do javascript json
    data = request.json
    # todos vão ter um conn e cursor
    conn = get_connection()
    cursor = conn.cursor()

    # Vai usar o json cuja key são os IDs
    cursor.execute("INSERT INTO usuario (nick_name, senha, idade) VALUES (%s, %s, %s)",
                   (data['nick_name'], data['senha'], data['idade']))
    conn.commit()

    # Fechar o cursor e a conexão
    cursor.close()
    conn.close()

    return jsonify({"message": "User created successfully"}), 201

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

# Atualizar usuário
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("UPDATE users SET nick_name=%s, senha=%s, idade=%s WHERE id=%s",
                   (data['nick_name'], data['senha'], data['idade'], id))
    conn.commit()

    # Fechar o cursor e a conexão
    cursor.close()
    conn.close()

    return jsonify({"message": "User updated successfully"}), 200


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


# Trilha ---------------------------------------------------

# Rota para criar uma nova trilha

@app.route('/trilhas', methods=['POST'])
def create_trilha():
    id_usuario = request.json['id_usuario']
    # O data esta vindo do javascript json
    data = request.json
    
    # Conectar ao banco de dados
    conn = get_connection()
    cursor = conn.cursor()

    # Verificar se já existe um progresso para o usuário
    cursor.execute("SELECT ID FROM PROGRESSO WHERE ID_MODULO = 1 AND ID_EXERCICIO = 1 LIMIT 1")
    progresso = cursor.fetchone()

    if progresso is None:
        # Chamar a stored procedure para adicionar progresso
        cursor.callproc('AddProgresso')
        cursor.execute("SELECT @new_id")
        new_progresso_id = cursor.fetchone()[0]
    else:
        new_progresso_id = progresso[0]

    # Inserir nova trilha com o ID do progresso
    cursor.execute("INSERT INTO TRILHA (ID_USUARIO, ID_PROGRESSO) VALUES (%s, %s)", (id_usuario, new_progresso_id))
    conn.commit()

    # Fechar a conexão
    cursor.close()
    conn.close()

    return jsonify({'message': 'Trilha criada com sucesso!', 'id_progresso': new_progresso_id}), 201

# Rota para obter todas as trilhas
@app.route('/trilhas', methods=['GET'])
def get_trilhas():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM TRILHA")
    trilhas = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(trilhas)

# Rota para atualizar uma trilha
@app.route('/trilhas/<int:id>', methods=['PUT'])
def update_trilha(id):
    id_usuario = request.json['id_usuario']

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("UPDATE TRILHA SET ID_USUARIO = %s WHERE ID = %s", (id_usuario, id))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Trilha atualizada com sucesso!'})

# Rota para deletar uma trilha
@app.route('/trilhas/<int:id>', methods=['DELETE'])
def delete_trilha(id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM TRILHA WHERE ID = %s", (id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Trilha deletada com sucesso!'}), 204

if __name__ == '__main__':
    app.run(debug=True)


