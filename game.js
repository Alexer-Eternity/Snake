let head_finished = true
let snakeSpeed =8
const snakeBody=[{x:11,y:11}]
let EXPANSION_RATE = 5
const GRID_SIZE = 21
let newSegments =0
let inputDirection ={x : 0 ,y :0 }
let food = getRandomFoodPosition()
let gameOver = false


var ExpansionSlider = document.getElementById("EXPANSION_RATE");

ExpansionSlider.oninput = function() {
  EXPANSION_RATE = this.value;
  console.log("Success")
}

var ExpansionSlider = document.getElementById("SpeedSlider");
ExpansionSlider.oninput = function() {
  snakeSpeed = this.value;
  console.log("Success")
}
window.addEventListener('keydown',e => {
  var x = document.getElementsByClassName("head");

//The switch statement is similar to the if statement
  switch (e.key){
      case 'w':
      if (lastInputDirection.y !== 0 ) break
         inputDirection = { x: 0, y: -1}
         x.id= "triangle-up"
        break
      case 's':
      if (lastInputDirection.y !== 0 ) break
         inputDirection = { x: 0, y: 1}
         x.id= "triangle-down"
        break
      case 'a':
      if (lastInputDirection.x !== 0 ) break
         inputDirection = { x: -1, y: 0}
         x.id= "triangle-left"
        break
      case 'd':
      if (lastInputDirection.x !== 0 ) break
         x.id= "triangle-right"
         inputDirection = { x:1, y:0}

        break

  }
})
function expandSnake(amount){
  newSegments += amount
}
function randomGridPosition() {
  return{
    x: Math.floor(Math.random()*GRID_SIZE) + 1,
    y: Math.floor(Math.random()*GRID_SIZE) + 1
  }

}
//sets the defualt of the bolean to false
function onSnake(position,{ ignoreHead = false} = {}){

  //The some() method repeats once for every item of an array
  //Returns true when one or more one of the sub functions returns true
  //With segments being the individal varables within the array
  return snakeBody.some((segments,index) =>{
    //console.log(index)
  if (ignoreHead && index === 0) return false
      return equalPositions(segments, position)

  })
}
function equalPositions(pos1,pos2){
  return(
    pos1.x === pos2.x  &&    pos1.y === pos2.y
  )
}

function getRandomFoodPosition(){
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)){
    newFoodPosition = randomGridPosition()
  }
  return(newFoodPosition)
}

function addSegments(){
  for (let i = 0;i < newSegments; i++){
    snakeBody.push({...snakeBody[snakeBody.length-1]})
  }
  newSegments = 0
}


function checkDeath(){
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
function outsideGrid(position){
  return(
    position.x <1 || position.x> GRID_SIZE ||
    position.y <1 || position.y > GRID_SIZE
  )
}
function  getSnakeHead(){
  return snakeBody[0]
}
function snakeIntersection(){
  return onSnake(snakeBody[0],{ignoreHead: true})
}

function updateFood(){
  if (onSnake(food)){
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
  }
}


function drawFood(gameBoard){


    const foodElement = document.createElement("div")
    foodElement.style.gridRowStart =food.y
    foodElement.style.gridColumnStart =food.x

    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
  }


function getInputDirection(){
  lastInputDirection = inputDirection
  return inputDirection
}
function updateSnake(){
  addSegments()
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length- 2; i >= 0;i-- ){
  snakeBody[i+1] = {...snakeBody[i]}
}
  snakeBody[0].x+= inputDirection.x
  snakeBody[0].y+= inputDirection.y
}


function drawSnake(gameBoard){
  if (gameOver) return;
  head_finished = true
  gameBoard.innerHTML =""

  snakeBody.forEach(segment =>{
    const snakeElement = document.createElement("div")
    if (head_finished && !gameOver){
        snakeElement.classList.add('head')
        head_finished = false
    }
    snakeElement.style.gridRowStart =segment.y
    snakeElement.style.gridColumnStart =segment.x

    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })

}



let lastRenderTime = 0
const gameBoard = document.getElementById("gameboard")
function main(currentTime){
  if (gameOver){
    alert("Your time has come");
    snakeBody=[{x:11,y:11}]
    food = getRandomFoodPosition()
    }
  }
  window.requestAnimationFrame(main)
  const SinceLastRender = (currentTime - lastRenderTime) /1000
 
  if(SinceLastRender < 1/snakeSpeed) return

  lastRenderTime = currentTime
  update()
  draw()
}
function update(){
  updateSnake();
  updateFood()
  checkDeath()
}
function draw(){
 drawSnake(gameBoard);
 drawFood(gameBoard)
}
    window.requestAnimationFrame(main)
