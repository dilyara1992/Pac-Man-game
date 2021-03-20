const width = 28
const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
let squares = []

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
}

document.addEventListener('keyup', control)