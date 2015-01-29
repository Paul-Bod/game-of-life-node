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
            [{alive: false, neighbours: 2}, {alive: false, neighbours: 3}, {alive: false, neighbours: 2}, {alive: false, neighbours: 1}, {alive: false, neighbours: 0}],
            [{alive: false, neighbours: 0}, {alive: false, neighbours: 0}, {alive: false, neighbours: 0}, {alive: false, neighbours: 0}, {alive: false, neighbours: 0}]
        ]
        
        test.deepEqual(expected, board.createBoard(seed), ['Board should be correctly set up based on seed']);
        test.done();
    }
}

exports.findNeighbours = {
    fromSeedGivenIndexes: function (test) {
        var seed = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
        
        test.equal(1, board.findNeighbours(seed, 0, 0), 'first row first item should have 1 neighbour');
        test.equal(1, board.findNeighbours(seed, 0, 1), 'first row second item should have 1 neighbour');
        test.equal(2, board.findNeighbours(seed, 0, 2), 'first row third item should have 2 neighbours');
        test.equal(1, board.findNeighbours(seed, 0, 3), 'first row fourth item should have 1 neighbour');
        test.equal(0, board.findNeighbours(seed, 0, 4), 'first row fifth item should have 0 neighbours');
        test.done();
    }
}