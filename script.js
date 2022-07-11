const main = document.querySelector('main');
const startCard = document.querySelector('#startCard');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
let counter = 59;
let interval;
window.addEventListener('DOMContentLoaded',()=>{
  let check = setInterval(()=>{
    if(counter<0){
      // console.log('time khtm');
      // createuser();
      clearInterval(check);
      clearInterval(interval);
      counter=0;
      timer.innerText=0;
      check = null;
      main.querySelectorAll('section').forEach(el=>el.remove());

      enterInitialsCard();
    }
  },1);

})
let queCardId = 0;
let userCount = 0;
const problems = [{
  que : 'Arrays in js are used to share _____',
  options : ['Nums and Strings','Other arrays','booleans','all of the above'],
  ans: 'all of the above',
  id : -1
},{
  que : 'Which is not a data type?',
  options : ['Strings','Booleans','Alert','Numbers'],
  ans : 'Alert',
  id : -1
}
];
let users = [];

startBtn.addEventListener('click',startQuiz);

function startQuiz(e){
  queCardId = 0;
  counter = 59;
  timer.innerText=60;
  interval = setInterval(()=>{
    timer.innerText = `${counter--}`;
  },1000);

  startCard.remove();

  createQueCard();
}

function createQueCard(){

  
  
  problems.forEach(el=>{
    let section = document.createElement('section');
    section.classList.add('card');
    section.setAttribute('id',`queCardId${++queCardId}`);
    el.id = `queCardId${queCardId}`;
    let que = document.createElement('h1');
    que.innerText = el.que;
    let ans = el.ans;
    let options = document.createElement('div');
    el.options.forEach(x=>{
      const btn = document.createElement('button');
      btn.innerText = x;
      options.appendChild(btn);
      btn.addEventListener('click',checkAns);
    })

    let status = document.createElement('div');
    status.setAttribute('class','status');
    status.innerHTML = `<br>`;
    section.appendChild(que);
    section.appendChild(options);
    section.appendChild(status);
    section.classList.add('hide');
    main.appendChild(section);
    keepShowingQue();
    
    
  })
  
  let allQueCards = main.querySelectorAll('section');


}

function checkAns(e){
  const section = e.target.parentElement.parentElement;
  const que = problems.find(el=>(el.id===section.id));
  const ansChosen = e.target.innerText;
  if(ansChosen===que.ans){
    if(checkIfLastQue()){
      section.remove();
      enterInitialsCard();
    }
    else{
      section.remove();
      keepShowingQue();
      main.querySelector('.status').innerText = 'Correct';
    }
    
  
  }else{
    section.querySelector('.status').innerText = 'Incorrect';
    counter = counter-5;
  }
  
}

function keepShowingQue(){
  const firstQue = main.querySelector('section');
  firstQue.classList.remove('hide');
  
}

function checkIfLastQue(){
  let section = main.querySelector('section');
  let test = parseInt(section.id.slice(9,10));
  if(test===problems.length){
    return true;
  }else{
    return false;
  }

}

function enterInitialsCard(){
  clearInterval(interval);
  const section = document.createElement('section');
  section.classList.add('card');
  
  const heading = document.createElement('h1');
  heading.innerText='All Done!  '

  const heading2 = document.createElement('h2');
  heading2.innerText = `Your final score is ${timer.innerText}.`;
  const inputName = document.createElement('label');
  inputName.innerText = 'Enter Initials:'
  const input = document.createElement('input');
  input.setAttribute('type','text');
  const submit = document.createElement('button');
  submit.innerText = 'Submit';
  submit.addEventListener('click',createuser);
  const div = document.createElement('div');
  div.setAttribute('id','enterInitialsDiv');
  div.appendChild(inputName);
  div.appendChild(input);
  div.appendChild(submit);
  section.appendChild(heading);
  section.appendChild(heading2);
  section.appendChild(div);
  main.appendChild(section);
  
}
function createuser(e){
  const div = e.target.parentElement;
  const input = div.querySelector('input');
  const user = Object.create(null);
  user.name = input.value;
  user.score = timer.innerText;
  user.serial = ++userCount;
  users.push(user);
  endCard();
}

function endCard(){
  const lastsection = main.querySelector('section');
  lastsection.remove();
  const section = document.createElement('section');
  section.classList.add('card');
  section.classList.add('endCard');
  const heading = document.createElement('h1');
  heading.innerText = 'Highscores';
  section.appendChild(heading);
  users.forEach(el=>{
    const div = document.createElement('div');
    div.innerText = `${el.serial}. ${el.name} - ${el.score}`;
    section.appendChild(div);
  })
  const playAgainBtn = document.createElement('button');
  playAgainBtn.innerText = 'Play Again';
  playAgainBtn.addEventListener('click',()=>{
    section.remove();
    startQuiz();
  })
  const clearBtn = document.createElement('button');
  clearBtn.innerText = 'Clear HighScore';
  clearBtn.addEventListener('click',()=>{
    users = [];
    userCount = 0;
  })
  section.appendChild(playAgainBtn);
  section.appendChild(clearBtn);
  
  main.appendChild(section);
  }