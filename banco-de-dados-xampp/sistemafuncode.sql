CREATE DATABASE SISTEMAFUNCODE;

USE SISTEMAFUNCODE;

CREATE TABLE USUARIO(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	NICK_NAME VARCHAR (100),
	SENHA VARCHAR (100) NOT NULL,
	IDADE INT (2)
);

CREATE TABLE MODULO(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	MODULO VARCHAR (3)
);

CREATE TABLE NIVEL(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	NIVEIS VARCHAR (30)
);

CREATE TABLE EXERCICIO(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	FASE VARCHAR (100),
	ID_NIVEL INT,
	FOREIGN KEY (ID_NIVEL) REFERENCES NIVEL (ID)	
);

CREATE TABLE PROGRESSO(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	ID_MODULO INT,
	ID_EXERCICIO INT,
	FOREIGN KEY (ID_MODULO) REFERENCES MODULO (ID),	
	FOREIGN KEY (ID_EXERCICIO) REFERENCES EXERCICIO (ID)
);

CREATE TABLE TRILHA(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	ID_USUARIO INT,
	ID_PROGRESSO INT,
	FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO (ID),	
	FOREIGN KEY (ID_PROGRESSO) REFERENCES PROGRESSO (ID)
);

CREATE TABLE RECURSO(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	CORACAO INT DEFAULT 10,
	DIAMANTE INT DEFAULT 10,
	MOEDA INT DEFAULT 10,
	ID_TRILHA INT,
	FOREIGN KEY (ID_TRILHA) REFERENCES TRILHA (ID)  -- Corrigido aqui
);

INSERT INTO MODULO (ID, MODULO) VALUES
(1, 'Lógica de Programação'),
(2, 'Python'),
(3, 'HTML'),
(4, 'CSS'),
(5, 'JavaScript');

INSERT INTO NIVEL (ID, NIVEIS) VALUES
(1, 'Básico'),
(2, 'Intermediario'),
(3, 'Avançado');

INSERT INTO EXERCICIO (ID, FASE, ID_NIVEL) VALUES  -- Corrigido aqui
(1, 'Sequência de Comandos', 1),
(2, 'Condicionais if/else', 1),
(3, 'Laços de Repetição Loop', 1),
(4, 'Entrada e Saída de Dados', 1),
(5, 'Variáveis', 1),
(6, 'Comparação Simples', 1),
(7, 'Depuração Básica', 1),
(8, 'Condicionais Aninhadas', 2),
(9, 'Loops com Contador', 2),
(10, 'Funções', 2),
(11, 'Manipulação de String', 2),
(12, 'Lógica Booleana', 2),
(13, 'Introdução de Arrays / Listas', 2),
(14, 'Depuração Avançada', 2),
(15, 'Funções Recursivas', 3),
(16, 'Busca e Ordenação', 3),
(17, 'Algoritmos de Divisão e Conquista', 3),
(18, 'Lógica Proposicional', 3),
(19, 'Otimização de Código', 3),
(20, 'Algoritmos de Busca', 3),
(21, 'Análise de Complexidade', 3);



/* Função de verificar a trilha*/


DELIMITER //

CREATE FUNCTION VerificarTrilhaUsuario(
    p_id_usuario INT
) RETURNS INT
BEGIN
    DECLARE v_count INT;

    -- Conta quantas trilhas existem para o usuário
    SELECT COUNT(*) INTO v_count
    FROM TRILHA
    WHERE ID_USUARIO = p_id_usuario;

    -- Retorna 1 se o usuário tiver uma trilha, caso contrário, retorna 0
    IF v_count > 0 THEN
        RETURN 1; -- Usuário está vinculado a uma trilha
    ELSE
        RETURN 0; -- Usuário não está vinculado a uma trilha
    END IF;
END //

DELIMITER ;


--retornar ou inserir na trilha

DELIMITER //

CREATE PROCEDURE InserirOuRetornarTrilha(
    IN p_id_usuario INT
)
BEGIN
    DECLARE v_id_trilha INT;
    DECLARE v_id_progresso INT;
    DECLARE v_count INT;

    -- Verifica se já existe uma trilha para o usuário
    SET v_count = VerificarTrilhaUsuario(p_id_usuario);

    IF v_count = 1 THEN
        -- Se a trilha existir, retorna os dados da trilha
        SELECT ID AS ID_TRILHA, ID_USUARIO
        FROM TRILHA
        WHERE ID_USUARIO = p_id_usuario;
    ELSE
        -- Se a trilha não existir, cria um novo progresso
        INSERT INTO PROGRESSO (ID_MODULO, ID_EXERCICIO) VALUES (1, 1);
        SET v_id_progresso = LAST_INSERT_ID(); -- Obtém o ID do novo progresso

        -- Cria uma nova trilha
        INSERT INTO TRILHA (ID_USUARIO, ID_PROGRESSO) VALUES (p_id_usuario, v_id_progresso);
        SET v_id_trilha = LAST_INSERT_ID(); -- Obtém o ID da nova trilha

        -- Retorna os dados da nova trilha
        SELECT v_id_trilha AS ID_TRILHA, p_id_usuario AS ID_USUARIO, v_id_progresso AS ID_PROGRESO;
    END IF;
END //

DELIMITER ;




--atualiza os recursos


DELIMITER //
 
CREATE PROCEDURE AtualizarRecursoFase(IN p_id_trilha INT)
BEGIN
    DECLARE v_coracao INT DEFAULT 1;
    DECLARE v_moeda INT DEFAULT 20;
    DECLARE v_diamante INT DEFAULT 15;
 
    -- Atualiza os recursos (MOEDA e DIAMANTE) para a trilha específica
    UPDATE RECURSO
    SET CORACAO = CORACAO + v_coracao, 
        MOEDA = MOEDA + v_moeda, 
        DIAMANTE = DIAMANTE + v_diamante
    WHERE ID_TRILHA = p_id_trilha;
 
    -- Verifica se houve atualização
    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Trilha não encontrada ou erro ao atualizar recursos';
    END IF;
END //
 
DELIMITER ;

--remover coraçao

DELIMITER //
 
CREATE PROCEDURE RemoverCoracao(IN p_id_trilha INT)

BEGIN

    -- Atualiza o recurso, reduzindo um coração, mas garantindo que não fique menor que 0

    UPDATE RECURSO

    SET CORACAO = GREATEST(CORACAO - 1, 0)

    WHERE ID_TRILHA = p_id_trilha;

END //
 
DELIMITER ;

 
 
--avançando exercicio
 
 DELIMITER //
 
CREATE PROCEDURE AvancarExercicio(
    IN p_id_usuario INT
)
BEGIN
    DECLARE v_id_trilha INT;
    DECLARE v_id_progresso INT;
    DECLARE v_id_exercicio INT;
    -- Obter o ID da trilha e o ID do exercício atual associado ao usuário
    SELECT t.ID AS ID_TRILHA, p.ID_EXERCICIO
    INTO v_id_trilha, v_id_exercicio
    FROM TRILHA t
    JOIN PROGRESSO p ON t.ID_PROGRESSO = p.ID
    WHERE t.ID_USUARIO = p_id_usuario;
 
    -- Verificar se a trilha foi encontrada
    IF v_id_trilha IS NOT NULL THEN
        -- Verificar se o id_exercicio é menor que 21
        IF v_id_exercicio < 21 THEN
            -- Atualizar para o próximo exercício
            UPDATE PROGRESSO
            SET ID_EXERCICIO = v_id_exercicio + 1
            WHERE ID = (SELECT ID_PROGRESSO FROM TRILHA WHERE ID_USUARIO = p_id_usuario);
        ELSE
            -- Caso o id_exercicio já seja 21, não faz nada ou pode sinalizar
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O usuário já completou todos os exercícios!';
        END IF;
    ELSE
        -- Caso o usuário não tenha uma trilha ou progresso
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Trilha ou progresso não encontrados para este usuário!';
    END IF;
END //
 
DELIMITER ;

