let w , n; //width of each cell and number of cells in a row
let grid = []; //nxn

let BLANK, PISTON, LINE, PLUS, ALL_TILES = {}

let edgeInfo

function preload() {
    BLANK = loadImage('images/blank.png');
    PISTON = loadImage('images/piston.png');
    LINE = loadImage('images/line.png');
    PLUS = loadImage('images/plus.png');

    ALL_TILES['BLANK'] = BLANK
    ALL_TILES['PISTON'] = PISTON
    ALL_TILES['LINE'] = LINE
    ALL_TILES['PLUS'] = PLUS
}

function setup(){
    createCanvas(700, 700)
    n = 20
    w = floor(width / n)


    edgeInfo = { //Needs to match with cell's options
        'BLANK' : [[0,0,0,0]],
        'PISTON' : [ [1,1,0,1] , [1,1,1,0] , [0,1,1,1] , [1,0,1,1] ],
        'LINE' : [[0,1,0,1] , [1,0,1,0]],
        'PLUS' : [[1,1,1,1]]
    }


    
    for(let i = 0; i < n; i++){
        grid[i] = []
        for(let j = 0; j < n; j++){
            grid[i][j] = new Cell(i , j)
        }
    }

    //choose a random cell from the grid
    let randomX = floor(random(n))
    let randomY = floor(random(n))
    var initialCell = grid[randomX][randomY]

    collapseCell(initialCell)


}

function draw(){
    let leastOptionsCells = []
    let lowestOptions = Infinity
    
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            grid[i][j].show()

            if(!grid[i][j].collapsed){
                grid[i][j].updateOptions()

                let numberOfOptions = grid[i][j].calculateNumberOfOptions()
                if(numberOfOptions < lowestOptions){
                    lowestOptions = numberOfOptions
                    leastOptionsCells = []
                }
                if(numberOfOptions == lowestOptions){
                    leastOptionsCells.push(grid[i][j])
                }
            }

        }
    }


    let randomLeastOptionsCell = random(leastOptionsCells)
    if(randomLeastOptionsCell){
        collapseCell(randomLeastOptionsCell)
    }else{
        noLoop()
    }
}


function collapseCell(cell){
    randomTile = random(Object.keys(cell.options))
    randomOrientation = random(cell.options[randomTile])
    
    cell.options = {}
    cell.options[randomTile] = [randomOrientation]

    cell.tile = ALL_TILES[randomTile]
    cell.orientation = randomOrientation
    
    cell.collapsed = true

    cell.edges = edgeInfo[randomTile][randomOrientation]
}