var life = require('./life');

exports.findNeighbours = function(seed, rowIndex, itemIndex) {
    var y = seed.length;
    var x = seed[0].length;
    var previousRow = rowIndex - 1;
    var nextRow = rowIndex + 1;
    var previousItem = itemIndex - 1;
    var nextItem = itemIndex + 1;
    
    var neighbours = 0;
    
    if (previousRow > -1 && previousItem > -1) {
        neighbours += seed[previousRow][previousItem];
    }
    
    if (previousItem  > -1) {
        neighbours += seed[rowIndex][previousItem];
    }
    
    if (nextRow < y && previousItem > -1) {
        neighbours += seed[nextRow][previousItem];
    }
    
    if (previousRow > -1) {
        neighbours += seed[previousRow][itemIndex];
    }
    
    if (nextRow < y) {
        neighbours += seed[nextRow][itemIndex];
    }
    
    if (previousRow > -1 && nextItem < x) {
        neighbours += seed[previousRow][nextItem];
    }
    
    if (nextItem < x) {
        neighbours += seed[rowIndex][nextItem];
    }
    
    if (nextRow < y && nextItem < x) {
        neighbours += seed[nextRow][nextItem];
    }
    
    return neighbours;
}

exports.print = function(board) {
    var toPrint = board.map(function (row, rowIndex) {
        var cells = row.map(function (item, itemIndex) {      
            if (board[rowIndex][itemIndex] === 1) {
                return '*';
            }
            return '-';
        })
        return cells;
    });
    console.log('\033[2J');
    console.log('\033[;H');
    console.log(toPrint);
};

exports.nextIteration = function(seed) {
    return seed.map(function (row, rowIndex) {
        var cells = row.map(function (item, itemIndex) {
            var alive = seed[rowIndex][itemIndex] === 1;
            var neighbours = exports.findNeighbours(seed, rowIndex, itemIndex);
            
            if ((alive && life.cellShouldSurvive(neighbours)) || life.cellShouldRevive(neighbours)) {
                return 1;
            }
            return 0;

        })
        return cells;
    });
}