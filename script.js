window.addEventListener('keydown', playSound)

let sound = [[],[],[],[]] //4*4

window.addEventListener('keydown', populateSounds)

const playButton = document.querySelector('.play')
playButton.addEventListener('click', playRecord);



function populateSounds (e){
  if (sound[0].length == 0){
    sound[0].push(e.keyCode)
  } else if(sound[1].length == 0){
    sound[1].push(e.keyCode)
  } else if(sound[2].length == 0){
    sound[2].push(e.keyCode)
  } else if(sound[3].length == 0){
    sound[3].push(e.keyCode)
  } else return
}



function playRecord (){
  var playInterval = setInterval(playColumn, 400); //Play column 0.4s rate
}


let index = 0;//counter for looping throung groups of sounds(columns/arrays inside sound array)
function playColumn (){ //loop through the column sound.
    if(index > 3) index = 0; //reset the loop
    sound[index].map((k)=>{
    const aud = document.querySelector(`audio[data-key="${k}"]`)
    aud.currentTime = 0;
    aud.play();
    })
    index++ //To go next group of sound/column
    console.log(index);
}





function playSound(e){
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  if(!audio) return; //stop the function from running.
  audio.currentTime = 0; //reset sound.
  audio.play();
  drawFocus();
}
let position = 1;// position of focus (red border!)

function drawFocus(){//Draw focus + fill if sound in.
  if (position > 1){//if position =! first position calculate last position to remove class 'active'
    let lastPosition = position -1
    const lastBloque = document.getElementById(lastPosition);
    lastBloque.classList.remove('active')
  }

  const bloque = document.getElementById(position)
  bloque.classList.add('active')
  bloque.classList.add('filled')
  position++
}
