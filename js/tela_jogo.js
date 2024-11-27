
/*pagina do jogo js */

const questions = [
  {
    "question": "Qual é a capital do Brasil?",
    "options": ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
    "correct": 1
  },
  {
    "question": "Quem pintou a Mona Lisa?",
    "options": ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo"],
    "correct": 1
  },
  {
    "question": "Qual é o maior continente do mundo?",
    "options": ["América", "Ásia", "Europa", "África"],
    "correct": 1
  },
  {
    "question": "Em qual país nasceu o famoso físico Albert Einstein?",
    "options": ["Alemanha", "EUA", "França", "Suíça"],
    "correct": 0
  },
  {
    "question": "Qual é o nome do planeta mais próximo do Sol?",
    "options": ["Marte", "Vênus", "Mercúrio", "Terra"],
    "correct": 2
  },
  {
    "question": "Qual é o símbolo químico do ouro?",
    "options": ["Au", "Ag", "O", "Fe"],
    "correct": 0
  },
  {
    "question": "Qual é o nome do primeiro presidente dos Estados Unidos?",
    "options": ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "Franklin Roosevelt"],
    "correct": 2
  },
  {
    "question": "Quantos estados tem o Brasil?",
    "options": ["24", "26", "28", "30"],
    "correct": 1
  },
  {
    "question": "Qual é o maior animal terrestre?",
    "options": ["Elefante", "Girafa", "Hipopótamo", "Leão"],
    "correct": 0
  },
  {
    "question": "Quem escreveu 'Dom Casmurro'?",
    "options": ["Machado de Assis", "José de Alencar", "Monteiro Lobato", "Clarice Lispector"],
    "correct": 0
  },
  
  {
    "question": "Quem foi o primeiro homem a pisar na Lua?",
    "options": ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    "correct": 0
  },
  {
    "question": "Em que ano ocorreu a queda do Muro de Berlim?",
    "options": ["1985", "1989", "1991", "1993"],
    "correct": 1
  },
  {
    "question": "Qual é o maior oceano do mundo?",
    "options": ["Atlântico", "Índico", "Pacífico", "Ártico"],
    "correct": 2
  },
  {
    "question": "Quem pintou a famosa obra 'A Noite Estrelada'?",
    "options": ["Salvador Dalí", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
    "correct": 2
  },
  {
    "question": "Qual é a capital da Itália?",
    "options": ["Roma", "Paris", "Madrid", "Berlim"],
    "correct": 0
  },
  {
    "question": "Qual é o nome do rio que atravessa o Egito?",
    "options": ["Nilo", "Amazona", "Yangtzé", "Ganges"],
    "correct": 0
  },
  {
    "question": "Qual é o nome da famosa torre localizada em Paris?",
    "options": ["Torre de Pisa", "Torre Eiffel", "Torre de Londres", "Torre do Big Ben"],
    "correct": 1
  },
  {
    "question": "Quem é o autor de 'O Senhor dos Anéis'?",
    "options": ["J.K. Rowling", "J.R.R. Tolkien", "George R.R. Martin", "C.S. Lewis"],
    "correct": 1
  },
  {
    "question": "Qual é o maior deserto do mundo?",
    "options": ["Deserto de Gobi", "Deserto do Saara", "Deserto de Atacama", "Deserto de Kalahari"],
    "correct": 1
  },
  {
    "question": "Em que cidade nasceu a arte do samba?",
    "options": ["Recife", "Rio de Janeiro", "Salvador", "São Paulo"],
    "correct": 1
  },
  
  {
    "question": "Qual é o nome do único elemento químico que não tem massa atômica?",
    "options": ["Hidrogênio", "Oxigênio", "Nitrogênio", "Hélio"],
    "correct": 0
  },
  {
    "question": "Quem descobriu a penicilina?",
    "options": ["Marie Curie", "Louis Pasteur", "Alexander Fleming", "Albert Einstein"],
    "correct": 2
  },
  {
    "question": "Em que ano foi criada a primeira Constituição Brasileira?",
    "options": ["1824", "1889", "1934", "1946"],
    "correct": 0
  },
  {
    "question": "Quem foi o responsável pela teoria da relatividade?",
    "options": ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Stephen Hawking"],
    "correct": 1
  },
  {
    "question": "Qual é o nome do maior satélite natural de Saturno?",
    "options": ["Europa", "Titã", "Ganimedes", "Callisto"],
    "correct": 1
  },
  {
    "question": "Qual país tem a maior população do mundo?",
    "options": ["Índia", "Estados Unidos", "Rússia", "China"],
    "correct": 3
  },
  {
    "question": "Qual foi o primeiro país a abolir a escravidão?",
    "options": ["Brasil", "França", "Estados Unidos", "Haiti"],
    "correct": 3
  },
  {
    "question": "Qual foi o nome da primeira mulher a ganhar o Prêmio Nobel?",
    "options": ["Marie Curie", "Florence Nightingale", "Ada Lovelace", "Rosalind Franklin"],
    "correct": 0
  },
  {
    "question": "Em que ano ocorreu a Revolução Francesa?",
    "options": ["1776", "1789", "1799", "1812"],
    "correct": 1
  },
  {
    "question": "Qual é o nome da teoria que afirma que a Terra gira em torno do Sol?",
    "options": ["Teoria Geocêntrica", "Teoria Ptolemaica", "Teoria Heliocêntrica", "Teoria de Newton"],
    "correct": 2
  }
];

 
  let currentQuestion = 0;
  let score = 0;

  function loadQuestion() {
    if (currentQuestion < questions.length) {
      const questionData = questions[currentQuestion];
      document.getElementById("question").textContent = questionData.question;
      const options = document.querySelectorAll(".option");
      options.forEach((btn, index) => {
        btn.textContent = questionData.options[index];
      });
    } else {
      document.getElementById("game-container").innerHTML = `
        <h3>Parabéns! Você completou o jogo.</h3>
        <p>Sua pontuação final é: ${score}</p>
        <button class="btn btn-success" onclick="restartGame()">Jogar Novamente</button>
      `;
    }
  }

  function checkAnswer(selected) {
    if (selected === questions[currentQuestion].correct) {
      score += 10;
      document.getElementById("score").textContent = `Pontuação: ${score}`;
    }
    currentQuestion++;
    loadQuestion();
  }

  function restartGame() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").textContent = `Pontuação: 0`;
    loadQuestion();
  }


  function checkCoracao(selected) {
    if (selected === questions[currentQuestion].correct) {
      score += 10;
      document.getElementById("score").textContent = `Pontuação: ${score}`;
    }
    currentQuestion++;
    loadQuestion();
  }

  loadQuestion();
