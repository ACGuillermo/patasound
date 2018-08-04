let sound = [[32,32,32,32],[32,32,32,32],[32,32,32,32],[32,32,32,32]] //4*4

window.addEventListener('keydown', populateSounds)
window.addEventListener('keydown', playSound)


const playButton = document.querySelector('.play')
playButton.addEventListener('click', playRecord);


function populateSounds (e){
  console.log(e.keyCode);
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



function playRecord (){
  var playInterval = setInterval(playColumn, 400); //Play column 0.4s rate
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


function playSound(e){//Play sound on keypress
  prevPosition = position;
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  if(!audio) return; //stop the function from running.
  audio.currentTime = 0; //reset sound.
  audio.play();
  if (position == 16){
    return
  }
  drawFilled()//Draw filled before moving position.
  position++
  drawFocus(prevPosition);//Draw Focus after moving position. 
}

let position = 1;// position of focus (red border!)
let prevPosition = 1;//last position of focus

window.addEventListener('keydown', moveFocus)

function moveFocus(e){ //Move focus with arrow keys
  prevPosition = position;
  let move = e.keyCode;
  switch (move) {
    case 38: //up
      if(position == 1 || position == 2 || position == 3 || position == 4){
        position += 12;
        drawFocus(prevPosition);
      } else{
        position -= 4;
        drawFocus(prevPosition);
        }
      break;
    case 37: //left
      if(position == 1 || position == 5 || position == 9 || position == 13){
        position += 3;
        drawFocus(prevPosition);
      } else{
        position -= 1;
        drawFocus(prevPosition);
        }
      break;
    case 40: //down
      if (position == 13 || position == 14 || position == 15 || position == 16) {
        position -= 12;
        drawFocus(prevPosition);
      } else{
        position += 4;
        drawFocus(prevPosition)
        }
      break;
    case 39://right
      if (position == 4 || position == 8 || position == 12 || position == 16){
        position -= 3;
        drawFocus(prevPosition);
      } else{
        position += 1;
        drawFocus(prevPosition)
        }
      break;
  }

}

function drawFocus(lastPos){//Draw focus
  const lastBlock = document.getElementById(lastPos);
  lastBlock.classList.remove('active')
  const block = document.getElementById(position)
  block.classList.add('active')
}

function drawFilled(){//Draw Filled when sound in box
  const block = document.getElementById(position);
  block.classList.add('filled')
}
