var board = require('../lib/board');

exports.nextIteration = {
    fromBoard: function (test) {
        var seed = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        
        var first = [
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        
        var second = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ];
                
        test.deepEqual(first, board.nextIteration(seed), ['Should correctly derive first iteration from seed']);
        test.deepEqual(second, board.nextIteration(first), ['Should correctly derive second iteration from first']);
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