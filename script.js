//Hell of declaration
const ruleButton = document.querySelector('#rule-button');
const closebtn = document.querySelector('#close');
const chooseSection =document.querySelectorAll('.item');
const arr = [...chooseSection];
const playSection = document.querySelector('.play-section');
const human = document.querySelector('.human');
const comp = document.querySelector('.computer');
const result = document.querySelector('#result h3 ');
const score = document.querySelector('#score-count');
let count =0;
const music = new Audio('a-robust-crew.mp3');
window.onload = ()=>{
    music.play();
};
//UI settings
class UI{
    static rules(){
        document.querySelector('.card').style.display="flex";
    }
    static close(){
        document.querySelector('.card').style.display="none";
    }

    static choose(item,player){
        playSection.style.display = 'grid';
        document.querySelector('#choose-section').style.display = 'none';
        player.innerHTML = 
        `<div class="bg-${item.getAttribute('id')} displayed"  aria-pressed="false">
           <div id="item-el">
               <img src="/images/icon-${item.getAttribute('id')}.svg" alt="">
           </div>
         </div>
        `
    }

    static playAgain(){
        playSection.style.display = 'none';
        document.querySelector('#choose-section').style.display = 'flex';
        human.innerHTML ='';
        comp.innerHTML ='';
        result.parentElement.style.display ='none';
    }
}

class Game{
    static checkWin(human,comp){
        let humanId = human.getAttribute('id');
        let comId = comp.getAttribute('id');
        
        if(humanId === comId){
            result.parentElement.style.display = 'block';
            result.textContent = 'You Draw';
        }else{
            
            if((humanId === 'rock' && comId === 'scissors') ||
              (humanId === 'scissors' && comId === 'paper') ||
              (humanId === 'paper' && comId === 'rock')){
                result.textContent = 'You win!';
                result.parentElement.style.display = 'block';
                count++;
                score.textContent  = count;

              }else{
                result.textContent = 'You lose';
                result.parentElement.style.display = 'block';
              }
        }
    }

}

ruleButton.addEventListener('click',()=>UI.rules(),false);
closebtn.addEventListener('click',()=>UI.close(),false);

window.addEventListener('click',(e)=>{
    if(e.target === document.querySelector('.card')){
        UI.close();
    }
})

//Playing game
function random(arr){
    let l = arr.length;
    return arr[Math.floor(Math.random()*l)+0];
}


arr.forEach((item)=>{
    item.addEventListener('click',()=>{
        //Selection by Human
        function hum(){
            return new Promise(resolve=>{
                resolve(UI.choose(item,human));
                item.setAttribute('aria-pressed',true);
            });
        }
        hum();

        let ran = random(arr);
        //Selection by Computer
        hum()
            .then(()=>{
                setTimeout(()=>{
                    UI.choose(ran,comp);
                },2000);
                result.parentElement.parentNode.classList.add('animate');
            })
            .then(()=>{
                setTimeout(()=>{ 
                  
                    Game.checkWin(item,ran);

                },3000)
            });
    })
})

//PlayAgain

document.querySelector('#replay-button')
    .addEventListener('click',()=>{
        UI.playAgain();
    })