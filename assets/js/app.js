const questionNumberSpan = document.querySelector('.question-num-value');
const totalQuestionSpan = document.querySelector('.total-question');
const question = document.querySelector('.question');
const totalQuestion = document.querySelector('.total-questions')
const correctAnswerSpan = document.querySelector('.correct-answers');
const isQuizOver = document.querySelector('.quiz-over');
const count = document.querySelector('.count');
const op1 = document.querySelector('.option1');
const op2 = document.querySelector('.option2');
const op3 = document.querySelector('.option3');
const op4 = document.querySelector('.option4');
const option = document.querySelectorAll('#option');
const options = document.querySelector('.options').children;
const progress = document.querySelector('.progress');
const next = document.querySelector('.btn');
const tryAgain = document.querySelector('.try-again');

let questionIndex;
let index = 0;
let score = 0;
let myArray = [];
let myArr = [];

const questions = [
    {
        question: 'What is 1 + 1?',
        options: [
            'A. 4',
            'B. 3',
            'C. 2',
            'D. 1'
        ],
        answer: 2
    },
    {
        question: 'What is 2 + 2?',
        options: [
            'A. 4',
            'B. 3',
            'C. 2',
            'D. 1',
        ],
        answer: 0
    },
    {
        question: 'What is 3 + 3?',
        options: [
            'A. 4',
            'B. 6',
            'C. 2',
            'D. 1',
        ],
        answer: 1
    },
    {
        question: 'What is 4 + 4?',
        options: [
            'A. 4',
            'B. 3',
            'C. 8',
            'D. 1',
        ],
        answer: 2
    },
    {
        question: 'What is 5 + 5?',
        options: [
            'A. 4',
            'B. 3',
            'C. 2',
            'D. 10'
        ],
        answer: 3
    },
    // {
    //     question: 'What is 6 + 6?',
    //     options: [
    //         'A. 4',
    //         'B. 3',
    //         'C. 2',
    //         'D. 12'
    //     ],
    //     answer: 3
    // },
    // {
    //     question: 'What is 7 + 7?',
    //     options: [
    //         'A. 14',
    //         'B. 3',
    //         'C. 2',
    //         'D. 1',
    //     ],
    //     answer: 0
    // },
    // {
    //     question: 'What is 8 + 8?',
    //     options: [
    //         'A. 4',
    //         'B. 16',
    //         'C. 2',
    //         'D. 1',
    //     ],
    //     answer: 1
    // }
]

// set questions and options and question number
totalQuestionSpan.innerHTML = questions.length;
const load = () => {
    questionNumberSpan.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].question;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    op4.innerHTML = questions[questionIndex].options[3];
    index++;
}

function check(element) {
    if (element.id == questions[questionIndex].answer) {
        element.classList.add('correct');
        score++
        progress.style.width = `${20 * score}%`;
        count.innerHTML = `${score}`
    } else {
        element.classList.add('wrong');
    }

    disableOptions();
}

const disableOptions = () => {
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        element.classList.add('disabled');

        if (element.id == questions[questionIndex].answer) {
            element.classList.add('correct');
        }
    }
}

const enableOptions = () => {
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        element.classList.remove('disabled', 'correct', 'wrong');
    }
}

const validation = () => {
    next.addEventListener('click', () =>{
        if (!options[0].classList.contains("disabled")) {
            alert('Please select an option')
        } else {
            enableOptions();
            randomQuestion();
        }
    });
}

const nextQuestion = () => {
    validation();
}

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let duplicateQuestion = 0;

    if (index == questions.length) {
        quizOver();
    } else {
        if (myArray.length > 0) {
            for (let i = 0; i < myArray.length; i++) {
                const element = myArray[i];
                if (element == randomNumber) {
                    duplicateQuestion = 1;
                    break;
                }
            }

            if (duplicateQuestion == 1) {
                randomQuestion();
            } else {
                questionIndex = randomNumber;
                load();
                myArr.push(questionIndex)
            }
        }

        if (myArray.length == 0) {
            questionIndex = randomNumber;
            load();
            myArr.push(questionIndex)

            
        }
        
        if (myArr.length == 5) {
            console.log(next)
            next.innerHTML = 'Submit';
        }

    }
    console.log('myArr:' + myArr);
    myArray.push(randomNumber);
}

const quizOver = () => {
    isQuizOver.classList.add('show');
    correctAnswerSpan.innerHTML = score;
    console.log(questions.length)
    totalQuestion.innerHTML = questions.length;
}

const reloadPage = () => {
    tryAgain.addEventListener('click', () => {
        window.location.reload();
    })
}

window.onload = () => {
    randomQuestion();
    nextQuestion();
    reloadPage();
}