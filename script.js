window.addEventListener('keydown', playSound)

let column = [[],[],[],[]] //4*4

window.addEventListener('keydown', function(e){
  if (column[0].length < 4){
    column[0].push(e.keyCode)
  } else if(column[1].length < 4){
    column[1].push(e.keyCode)
  } else if(column[2].length < 4){
    column[2].push(e.keyCode)
  } else if(column[3].length < 4){
    column[3].push(e.keyCode)
  } else return
})

const playButton = document.querySelector('.play')
playButton.addEventListener('click', playRecord);
let index = 0;

function playRecord (){
  var playInterval = setInterval(playColumn, 400); //Play column 0.4s rate
}

function playColumn (){ //loop through the column sound.
    if(index > 3) index = 0;
    column[index].map((k)=>{
    const aud = document.querySelector(`audio[data-key="${k}"]`)
    aud.currentTime = 0;
    aud.play();
    })
    index++
    console.log(index);
}

function playSound(e){
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  if(!audio) return; //stop the function from running.
  audio.currentTime = 0; //reset sound.
  audio.play()
}
