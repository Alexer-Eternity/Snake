let head_finished = true
let snakeSpeed =8
const snakeBody=[{x:11,y:11}]
let EXPANSION_RATE = 5
const GRID_SIZE = 21
let newSegments =0
//e => { } is short for function(e){ }
let inputDirection ={x : 0 ,y :0 }
let food = getRandomFoodPosition()
let gameOver = false


var ExpansionSlider = document.getElementById("EXPANSION_RATE");// Display the default slider value

// Update the current slider value (each time you drag the slider handle)
ExpansionSlider.oninput = function() {
  EXPANSION_RATE = this.value;
  console.log("Success")
}

var ExpansionSlider = document.getElementById("SpeedSlider");// Display the default slider value

// Update the current slider value (each time you drag the slider handle)
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
    //console.log(randomGridPosition())
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)){
    newFoodPosition = randomGridPosition()
  }
  return(newFoodPosition)
}

function addSegments(){
  for (let i = 0;i < newSegments; i++){
//The push() method adds one or more elements to the end of an array and returns the new length of the array.
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
 //console.log("draw")


    const foodElement = document.createElement("div")
    //specifies the food segments dposition within the css grid
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
//give each of segments the prevous segments' properties
  snakeBody[i+1] = {...snakeBody[i]}
}
 //gives the head segment new properties
  snakeBody[0].x+= inputDirection.x
  snakeBody[0].y+= inputDirection.y
}


function drawSnake(gameBoard){
  if (gameOver) return;
  head_finished = true
  gameBoard.innerHTML =""
 //Loop through each segment of the snake,
 //forEach calls a function for each element in an array
 // With "snakeBody" being the array and "segment" being the function
  snakeBody.forEach(segment =>{
    const snakeElement = document.createElement("div")
    if (head_finished && !gameOver){
        snakeElement.classList.add('head')
        head_finished = false
    }
//segment stores the individal variables with in the snakeBody array
//specifies the snakes segments' position within the css grid
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
    //console.log("hit")
    //Waits until user press OK
    if(confirm("You lost. Press OK to restart.")){
        //resets the window
      window.location ='./main.html'
    }
    return
  }
  window.requestAnimationFrame(main)
  const SinceLastRender = (currentTime - lastRenderTime) /1000
  //Renders the frames accroding tho the snakeSpeed
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
