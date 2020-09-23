
$(document).ready(function () {
  //  global variables
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

  // scores stored in local storage after rounds have been playered are obtained here to populate highscore ticker
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

  // sorts array of highscores highes to lowest
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

  // appends each name and score with its index +1
  $.each(highScores, function (k) {
    let highscoreDisplay = $("<li></li>");
    let l = parseInt(k) + 1;
    highscoreDisplay.text(l + " " + highScores[k]);
    $(".marquee-content-items").append(highscoreDisplay);
  });
  // fires the marquee. open source plugin, not my code. Info in marquee.js
  $(function () {
    $('.simple-marquee-container').SimpleMarquee();
  });
  //timer function to be called when quiz is started
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

  // on click for start button. Saves player name, opens quiz box, starts timer and shows first question
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

  // first question is populated here with buttons for answers, clicking will call next questions
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
  // question index is set to 0 and will iterate on every answer click, recalling this function. First button click data is comapre to correct answer and if awards points.
  // then index is compared to pass in the appropriate question object to write questions. each clicked answer iterates through the array of question objects.
  // once all questions written, collapse quiz box and open results box.
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
      // when result box opens. a count is set in local storage for games played, and while be used to iterate saved scores
      // confusion localstorage set. strings in the count to the end of the key savedcore so each player and score array has a different entry. 
      // These are pulled on refresh at the start of the script to populate highscore ticker.
      var q = localStorage.getItem("count", 0)
      if (q < 10) {
        q++;
        localStorage.setItem("count", q);
      }

      var addscores = [];
      addscores.push(player, currentScore)
      localStorage.setItem(("savedscore") + JSON.stringify(q), JSON.stringify(addscores));

    }

    nextQuestion();
  });

});

// Thats it. As mentioned in the read me the logic could be improved upon to make a better player experience, but I feel successful in accomplishing the code I did and make sure 
// it functions as intended.