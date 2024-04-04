const questions = [ 
    {
        id:0,
        question: 'What is PHP?',
        options: ["Hypertext Preprocessor", 'Personal Home Page', 'Private Hosting Platform', 'Programmatic Hypertext Parser'],
        answer: 'Hypertext Preprocessor',
    },
    {
        id:1,
        question: 'What is CSS?',
        options: ['Cascading Style Sheets', 'Computer System Software', 'Creative Software Solutions', 'Centralized Security System'],
        answer: 'Cascading Style Sheets',
    },
    {
        id:2,
        question: 'What is SQL?',
        options: ['Structured Query Language', 'Sequential Query Logic', 'System Query Link', 'Software Query Library'],
        answer: 'Structured Query Language',
    },
    {
        id:3,
        question: 'What is Python?',
        options: ['A high-level programming language', 'A type of snake', 'A video game', 'A hardware component'],
        answer: 'A high-level programming language',
    },
    {
        id:4,
        question: 'What is JavaScript?',
        options: ['A programming language for creating interactive websites', 'A type of coffee drink popular among developers', 'Another name for Java', 'A virtual reality framework'],
        answer: 'A programming language for creating interactive websites',
    }
  ]
const answerBtn = document.getElementById('answer-btn');
const nextBtn = document.querySelector('#next-btn');
let displayedQuestions = [];
const divContainer = document.getElementById('div-container');
let prevBtnNew = document.querySelector("#prev");
let nextBtnNew = document.querySelector("#next");
let counter = 0;
let store = 0;
let score = 0;
let randomObject;
let randomQuestion = generateRandQuestion();
let timer= 11;
let timerCountdown;


//Initial render on page load
renderQuestion();

//Event listeners for quiz navigation
nextBtnNew.addEventListener("click", increment);
prevBtnNew.addEventListener("click", decrement);

//Event handlers
function increment() {
    let options = document.querySelectorAll("input");
    for (let option of options) {
      if (option.checked) {
        store = store + 1;
        break;
    }
    }
    if (counter < questions.length - 1) {
      counter += 1;
     
      generateRandQuestion();
      console.log(randomObject);
      renderQuestion();
      timer = 11;
      clearInterval(timerCountdown);
      timerDisplay();
    } else {
      renderSummary();
    }
}

function decrement() {
    if (counter > 0) {
      counter = counter - 1;
      renderQuestion();
    }
}

function timerDisplay(){
    timerCountdown = setInterval(() => {
        timer--;
        let timeLeft = document.querySelector("#time-left");
        timeLeft.innerHTML = `${timer}s`;
        if(timer == 0){
            clearInterval(timerCountdown);
            let clickEvent = new Event('click');
            nextBtnNew.dispatchEvent(clickEvent);
        }

    }, 1000 );
}

function checkAnswer(e){
    
    if(e.target.value === randomObject['answer'] ){
      
      e.target.parentElement.style.backgroundColor = 'rgb(134 239 172)';
      e.target.parentElement.style.color = 'white';
      score += 1;
      let inputs = document.querySelectorAll('input')
      for (let input of inputs){
        input.disabled = true;
        input.parentElement.style.pointerEvents = 'none'
  
      }
    }else{
        e.target.parentElement.style.backgroundColor = '#FF817E';
        e.target.parentElement.style.color = 'white';
        let inputs = document.querySelectorAll('input');
      
      for (let input of inputs){
        if(input.value === randomObject['answer']){
          input.parentElement.style.backgroundColor = 'rgb(134 239 172)';
        };
        input.disabled = true;
        input.disabled = true;
        input.parentElement.style.pointerEvents = 'none';
      }
    }
}

//Generate random questions from array
function generateRandQuestion(){
    if (displayedQuestions.length === questions.length) {
        console.log("No more questions available.");
        return;
    }

    let randomValue;
    do{
    for (let question of questions){
      randomValue = Math.floor(Math.random() * questions.length);
      
    }} while (displayedQuestions.includes(randomValue))
    randomObject = questions[randomValue];

    displayedQuestions.push(randomValue);
  };
//generateRandQuestion();
//console.log(randomObject);

//Render Quiz
function renderQuestion() {
    let elem = `
    <div class="header-div">
        <div class="header-text">
            <h1 class="header-h1">Quiz Whiz</h1>
            <img src="./assets/timer.png" alt="" class="header-icon">
        </div>
      
        <p class="counter">${counter + 1} of ${questions.length}</p>

        <div class="timer-div">
          <img src="./assets/stopwatch.png" />
          <span id="time-left" class="timer-span">${timer}s</span>
        </div>
    </div>
    <div class="question-container">
     <h2 class="quiz-h1">${randomObject.question}</h2>

     <ul class="quiz-ul">
     <li class="quiz-li">
         <label for="option-1" class="quiz-label">${randomObject.options[0]}</label>
         <input type="radio" name="quiz-option" id="option-1" value="${randomObject.options[0]}">
     </li>
         
     <li class="quiz-li">
         <label for="option-2" class="quiz-label">${randomObject.options[1]}</label>
         <input type="radio" name="quiz-option" id="option-2" value="${randomObject.options[1]}">
     </li>
         
     <li class="quiz-li">
         <label for="option-3" class="quiz-label">${randomObject.options[2]}</label>
         <input type="radio" name="quiz-option" id="option-3" value="${randomObject.options[2]}">
     </li>
         
     <li class="quiz-li">
         <label for="option-4" class="quiz-label">${randomObject.options[3]}</label>
         <input type="radio" name="quiz-option" id="option-4" value="${randomObject.options[3]}">
     </li>
     </ul>
    </div>
    
  `;
  
    divContainer.innerHTML = elem;
    timerDisplay();
    let inputs = document.querySelectorAll('input');
    for (let input of inputs){
      input.addEventListener("input", checkAnswer);
    };
    
}

function retakeQuiz(){
    counter = 0;
    score = 0;
    store = 0;

    displayedQuestions = [];
    renderQuestion();
    timer = 11;
    clearInterval(timerCountdown);
    document.getElementById('btns-container').append(nextBtnNew);
    prevBtnNew.disabled = false;
    nextBtnNew.disabled = false;
};

function renderSummary() {
    let elem = `
    <div class="header-div">
        <div class="header-text">
            <h1 class="header-h1">Quiz Whiz</h1>
            <img src="./assets/timer.png" alt="" class="header-icon">
        </div>
      
    </div>
    <div class="summary-body">
      <p class="summary-p">You answered ${store} out of ${questions.length} questions</p>
      <h2 class="summary-h2">Your score is ${score} over ${questions.length}</h2>
      <h3 class="summary-h3">${remark()}</h3>
      <button class="summary-btn" onclick = "retakeQuiz()">RETAKE QUIZ</button>
    </div>
  `;
    
    function remark(){
      if (score === questions.length){
      return 'Excellent! Perfect Score!!'
    }else if(score === (questions.length - questions.length)){
      return 'Poor! Did you even try?'
    }else{
      return 'Okay. You can do better!'
    }
    }
    
    prevBtnNew.remove();
    nextBtnNew.remove();
    prevBtnNew.disabled = true;
    nextBtnNew.disabled = true;
  
    divContainer.innerHTML = elem;
}
  

// document.addEventListener('DOMContentLoaded',function(){
//     questions.forEach(function(questionEl){
//         let template = `
//         <div class="header-div">
//                 <h1 class="text-3xl text-white drop-shadow-md">Quiz Whiz</h1>
//                 <img src="./assets/timer.png" alt="" class="w-1/12">
//             </div>
    
//             <div class="border px-6 py-2">
//                 <h2 class="quiz-h1">${questionEl.question}</h2>
//                 <ul class="quiz-ul">
//                     <li class="quiz-li">
//                         <label for="option-1" class="quiz-label">${questionEl.options[0]}</label>
//                         <input type="radio" name="quiz-option" id="option-1" value=${questionEl.options[0]}>
//                     </li>
    
//                     <li class="quiz-li">
//                         <label for="option-2" class="quiz-label">${questionEl.options[1]}</label>
//                         <input type="radio" name="quiz-option" id="option-2" value=${questionEl.options[1]}>
//                     </li>
    
//                     <li class="quiz-li">
//                         <label for="option-3" class="quiz-label">${questionEl.options[2]}</label>
//                         <input type="radio" name="quiz-option" id="option-3" value=${questionEl.options[2]}>
//                     </li>
    
//                     <li class="quiz-li">
//                         <label for="option-4" class="quiz-label">${questionEl.options[3]}</label>
//                         <input type="radio" name="quiz-option" id="option-4" value=${questionEl.options[3]}>
//                     </li>
//                 </ul>
    
//                 <div class="bottom-div">
//                     <p>1 of 5 questions</p>
//                     <div class="flex gap-5">
//                         <button id="answer-btn" class="bottom-btns">SUBMIT ANSWER</button>
    
//                         <button id="next-btn" class="bottom-btns">NEXT QUESTION</button>
    
//                     </div>
    
//                 </div>
//             </div>
//         `
//         divContainer.innerHTML = template;

//     document.querySelector('#answer-btn').addEventListener('click', function(){
//         console.log('clicked');
//         let selectedOption = document.querySelectorAll('[name="quiz-option"]');
//         //console.log(selectedOption);
//         for (i = 0; i < selectedOption.length; i++){
//             console.log(selectedOption)
//             if( selectedOption[i].checked && selectedOption[i].labels[0].textContent === questionEl.answer){
//                 selectedOption[i].parentElement.style.backgroundColor = "#D1FFDB";
//                 //selectedOption[i].labels[0].classList.add("text-white");
//             }
//             else if(selectedOption[i].checked && selectedOption[i].labels[0].textContent !== questionEl.answer) {
//                 selectedOption[i].parentElement.style.backgroundColor = "#ff8164";
//                 //selectedOption[i].labels[0].classList.add("text-white");
//             }
//         }
        
//     })

//     document.querySelector('#next-btn').addEventListener('click', function(){
//         console.log('clicked');
//         divContainer.innerHTML = template;
//     })

//     });

    
// })



// // answerBtn.addEventListener('click', function(){
// //     console.log('clicked');
// //     // questions.forEach(function(questionEl){
// //     //     console.log(questionEl.answer);
// //     // });
// // })

// // nextBtn.addEventListener('click', function(){
// //     console.log('clicked');
// //     questions.forEach(function(questionEl){
// //         console.log(questionEl.answer);
// //     });
// // })

// function displayQuestions(){
//     questions.forEach(function(questionEl){
//         console.log(questionEl);
//     });
// }


const mrGoldensRendering = `
<header class="card-header">
      <h1 id="question">${questions[counter].question}</h1>
      <p class="counter">${counter + 1} of ${questions.length}</p>
    </header>
    <ul class="card-body">
      <li>
          <input type="radio" value="${
            questions[counter].options[0]
          }" name="option" id="option0">
          <label for="option0">${questions[counter].options[0]}</label>
      </li>
      <li>
          <input type="radio" value="${
            questions[counter].options[1]
          }" name="option" id="option1">
          <label for="option1">${questions[counter].options[1]}</label>
      </li>
      <li>
          <input type="radio" value="${
            questions[counter].options[2]
          }" name="option" id="option2">
          <label for="option2">${questions[counter].options[2]}</label>
      </li>
      <li>
          <input type="radio" value="${
            questions[counter].options[3]
          }" name="option" id="option3">
          <label for="option3">${questions[counter].options[3]}</label>
      </li>
    </ul>

`