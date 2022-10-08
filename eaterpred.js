class EaterPred {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 5
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 8) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 5
            var grEat = new EaterPred(newX, newY)
            grassEaterArr.push(grEat)


            this.multiply = 0
        }


    }


    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 0) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];

            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;
        } else {
            if (this.energy < 0) {
                this.die();
            }
        }
    }


    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            for (var i in eaterpredArr) {
                console.log(eaterpredArr);
                if (newX == eaterpredArr[i].x && newY == eaterpredArr[i].y) {
                    eaterpredArr.splice(i, 1)
                    break
                }
            }


        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (var i in eaterpredArr) {
            if (this.x == eaterpredArr[i].x && this.y == eaterpredArr[i].y) {

                eaterpredArr.splice(i, 1);
                break;
            }
        }
    }

}