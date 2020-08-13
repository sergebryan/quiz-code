var ques = document.getElementById("question");
var options = [];
var countDown = 72;
options.push(document.getElementById("option1"));
options.push(document.getElementById("option2"));
options.push(document.getElementById("option3"));
options.push(document.getElementById("option4"));

var startBtn = document.createElement("button");
startBtn.style.display = "block";


var data = [
    {
        question: "1. Which of the following is correct about JavaScript?",
        options: [
            "A. JavaScript is a lightweight, interpreted programming language",
            "B. JavaScript has object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages",
            "C. The general-purpose core of the language has been embedded in Netscape, Internet Explorer, and other web browsers",
            "D. All of the above"
        ],
        answer: 4
    },
    {
        question: "2. Which of the following is a valid type of function javascript supports?",
        options: [
            "A. named function",
            "B. anonymous function",
            "C. Both of the above",
            "D. None of the above"
        ],
        answer: 3
    },
    {
        question: "3. Which built-in method combines the text of two strings and returns a new string?",
        options: [
            "A. append()",
            "B. concat()",
            "C. attach()",
            "D. None of the above"
        ],
        answer: 2
    },
    {
        question: "4. Which built-in method returns the calling string value converted to upper case?",
        options: [
            "A. toUpperCase()",
            "B. toUpper()",
            "C. changeCase(case)",
            "D. None of the above"
        ],
        answer: 1
    },
    {
        question: "5. Which of the following function of Boolean object returns the primitive value of the Boolean object?",
        options: [
            "A. toSource()",
            "B. valueOf()",
            "C. toString()",
            "D. None of the above"
        ],
        answer: 2
    }
];
startBtn.appendChild(document.createTextNode("Start Quiz"));
ques.appendChild(startBtn);
startBtn.onclick = startQuiz;

var score = 0;

function startQuiz() {
    document.getElementById("option1").classList.remove("hide")
    document.getElementById("option2").classList.remove("hide")
    document.getElementById("option3").classList.remove("hide")
    document.getElementById("option4").classList.remove("hide")
    document.getElementById("goback").classList.remove("hide");
    startBtn.remove();
    startBtn.style.display = "block";
    options.forEach(function (option) {
        option.style.display = "block";
    });
    var x = setInterval(function () {
        countDown--;
        document.getElementById("timer").innerHTML = "Time: " + countDown;
        if (countDown <= 0) {
            clearInterval(x);
            endQuiz();
        }
    }, 1000);
    displayQuestion(0);
}

function displayQuestion(i) {
    document.getElementById("answer").innerHTML = "";
    if (i > 0) {
        ques.removeChild(ques.childNodes[0]);
        options.forEach(function (option) {
            option.removeChild(option.childNodes[0]);
        });
    }
    if (i == data.length) {
        endQuiz();
        return;
    }
    ques.appendChild(document.createTextNode(data[i].question));
    for (var j = 0; j < 4; j++) {
        options[j].appendChild(document.createTextNode(data[i].options[j]));
        if (j == data[i].answer - 1) {
            options[j].onclick = function () {
                console.log("Correct");
                document.getElementById("answer").innerText = "Correct!";
                score++;
                setTimeout(() => displayQuestion(i + 1), 1000);
            }
        }
        else {
            options[j].onclick = function () {
                console.log("Incorrect");
                document.getElementById("answer").innerText = "Incorrect!";
                countDown -= 15;
                setTimeout(() => displayQuestion(i + 1), 1000);
            }
        }
    }
}

function endQuiz() {
    if (ques.hasChildNodes())
        ques.removeChild(ques.childNodes[0]);
    options.forEach(function (option) {
        option.style.display = "none";
    });
    ques.appendChild(document.createTextNode("All done!"));
    document.getElementById("result").innerText = "Your final score is " + score;
    document.getElementById("initials").style.display = "block";
    document.getElementById("goback").classList.add("hide");
}

document.getElementById("initials-submit").onclick = function () {
    var name = document.getElementById("initials-input").value;
    localStorage.setItem(name, score);
    score = 0;
    window.location.assign('index.html');

}

console.log(localStorage);
var scoreDiv = document.getElementById("scoreDiv");
for (var i = 0, len = localStorage.length; i < len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    var p = document.createElement('p');
    p.innerText = (i + 1) + ". " + key + " - " + value;
    scoreDiv.appendChild(p);

}

document.getElementById("clearscores").onclick = function() {
    localStorage.clear();
    window.location.reload();
}

document.getElementById("goback").onclick = function() {
    window.history.back();
}


