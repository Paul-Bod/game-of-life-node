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

exports.createBoard = function(seed) {    
    var board = seed.map(function (row, rowIndex) {
        var cells = row.map(function (item, itemIndex) {
            var alive = seed[rowIndex][itemIndex] === 1;
            return {alive: alive, neighbours: exports.findNeighbours(seed, rowIndex, itemIndex)}
        })
        return cells;
    });
    
    return board;
}