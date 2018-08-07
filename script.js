let sound = [[32,32,32,32],[32,32,32,32],[32,32,32,32],[32,32,32,32]] //4*4
const validKey = [81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,90,88,67,86,66,78,77] //array with valid keyCodes

//window.addEventListener('keydown', populateSounds)
window.addEventListener('keydown', playSound)

//Buttons
const playButton = document.querySelector('.play') //Play button
playButton.addEventListener('click', playRecord);

const stopButton = document.querySelector('.stop') //Stop Buttons
stopButton.addEventListener('click', stopPlaying)

const resetButton = document.querySelector('.reset')
resetButton.addEventListener('click', resetAll)




//Play, stop and reset functions.
function stopPlaying(){ //stop looping
  position = 1;
  prevPosition = 1;
  index = 0;
  clearInterval(playInterval);
  clearAllFocus();
  drawFocus();

}

function resetAll(){ //Reset focus/filled and stored sounds
  stopPlaying()
  clearAllFilled()
  //set Sounds to 32 (silence)
  sound.forEach(function(column){
    column.forEach(function(e, index, array){
      array[index] = 32;
    })
  })
}

var playInterval = null;// Declared outside playRecord function so i can call clearInterval on it from outside.
function playRecord (){
  playInterval = setInterval(playColumn, 400); //Play column 0.4s rate
}

let index = 0;//counter for looping throung groups of sounds(columns/arrays inside sound array)
function playColumn (){ //loop through the column sound.
    if(index > 3) index = 0; //reset the loop
    sound[index].map((k)=>{
    const aud = document.querySelector(`audio[data-key="${k}"]`)
    if(!aud) return
    aud.currentTime = 0;
    aud.play();
    })
    drawColumn(index);
    index++ //To go next group of sound/column
    console.log(index);
}

function drawColumn (i){//Drawing columns when looping through them
  let indexColumn = [[1,5,9,13],[2,6,10,14],[3,7,11,15],[4,8,12,16]] // Columns matching Ids in html
  if(i>0){
    let aux = i - 1;
    indexColumn[aux].map((id)=>{//remove active from last column
      const auxBox = document.getElementById(id);
      auxBox.classList.remove('active')
    })
  }
  indexColumn[3].map((id)=>{//remove active from 4th column
    const auxBox = document.getElementById(id);
    auxBox.classList.remove('active')
  }) //Draw active current column
  indexColumn[i].map((id)=>{
    const box = document.getElementById(id)
    box.classList.add('active')
  })
}




//Play and store sound functions.
function playSound(e){//Play sound on keypress
  prevPosition = position;
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  if(!audio) return; //stop the function from running.
  audio.currentTime = 0; //reset sound.
  audio.play();
  populateSounds(e);
  drawFilled(e)//Draw filled before moving position.
  if (position == 16){
    return
  }
  position++
  drawFocus(prevPosition);//Draw Focus after moving position.
}

function populateSounds (e){ //Put keyCodes inside sound array.

  if (validKey.indexOf(e.keyCode) == -1) return // Stop function when the key has no sound.
  let auxPos = 0
  switch(position){
      case 1:
        auxPos = 0
        sound[0][0] = e.keyCode
        break;
      case 5:
        auxPos = 1
        sound[0][1] = e.keyCode
        break;
      case 9:
        auxPos = 2
        sound[0][2] = e.keyCode
        break;
      case 13:
        auxPos = 3
        sound[0][3] =e.keyCode
        break;

      case 2:
        auxPos = 0;
        sound[1][0] = e.keyCode
        break;
      case 6:
        auxPos = 1;
        sound[1][1] = e.keyCode
        break;
      case 10:
        auxPos = 2;
        sound[1][2] = e.keyCode
        break;
      case 14:
        auxPos = 3;
        sound[1][3] = e.keyCode
        break;

      case 3:
        auxPos = 0;
        sound[2][0] = e.keyCode
        break;
      case 7:
        auxPos = 1;
        sound[2][1] = e.keyCode
        break;
      case 11:
        auxPos = 2;
        sound[2][2] = e.keyCode
        break;
      case 15:
        auxPos = 3;
        sound[2][3] = e.keyCode
        break;

      case 4:
        auxPos = 0;
        sound[3][0] = e.keyCode
        break;
      case 8:
        auxPos = 1;
        sound[3][1] = e.keyCode
        break;
      case 12:
        auxPos = 2;
        sound[3][2] = e.keyCode
        break;
      case 16:
        auxPos = 3;
        sound[3][3] = e.keyCode
        break;
    }
}

let position = 1;// position of focus (red border!)
let prevPosition = 1;//last position of focus

window.addEventListener('keydown', moveFocus)




//Focus and Filled functions.
function moveFocus(e){ //Move focus with arrow keys
  prevPosition = position;
  let move = e.keyCode;
  switch (move) {
    case 38: //up
      if(position == 1 || position == 2 || position == 3 || position == 4){
        position += 12;
        drawFocus();
      } else{
        position -= 4;
        drawFocus();
        }
      break;
    case 37: //left
      if(position == 1 || position == 5 || position == 9 || position == 13){
        position += 3;
        drawFocus();
      } else{
        position -= 1;
        drawFocus();
        }
      break;
    case 40: //down
      if (position == 13 || position == 14 || position == 15 || position == 16) {
        position -= 12;
        drawFocus();
      } else{
        position += 4;
        drawFocus()
        }
      break;
    case 39://right
      if (position == 4 || position == 8 || position == 12 || position == 16){
        position -= 3;
        drawFocus();
      } else{
        position += 1;
        drawFocus()
        }
      break;
  }

}

function drawFocus(){//Draw focus
  const lastBlock = document.getElementById(prevPosition);
  lastBlock.classList.remove('active')
  const block = document.getElementById(position)
  block.classList.add('active')
}

function drawFilled(e){//Draw Filled when sound in box
  if(e.keyCode == 32) return// if press Space (keycode = 32) dont draw as filled with sound
  const block = document.getElementById(position);
  block.classList.add('filled')
}

function clearAllFocus(){//Clear focus. called when stopPlaying
  const allBoxes = document.querySelectorAll('.item')
  Array.from(allBoxes).map((box) =>{
    box.classList.remove('active');
  })
}

function clearAllFilled(){//Clear filled. Called when reseting.
  const allBoxes = document.querySelectorAll('.item')
  Array.from(allBoxes).map((box)=>{
    box.classList.remove('filled')
  });
}
