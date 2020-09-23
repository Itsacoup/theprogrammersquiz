$(document).ready(function () {
  var player = ""
  var timer = 120;
  var questPoints = 0;
  let currentScore = 0;
  var highScores = [];
  let questionNumb = $("#questNumber")
  let questionClue = $("#clue")
  let questionAnswers = $("#answers")
  const correct = "correct!";
  const incorrect = "incorrect..."

  const question1 = {
    number: "1",
    question: "Who invented JavaScript?",
    answers: [
      "Douglas Crockford",
      "Sheryl Sandberg",
      "Brendan Eich",
      "Alan Turing"
    ],
    correctAnswer: "Brendan Eich"
  };


  const questions = [
    {
      number: "2",
      question: "The first 'A' in AJAX stands for this?",
      answers: [
        "Application",
        "Array",
        "Asynchronous",
        "Angular"
      ],
      correctAnswer: "Asynchronous"
    },
    {
      number: "3",
      question: "When calling a function, the entry placed inside () is referred to as? ",
      answers: [
        "a parameter",
        "an argument",
        "a return",
        "an attribute"
      ],
      correctAnswer: "an argument"
    },
    {
      number: "4",
      question: "A function stored inside of an object is referred to as this?",
      answers: [
        "a callback",
        "an operator",
        "an iterator",
        "a method"
      ],
      correctAnswer: "a method"
    },
    {
      number: "5",
      question: "This JS framework is suited for building user interfaces and is maintained by Facebook?",
      answers: [
        "ReactJS",
        "Vue.js",
        "NodeJS",
        "Ember.js"
      ],
      correctAnswer: "ReactJS"
    },
    {
      number: "6",
      question: "The operator used to denote a condition is 'not', the ! is sometimes referred to as this nickname",
      answers: [
        "a pow",
        "a bang",
        "a zap",
        "a nade"
      ],
      correctAnswer: "a bang"
    }
  ]

  var highScore1 = localStorage.getItem("savedscore1");  
  var highScore1 = (highScore1) ? JSON.parse(highScore1) : [];
  
  var highScore2 = localStorage.getItem("savedscore2");  
  var highScore2 = (highScore2) ? JSON.parse(highScore2) : [];

  var highScore3 = localStorage.getItem("savedscore3");  
  var highScore3 = (highScore3) ? JSON.parse(highScore3) : [];
  
  var highScore4 = localStorage.getItem("savedscore4");  
  var highScore4 = (highScore4) ? JSON.parse(highScore4) : [];

  var highScore5 = localStorage.getItem("savedscore5");  
  var highScore5 = (highScore5) ? JSON.parse(highScore5) : [];

  highScores.push(highScore1, highScore2, highScore3, highScore4, highScore5)
  
  highScores.sort(sortFunction);
  console.log(highScores)
 
  function sortFunction(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    else {
      return (a[1] < b[1]) ? 1 : -1;
    }
  }
  
  $.each(highScores, function (k) {
    let highscoreDisplay = $("<li></li>");
    let l =parseInt(k) + 1;
    highscoreDisplay.text(l + " " + highScores[k]);
    $(".marquee-content-items").append(highscoreDisplay);
  });

  $(function (){
    $('.simple-marquee-container').SimpleMarquee(); 
  });

  function setTime() {
    var timerInterval = setInterval(function () {
      timer--;
      $("#timer").text(timer);

      if (timer === 0) {
        clearInterval(timerInterval);
        outOfTime();
      }

      if (questionsIndex === 5) {
        clearInterval(timerInterval);
      }

    }, 1000);
  }

  function outOfTime() {
    alert("Sorry, you are out of time!")
  }

  $("#startButton").click(function () {
    player = $("#nameEntry").val();
    if ($("#nameEntry").val() == "") {
      alert("Please enter player name!")
      return;
    }
    $("#displayName").text(player);
    $("#introBox").addClass("collapse");
    $("#quizBox").removeClass("collapse");
    setTime();
    player = $("#nameEntry").val();

    showQuestion(question1);
  });


  function showQuestion(currentQuestion) {
    questionNumb.text(currentQuestion.number)
    questionClue.text(currentQuestion.question)
    correctAnswer = currentQuestion.correctAnswer
    $.each(currentQuestion.answers, function () {
      let answersBtn = $("<li><button></button></li>");
      answersBtn.addClass("btn btn-danger m-3");
      answersBtn.attr("data-answer", this)
      answersBtn.text(this)
      $("#answers").append(answersBtn);
    });
    $("#timer").text(timer);
  }


  var questionsIndex = 0;

  $("#answers").click(function () {

    function nextQuestion() {
      let chosenAnswer = event.target.getAttribute('data-answer');

      if (chosenAnswer === correctAnswer) {
        questPoints += 2;
        currentScore = questPoints * timer;
        $("#currentScore").text(currentScore);
        $("#answerWas").text(correct);
        $("#yourScore").text(currentScore)
      }
      else {
        $("#answerWas").text(incorrect);
      }

      function writeQuestion(questions) {
        $("#answers").empty()
        questionNumb.text(questions.number)
        questionClue.text(questions.question)
        correctAnswer = questions.correctAnswer
        $.each(questions.answers, function (i) {
          let answersBtn = $("<li><button></button></li>");
          answersBtn.addClass("btn btn-danger m-3");
          answersBtn.text(questions.answers[i])
          answersBtn.attr("data-answer", questions.answers[i])
          $("#answers").append(answersBtn);
        });
        return correctAnswer;
      }

      if (questionsIndex == questions.length) questionsIndex = 0;
      writeQuestion(questions[questionsIndex]);
      questionsIndex++;

    }

    if (questionsIndex == 5) {
      $("#quizBox").addClass("collapse");
      $("#resultsBox").removeClass("collapse");
    
    
    var q = localStorage.getItem("count", 0)
    if (q < 10) {
      q++;
      localStorage.setItem("count", q);
    } 
    
    
   
    var addscores = [];
    addscores.push(player, currentScore)
    localStorage.setItem(("savedscore")+JSON.stringify(q), JSON.stringify(addscores));
    
   
    
      
      $(".marquee-content-items").empty();
      $.each(highScores, function (k) {
        let highscoreDisplay = $("<li></li>");
        highscoreDisplay.text(highScores[k]);
        $(".marquee-content-items").append(highscoreDisplay);                         
       });
       
        
    }


    nextQuestion();
  });

});