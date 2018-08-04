window.addEventListener('keydown', playSound)

let sound = [[],[],[],[]] //4*4

window.addEventListener('keydown', populateSounds)

const playButton = document.querySelector('.play')
playButton.addEventListener('click', playRecord);


let totalSounds = 0 //Counter for total sounds. Max sounds in a column = 4(sound[i].length = 4)
function populateSounds (e){
  if (totalSounds == 0 || totalSounds == 4 || totalSounds == 8 || totalSounds == 12){
    sound[0].push(e.keyCode)
  } else if (totalSounds == 1 || totalSounds == 5 || totalSounds == 9 || totalSounds == 13){
    sound[1].push(e.keyCode)
  } else if(totalSounds == 2 || totalSounds == 6 || totalSounds == 10 || totalSounds == 14){
    sound[2].push(e.keyCode)
  }else{
    sound[3].push(e.keyCode)
  }

  totalSounds++
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
    drawColumn(index);
    index++ //To go next group of sound/column
    console.log(index);
}


function drawColumn (i){//Drawing columns when looping through them
  let indexColumn = [[1,5,9,13],[2,6,10,14],[3,7,11,15],[4,8,12,16]]
  if(i>0){
    let aux = i - 1;
    indexColumn[aux].map((id)=>{
      const auxBox = document.getElementById(id);
      auxBox.classList.remove('active')
    })
  }
  indexColumn[3].map((id)=>{
    const auxBox = document.getElementById(id);
    auxBox.classList.remove('active')
  })
  indexColumn[i].map((id)=>{
    const box = document.getElementById(id)
    box.classList.add('active')
  })
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
