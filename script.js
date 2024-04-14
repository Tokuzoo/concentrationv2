const $start = document.getElementById('start');

const $info = document.getElementById('info');

const $main = document.getElementById('main');

const $next = document.getElementById('next');

const $clear = document.getElementById('clear');

const $turndisp = document.getElementById('turndisp');

const music = new Audio('crap.mp3');

const createbutton = () => {
    const card = document.createElement('button');
    card.classList.add('card');
    $main.appendChild(card);
}

// 数生成
const random = (x) => {
    return Math.floor(Math.random() * x);
}

const model = [];
for(let i=0; i<16/2; i++){
    model.push(i+1);
    model.push(i+1);
}

const num = [];
let ml = model.length;

for(let i=0; i<ml; i++){
    let j = random(model.length);
    num.push(model[j]);
    model.splice(j,1);
}

let turn_state = 1;

let pos1, pos2;

const clicked_handler = (elm) => {
    const pos = Array.prototype.indexOf.call($card, elm.target);
    elm.target.textContent = num[pos];

    if(elm.target === $card[pos1]) return;

    if(turn_state === 1) {
        pos1 = pos;
    } else if(turn_state === 2) {
        pos2 = pos;
        $next.classList.toggle('hide');
    }

    turn_state++;
}

turn = 1; clearturn = 0;
const clickcheck = () => {
    for(let i=0; i<$card.length; i++){
        $card[i].addEventListener('click',(e) => {
            clicked_handler(e);
        })
    }
}

$start.addEventListener('click',() => {
    $info.classList.toggle("hide");
    $main.classList.toggle('hide');
    for(let i=0; i<16; i++)createbutton();
    $card = document.getElementsByClassName('card');
    for(let i=0; i<16; i++)$card[i].textContent = '?';
    clickcheck($card);
})

let correctcnt = 0;
let operation_cnt = 0;
$next.addEventListener('click',() => {
    if(num[pos1] === num[pos2]){
        $card[pos1].disabled = "true";
        $card[pos2].disabled = "false";
        music.pause();
        music.currentTime = 0;
        music.play();
        correctcnt++;
    } else{
        $card[pos1].textContent = '?';
        $card[pos2].textContent = '?';
    }
    clearturn++;
    if(correctcnt === 16/2){
        $main.classList.toggle('hide');
        $clear.classList.toggle('hide');
        $turndisp.textContent = "かかったターン数:" + operation_cnt;
    }

    $next.classList.toggle('hide');
    turn_state = 1;
    pos1 = -1, pos2 = -1;
})
