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









if __name__ == '__main__':
    app.run(debug=True)