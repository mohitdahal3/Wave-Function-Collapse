class Cell{
    constructor(x , y){
        this.x = x
        this.y = y
        this.collapsed = false
        this.options = {
            'BLANK'  : [0],
            'PISTON' : [0 , 1 , 2 , 3],
            'LINE'   : [0 , 1],
            'PLUS'   : [0]
        }
        this.tile = undefined
        this.orientation = undefined
        this.edges = undefined
    }

    show(){
        if(!this.collapsed){
            fill(0)
            stroke(255)
            rect(this.x * w, this.y * w, w, w)
            
        }else{
            push()

            translate((this.x * w) + (w/2) , (this.y * w) + (w/2))
            rotate( (this.orientation) * (PI/2) )
            imageMode(CENTER)
            image(this.tile, 0, 0, w, w)

            pop()

        }
    }

    calculateNumberOfOptions(){
        let numOptions = 0
        let keys = Object.keys(this.options)
        keys.forEach(tileName => {
            numOptions += this.options[tileName].length
        });
        return numOptions
    }

    getNeighbours(){
        let neighbours = {}

        if(this.y > 0){
            neighbours['TOP'] = (grid[this.x][this.y - 1])
        }
        if(this.x < n-1){
            neighbours['RIGHT'] = (grid[this.x + 1][this.y])
        }
        if(this.y < n-1){
            neighbours['BOTTOM'] = (grid[this.x][this.y + 1])
        }
        if(this.x > 0){
            neighbours['LEFT'] = (grid[this.x - 1][this.y])
        }

        return neighbours
    }

    updateOptions(){
        let neighbours = this.getNeighbours()

        if(neighbours['TOP'] && neighbours['TOP'].collapsed){
            let edgeValue = neighbours['TOP'].edges[2]
            let tileNames = Object.keys(this.options)
            tileNames.forEach(tileName => {
                let tileOptions = this.options[tileName]
                this.options[tileName] = tileOptions.filter(orientation => {
                    return edgeInfo[tileName][orientation][0] == edgeValue
                })
                if(this.options[tileName].length == 0){
                    delete this.options[tileName]
                }
            });
        }

        if(neighbours['RIGHT'] && neighbours['RIGHT'].collapsed){
            let edgeValue = neighbours['RIGHT'].edges[3]
            let tileNames = Object.keys(this.options)
            tileNames.forEach(tileName => {
                let tileOptions = this.options[tileName]
                this.options[tileName] = tileOptions.filter(orientation => {
                    return edgeInfo[tileName][orientation][1] == edgeValue
                })
                if(this.options[tileName].length == 0){
                    delete this.options[tileName]
                }
            });

        }

        if(neighbours['BOTTOM'] && neighbours['BOTTOM'].collapsed){
            let edgeValue = neighbours['BOTTOM'].edges[0]
            let tileNames = Object.keys(this.options)
            tileNames.forEach(tileName => {
                let tileOptions = this.options[tileName]
                this.options[tileName] = tileOptions.filter(orientation => {
                    return edgeInfo[tileName][orientation][2] == edgeValue
                })
                if(this.options[tileName].length == 0){
                    delete this.options[tileName]
                }
            });
        }

        if(neighbours['LEFT'] && neighbours['LEFT'].collapsed){
            let edgeValue = neighbours['LEFT'].edges[1]
            let tileNames = Object.keys(this.options)
            tileNames.forEach(tileName => {
                let tileOptions = this.options[tileName]
                this.options[tileName] = tileOptions.filter(orientation => {
                    return edgeInfo[tileName][orientation][3] == edgeValue
                })
                if(this.options[tileName].length == 0){
                    delete this.options[tileName]
                }
            });
        }

    }
}