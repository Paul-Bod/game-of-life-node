var board = require('./board')

exports.play = function(seed) {
    function tick(seed) {
        board.print(seed);
        var nextIteration = board.nextIteration(seed);
        setTimeout(function () {tick(nextIteration)}, 250);
    }
    
    tick(seed);
}