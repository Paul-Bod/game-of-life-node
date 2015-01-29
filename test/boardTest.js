var board = require('../lib/board');

exports.createBoard = {
    fromSeed: function (test) {
        var seed = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
        
        var expected = [
            [{alive: false, neighbours: 1}, {alive: true, neighbours: 1}, {alive: false, neighbours: 2}, {alive: false, neighbours: 1}, {alive: false, neighbours: 0}],
            [{alive: false, neighbours: 3}, {alive: false, neighbours: 5}, {alive: true, neighbours: 3}, {alive: false, neighbours: 2}, {alive: false, neighbours: 0}],
            [{alive: true, neighbours: 1}, {alive: true, neighbours: 3}, {alive: true, neighbours: 2}, {alive: false, neighbours: 2}, {alive: false, neighbours: 0}],
            [{alive: false, neighbours: 2}, {alive: false, neighbours: 2}, {alive: false, neighbours: 2}, {alive: false, neighbours: 1}, {alive: false, neighbours: 0}],
            [{alive: false, neighbours: 1}, {alive: false, neighbours: 0}, {alive: false, neighbours: 0}, {alive: false, neighbours: 0}, {alive: false, neighbours: 0}]
        ]
        
        test.equal(expected, board.createBoard(seed), ['Board should be correctly set up based on seed']);
        test.done();
    }
}