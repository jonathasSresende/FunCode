
/*pagina do jogo js */

const questions = [
    {
      question: "Qual é a capital do Brasil?",
      options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
      correct: 1
    },
    {
      question: "Quanto é 5 + 7?",
      options: ["10", "11", "12", "13"],
      correct: 2
    },
    {
      question: "Qual é o maior animal terrestre?",
      options: ["Elefante", "Rinoceronte", "Girafa", "Baleia Azul"],
      correct: 0
    },
    {
      question: "Em que ano o homem pisou na Lua?",
      options: ["1969", "1970", "1965", "1980"],
      correct: 0
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
