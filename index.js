const width = 28
const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
let squares = []
let score = 0


class Ghost{

    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }


}

const ghosts = [
    new Ghost('blinky', 348,250),
    new Ghost ('pinky', 376, 400),
    new Ghost('inky', 351,300),
    new Ghost('clyde', 379, 500)
]


//28*28 = 784

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

//create board

function createBoard(){
 
    for (let i = 0; i < layout.length;i++){

        // Creating squares
        const square = document.createElement("div")

        // Adding new squares to the grid
        grid.appendChild(square)

        // Pushing squares to square array
        squares.push(square)

        // Adding Styling

        if (layout[i] === 0){
            squares[i].classList.add('pac-dot')
        }
        else if (layout[i] === 1){
            squares[i].classList.add('wall')
        }
        else if (layout[i] === 2){
            squares[i].classList.add('ghost-lair')
        }
        else if (layout[i] === 3){
            squares[i].classList.add('power-pellet')
        }
        else if (layout[i] === 4){
            squares[i].classList.add('empty')
        }
    }
}

createBoard()


// starting position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add("pac-man")


//Moving Pacman with Keys and EventListeners

function control(e){
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    // down key : 40
    // up key: 38
    // left key: 37
    // right key: 39

    switch(e.keyCode){
 
        case 37:
            console.log("Pressed LEFT")
            if ((pacmanCurrentIndex % width !== 0)
            && (!squares[pacmanCurrentIndex-1].classList.contains('wall'))
            && (!squares[pacmanCurrentIndex-1].classList.contains('ghost-lair'))){
                pacmanCurrentIndex -= 1
                if(pacmanCurrentIndex === 364){
                    pacmanCurrentIndex = 391;
                }
            }
            break
        case 38:
            console.log("pressed keyboard UP")
            if (
            (pacmanCurrentIndex - width > width)
            &&(!squares[pacmanCurrentIndex - 28].classList.contains('wall'))
            &&(!squares[pacmanCurrentIndex - 28].classList.contains('ghost-lair')))
            {
                pacmanCurrentIndex -= 28
            }
            break
        case 39:
            console.log("Preseed RIGHT")
            if ((pacmanCurrentIndex % 28 < 28 - 1)
            &&(!squares[pacmanCurrentIndex + 1].classList.contains('wall'))
            &&(!squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair'))){
                pacmanCurrentIndex += 1
                if(pacmanCurrentIndex === 391){
                    pacmanCurrentIndex = 364;
                }
            }
            break
        case 40:
            console.log("Pressed down")
            if ((pacmanCurrentIndex + 28 < 28*28)
            && (!squares[pacmanCurrentIndex + width].classList.contains('wall'))
            && (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')))
            {
                pacmanCurrentIndex += 28
            }
            break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
}

document.addEventListener('keyup', control)

function pacDotEaten(){
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten(ghost){
    //if square pacman is in contains power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        squares[pacmanCurrentIndex].classList.remove('power-pellet')

        //add a score of 10
        score+=10
        scoreDisplay.innerHTML = score

        ghosts.forEach(ghost=> ghost.isScared = true)

        console.log("Ghosts Scared")

        //use setTimeout to unscare ghosts after 10 seconds
        setTimeout(unScareGhosts, 10000)
    }
}

function unScareGhosts(){
    ghosts.forEach(ghost=> ghost.isScared = false)
    console.log("Ghosts are NOT scared")
}


//Draw my ghosts onto my grid

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})


//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    console.log('moved ghost')
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    console.log(direction)
    
    ghost.timerId = setInterval(function() {
        //all our code
        //if the next square does NOT contain a wall and does not contain a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
                //remove any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        // //add direction to current Index
        ghost.currentIndex += direction
        // //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className)  
        squares[ghost.currentIndex].classList.add('ghost')  
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared 
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        
        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            //add a score of 100
            score +=100
            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion  
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
    }, ghost.speed )
}


//Check for game over

function checkForGameOver(){
     //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
     if (
         (squares[pacmanCurrentIndex].classList.contains('ghost'))
         &&!(squares[pacmanCurrentIndex].classList.contains('scared-ghost'))
     ){

        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        
        //remove eventlistener from our control function
        document.removeEventListener('keyup', control)
       
        //tell user the game is over
        scoreDisplay.innerHTML = "The Game is Over! You Lost"

     }
  
}


//Check for Win

function checkForWin(){
    if (score === 274){
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))

        //remove eventlistener from our control function
        document.removeEventListener('keyup', control)

        //tell user the game is over
        scoreDisplay.innerHTML = "The Game is Over! You WON"
    }
}