var gol = require('../lib/life');


exports.cellShouldSurvive = {
    lessThanTwoNeighbours: function (test) {
        test.equal(false, gol.cellShouldSurvive(0), ["Alive cell should not survive with 0 neighbours"]);
        test.equal(false, gol.cellShouldSurvive(1), ["Alive cell should not survive with 1 neighbours"]);
        test.done();
    },

    twoOrThreeNeighbours: function (test) {
        test.equal(true, gol.cellShouldSurvive(2), ["Alive cell should survive with 2 neighbours"]);
        test.equal(true, gol.cellShouldSurvive(3), ["Alive cell should survive with 3 neighbours"]);
        test.done();
    },

    greaterThanThreeNeighbours: function (test) {
        test.equal(false, gol.cellShouldSurvive(4), ["Alive cell should not survive with 4 neighbours"]);
        test.equal(false, gol.cellShouldSurvive(5), ["Alive cell should not survive with > 4 neighbours"]);
        test.done();    
    }
};

exports.cellShouldRevive = {
    lessThanThreeNeighbours: function (test) {
        test.equal(false, gol.cellShouldRevive(2), ["Dead cell should not revive with less than 3 neighbours"]);
        test.done();
    },
    
    threeNeighbours: function (test) {
        test.equal(true, gol.cellShouldRevive(3), ["Dead cell should revive with 3 neighbours"]);
        test.done();
    },
    
    greaterThanThreeNeighbours: function (test) {
        test.equal(false, gol.cellShouldRevive(4), ["Dead cell should not revive with greater than 4 neighbours"])
        test.done();
    }
};