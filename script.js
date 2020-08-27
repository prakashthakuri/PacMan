document.addEventListener('DOMContentLoaded', () => {
    const grid= document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28 //28 * 28 = 784
    let score = 0

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
    //Legend
    //0 - pac-dot
    //1-wall
    //2- ghost-liar
    //3 power-pellet
    //4 empty

    //draw the grid and render it

    const squares = []

    function createBoard() {
        for(let i =0; i< layout.length; i++){
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)


            //add layout to the board
            if(layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            }else if(layout[i] === 1){
                squares[i].classList.add('wall')
            }else if(layout[i] === 2){
                squares[i].classList.add('ghost-liar')
            }else if(layout[i] === 3){
                squares[i].classList.add('power-pellet')
            }
        }
    }
    createBoard()

    let pacmanCurrentIndex = 490

    squares[pacmanCurrentIndex].classList.add('pac-man')

    function movePacman(e){


    squares[pacmanCurrentIndex].classList.remove('pac-man')

    switch(e.keyCode){
        case 37:
            if(
                pacmanCurrentIndex % width !==0 && 
                !squares[pacmanCurrentIndex -1].classList.contains('wall') && 
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-liar'))
                pacmanCurrentIndex -=1

            //&& !squares[pacmanCurrentIndex -1].classList.contains('wall') ---> this codes block doesnot let our pacman to go through the walls

            //check if pacman is in the left exit
            //moving from left to right
            if((pacmanCurrentIndex -1) === 363){
                squares[pacmanCurrentIndex].classList.add('pac-man')
                pacmanCurrentIndex = 391
                squares[364].classList.remove('pac-man')
            }
            break
        case 38:
            if(
                pacmanCurrentIndex -width >=0 && 
                !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex- width].classList.contains('ghost-liar')) pacmanCurrentIndex -=width
            break
        case 39:
            if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex +1].classList.contains('ghost-liar')) 
            pacmanCurrentIndex +=1

            //check if pacman is in right exit
            //moving from right to left

            if((pacmanCurrentIndex +1) === 392){
                squares[pacmanCurrentIndex].classList.add('pac-man')
                pacmanCurrentIndex = 364
                squares[391].classList.remove('pac-man')
            }
            break
        case 40:
            if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            !squares[pacmanCurrentIndex +width].classList.contains('ghost-liar')) pacmanCurrentIndex +=width
            break
        }

        squares[pacmanCurrentIndex].classList.add('pac-man')

        pacDotEaten()
        powerPelletEaten()
        checkforGameOver()
        checkforWin()
    }

    document.addEventListener('keyup', movePacman) // movement of pacman, but here the problem is pacman moves through the wall, fixed in thw switch case




    //when pacman eats a pac-dots

    function pacDotEaten() {
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
            score ++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
        }
    }



    //create Ghost templates
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerId = NaN

        }
    }
    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)    
    ]

    //draw the 4 ghosts onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add("ghost")
        
    })
    //move the ghost randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    //function to move the ghost
    function moveGhost(ghost){
        const directions = [-1,+1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)] // math.floor gets the nearest integer number just in case it doesnot get the wired number from math.random
       
        ghost.timerId = setInterval(function() {
            //if the next square of your ghost is going to go in does not contain a wall and a ghotst, you can go there

            if(
                !squares[ghost.currentIndex + direction].classList.contains('wall') && 
                !squares[ghost.currentIndex + direction].classList.contains('ghost'))
                {
                //you can go here
                //remove all ghost related classes
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')

                //change the currentindex to the new safe square
                ghost.currentIndex +=direction
                //redraw the ghost n the new safe place
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
                //else find a new direction to try
            
            }else direction = directions[Math.floor(Math.random() * directions.length)]


            //if the ghost is currently scare

            if(ghost.isScared ) {
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            //if the ghost is scared and pacman runs into it

            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = ghost.startIndex
                score +=100
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }

            checkforGameOver()
        }, ghost.speed)
    }

    //when pacman eats the power-pellet
    //all th ghost turns blue
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
            score +=10
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScaredGhosts, 10000)
            squares[pacmanCurrentIndex].classList.remove('power-pellet')
           
        }
    }

    //make the ghosts stop flashing

    function unScaredGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
    }

    //check for gameover
    function checkforGameOver() {

        if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            setTimeout(function() {
                alert('GAME OVER!')
            }, 500)
        }

    }

    //win function
    function checkforWin() {
        if(score ===274){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            scoreDisplay.innerHTML = 'CONGRATULATIONS!, YOU WON!'
        }
    }
})